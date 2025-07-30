import { api } from '@/lib/api-config';
import {
  LoginRequest,
  LoginWithCredentialsRequest,
  AuthResponse,
  UserResponse,
} from '@/types/auth';

export const authApi = {
  // Login with Zalo access token - matches POST /api/v1/auth/login
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    return api.post<AuthResponse>('/auth/login', data);
  },

  // Login with credentials - matches POST /api/v1/auth/login-with-credentials
  loginWithCredentials: async (data: LoginWithCredentialsRequest): Promise<AuthResponse> => {
    return api.post<AuthResponse>('/auth/login-with-credentials', data);
  },

  // Get user information - matches POST /api/v1/auth/me
  getMe: async (): Promise<UserResponse> => {
    return api.post<UserResponse>('/auth/me');
  },
};

export const authService = authApi;