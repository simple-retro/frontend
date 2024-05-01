import { defineStore } from 'pinia';
import { ref } from 'vue';
import limitsApi, { Limits } from '../services/limitsApi';
import { NotificationType, useNotifyStore } from './notifyStore';

export const useLimistStore = defineStore('limits', () => {
  const notifyStore = useNotifyStore();
  const limits = ref<Limits>();

  // FIXME: remove this line. Do not allow it in commit
  limits.value = {
    answer: { text: 1000 },
    question: {
      text: 300,
    },
    retrospective: {
      description: 300,
      name: 80,
    },
  };

  const fetchLimits = async () => {
    if (typeof limits.value !== 'undefined') return;

    const result = await limitsApi.getLimits();

    if (result.error)
      return notifyStore.notify(
        "We couldn't get the data limits. Please retry",
        NotificationType.Error,
      );

    limits.value = result;
  };

  return { limits, fetchLimits };
});
