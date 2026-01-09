import { defineStore } from 'pinia';
import { capitalize, ref } from 'vue';
import { API_URL, Endpoints } from '../services';

import { NotificationType, useNotifyStore } from './notifyStore';
import retrospectiveApi from '../services/retrospectiveApi';
import { Question, useRetrospectiveStore } from './retrospectiveStore';
import logger from '../services/logger';

enum SocketActions {
  create = 'create',
  update = 'update',
  delete = 'delete',
  addVote = 'add_vote',
  removeVote = 'remove_vote',
}

type SocketEntity = 'question' | 'retrospective' | 'answer' | 'pong';

type SocketMessage = {
  action: SocketActions;
  type: SocketEntity;
  value: unknown;
};

export const useWebsocketStore = defineStore('websocket', () => {
  const notifyStore = useNotifyStore();
  const retroStore = useRetrospectiveStore();

  const websocket = ref<WebSocket>();
  const isReconnecting = ref(false);
  let retrospectiveId = '';

  let retryPingTimeout: number;
  let heartbeatTimeout: number;
  let reconnectTimeout: number;

  let pingsSent = 0;
  let reconnectRetries = 0;

  const clearTimers = () => {
    clearTimeout(reconnectTimeout);
    clearTimeout(heartbeatTimeout);
    clearTimeout(retryPingTimeout);
  };

  const reconnectLogic = () => {
    if (reconnectRetries >= 5) return destroy('The Websocket connection was lost');

    reconnectTimeout = setTimeout(
      () => {
        reconnectRetries += 1;
        logger.debug(`Retrying connection for the ${reconnectRetries} time`);
        connect(retrospectiveId);
      },
      1000 * reconnectRetries || 500,
    );
  };

  const makePingSequence = () => {
    if (!websocket.value) return;

    pingsSent += 1;

    if (pingsSent > 5) return close('The websocket stopped responding', true);

    logger.debug(`<- Sending ping ${pingsSent}`);
    websocket.value.send(JSON.stringify({ type: 'ping' }));

    retryPingTimeout = setTimeout(() => {
      logger.debug(`X-> Pong ${pingsSent} too late! `);
      makePingSequence();
    }, 500 * pingsSent);
  };

  const startHeartBeat = () => {
    logger.debug('<-> Starting heartbeat sequence in 10 seconds');
    heartbeatTimeout = setTimeout(() => {
      makePingSequence();
    }, 10_000);
  };

  const ackPong = () => {
    if (pingsSent === 0) {
      logger.debug(`-> A lazy pong just arrived!`);
      return;
    }

    logger.debug(`-> Pong ${pingsSent} received!`);
    pingsSent = 0;
    clearTimeout(retryPingTimeout);
    startHeartBeat();
  };

  const onMessage = (message: MessageEvent<string>) => {
    const data = JSON.parse(message.data) as SocketMessage;

    if (data.type === 'pong') return ackPong();

    logger.debug(`Websocket message received: ${message.data}`);

    // add_vote and remove_vote are just updates
    if ([SocketActions.addVote, SocketActions.removeVote].includes(data.action))
      data.action = SocketActions.update;

    const functionName = `${data.action}${capitalize(data.type)}` as const;

    const toExecute = retroStore[data.type as 'question'][functionName as 'createQuestion'];

    if (toExecute === undefined) {
      logger.error(
        `Unsuported event sent in websocket. Action: "${data.action}", Type: "${data.type}"`,
      );

      return notifyStore.notify(
        `Unsuported event sent in websocket. Action: "${data.action}", Type: "${data.type}"`,
        NotificationType.Error,
      );
    }

    toExecute(data.value as Question);
  };

  const onConnect = async () => {
    logger.debug('Websocket connected!');
    reconnectRetries = 0;
    pingsSent = 0;
    isReconnecting.value = false;

    const retro = await retrospectiveApi.getRetrospective(retrospectiveId);
    if (!retro.error) retroStore.retrospective.updateRetrospective(retro);

    startHeartBeat();
  };

  const onError = (e: unknown) => {
    logger.error('Websocket error', e);
  };

  const onClose = () => {
    logger.debug('The websocket connection has been closed!');
    clearTimers();
    reconnectLogic();
  };

  const connect = (retroId: string) => {
    if (
      websocket.value !== undefined &&
      [websocket.value.OPEN, websocket.value.CONNECTING].includes(websocket.value.readyState as 0)
    )
      return;

    clearTimers();

    websocket.value = new WebSocket(
      `${import.meta.env.PROD ? 'wss' : 'ws'}://${API_URL}${Endpoints.SocketHello}/${retroId}`,
    );
    retrospectiveId = retroId;

    websocket.value.onerror = onError;
    websocket.value.onopen = onConnect;
    websocket.value.onmessage = onMessage;
    websocket.value.onclose = onClose;
  };

  const $reset = () => {
    clearTimers();
    if (!websocket.value) return;

    websocket.value.onclose = null;
    websocket.value.onerror = null;
    websocket.value.onmessage = null;
    websocket.value.onopen = null;

    retrospectiveId = '';

    retryPingTimeout = 0;
    heartbeatTimeout = 0;
    reconnectTimeout = 0;
    pingsSent = 0;
    reconnectRetries = 0;

    websocket.value = undefined;
    isReconnecting.value = false;
  };

  const close = (message: string, allowReconnect: boolean) => {
    websocket.value?.close(1000, message);
    if (!allowReconnect) $reset();
  };

  const destroy = (reason?: string) => {
    websocket.value?.close(3015, 'Its a panic from my side. Do not take it bad');

    $reset();

    notifyStore.panic(
      reason ?? 'The websocket connection was destroyed',
      retroStore.currentRetro?.id ?? '0',
      false,
    );
  };

  return { websocket, isReconnecting, connect, destroy, close };
});
