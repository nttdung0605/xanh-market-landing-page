// Authentication types based on the API specification

export interface LoginRequest {
  accessToken: string;
  userType: 'FARMER' | 'CUSTOMER';
}

export interface LoginWithCredentialsRequest {
  phoneNumber: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  address: string;
  userType: 'FARMER' | 'CUSTOMER';
}

export interface AuthResponse {
  meta: {
    statusCode: number;
    message: string;
    error: string;
  };
  data: {
    user: User;
    accessToken: string;
    refreshToken?: string;
  };
}

export interface UserResponse {
  meta: {
    statusCode: number;
    message: string;
    error: string;
  };
  data: User;
}