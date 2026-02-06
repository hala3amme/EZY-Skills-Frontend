import { api } from '../api/http';
import type { MessageResponse, NotificationId, NotificationsResponse } from '../types/api';

export async function myNotifications(): Promise<NotificationsResponse> {
  const { data } = await api.get<NotificationsResponse>('/me/notifications');
  return data;
}

export async function markNotificationRead(notificationId: NotificationId): Promise<MessageResponse> {
  const { data } = await api.post<MessageResponse>(`/me/notifications/${notificationId}/read`);
  return data;
}
