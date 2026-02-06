import { api } from '../api/http';
import { setAuthToken, clearAuthToken } from '../auth/tokenStorage';
import type { AuthResponse, MeResponse } from '../types/api';

export type RegisterPayload = {
  name: string;
  email: string;
  phone_number?: string;
  password: string;
  password_confirmation: string;
};

export type LoginPayload = {
  email: string;
  password: string;
  device_name?: string;
};

type TokenOptions = {
  remember?: boolean;
};

export async function register(payload: RegisterPayload, options: TokenOptions = {}): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/register', payload);
  setAuthToken(data.token, options);
  return data;
}

export async function login(payload: LoginPayload, options: TokenOptions = {}): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/login', payload);
  setAuthToken(data.token, options);
  return data;
}

export async function me(): Promise<MeResponse> {
  const { data } = await api.get<MeResponse>('/auth/me');
  return data;
}

export async function logout(): Promise<{ message: string }>{
  try {
    const { data } = await api.post<{ message: string }>('/auth/logout');
    return data;
  } finally {
    clearAuthToken();
  }
}
