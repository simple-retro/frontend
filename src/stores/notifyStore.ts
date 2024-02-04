import { defineStore } from 'pinia';
import { ref } from 'vue';

export enum NotificationType {
  Success = 'success',
  Warning = 'warning',
  Error = 'danger',
}

export const useNotifyStore = defineStore('notify', () => {
  const notifications = ref<{ text: string; type: NotificationType; id: number }[]>([]);

  const clear = (notificationId: number): void => {
    notifications.value = notifications.value.filter((n) => n.id !== notificationId);
  };

  const notify = (text: string, type: NotificationType) => {
    const notification = { text, type, id: Date.now() };
    notifications.value.push(notification);

    setTimeout(() => {
      clear(notification.id);
    }, 3_000);
  };

  return { notify, clear, notifications };
});
