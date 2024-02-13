import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useWebsocketStore } from './websocketStore';
import logger from '../services/logger';

export enum NotificationType {
  Success = 'success',
  Warning = 'warning',
  Error = 'danger',
}

export const useNotifyStore = defineStore('notify', () => {
  const router = useRouter();
  const websocket = useWebsocketStore();
  const notifications = ref<{ text: string; type: NotificationType; id: string }[]>([]);

  const clear = (notificationId: string): void => {
    notifications.value = notifications.value.filter((n) => n.id !== notificationId);
  };

  const panic = (reason: string, retroId: string, destroyConnection = true) => {
    const notification = { text: reason, type: NotificationType.Error, id: `panic-${Date.now()}` };
    notifications.value.push(notification);

    if (destroyConnection) websocket.destroy();

    logger.error(`Fatal uncaught error in retro ID ${retroId}. Reason: ${reason}`);

    router.push({ name: '500', query: { id: retroId } });

    setTimeout(() => {
      clear(notification.id);
    }, 7_000);
  };

  const notify = (text: string, type: NotificationType) => {
    const notification = { text, type, id: `${Date.now()}` };
    notifications.value.push(notification);

    setTimeout(() => {
      clear(notification.id);
    }, 3_000);
  };

  return { notify, clear, panic, notifications };
});
