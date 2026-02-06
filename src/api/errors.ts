import type { AxiosError } from 'axios';

export type ApiErrorPayload = {
  message?: string;
  errors?: Record<string, string[]>;
};

export function getApiErrorMessage(error: unknown): string {
  const axiosError = error as AxiosError<ApiErrorPayload>;
  const payload = axiosError?.response?.data;

  if (payload?.message) return payload.message;

  const firstFieldError = payload?.errors && Object.values(payload.errors)[0]?.[0];
  if (firstFieldError) return firstFieldError;

  return 'Something went wrong. Please try again.';
}
