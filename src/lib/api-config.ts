// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://xanhmarket-api.hpcc.vn';
export const API_VERSION = '/api/v1';

// Common API response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Error response interface
export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

// Common fetch wrapper with error handling
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${API_VERSION}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        message: 'An error occurred',
        statusCode: response.status,
      }));
      
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred');
  }
}

// Helper functions for different HTTP methods
export const api = {
  get: <T>(endpoint: string) => apiRequest<T>(endpoint),
  
  post: <T>(endpoint: string, data?: any) =>
    apiRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),
    
  patch: <T>(endpoint: string, data?: any) =>
    apiRequest<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),
    
  delete: <T>(endpoint: string) =>
    apiRequest<T>(endpoint, { method: 'DELETE' }),
};