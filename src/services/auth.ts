import { api } from './api';
import { LoginCredentials, LoginResponse } from '../types/auth';

export const loginRequest = async ({ email, password }: LoginCredentials): Promise<LoginResponse> => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};