import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth-api';
import { setAuthToken, getAuthToken } from '@/lib/api-config';
import {
  LoginRequest,
  LoginWithCredentialsRequest,
  User,
} from '@/types/auth';
import { useToast } from "@/hooks/use-toast";

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

// Auth state management
export const useAuth = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get current user
  const { data: user, isLoading, error } = useQuery({
    queryKey: authKeys.user(),
    queryFn: () => authService.getMe().then(response => response.data),
    enabled: !!getAuthToken(),
    retry: false,
  });

  // Login with Zalo
  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      setAuthToken(response.data.accessToken);
      localStorage.setItem('auth_token', response.data.accessToken);
      queryClient.setQueryData(authKeys.user(), response.data.user);
      toast({
        title: "Đăng nhập thành công",
        description: `Chào mừng ${response.data.user.name}!`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Lỗi đăng nhập",
        description: error.message || "Không thể đăng nhập",
        variant: "destructive",
      });
    },
  });

  // Login with credentials
  const loginWithCredentialsMutation = useMutation({
    mutationFn: (data: LoginWithCredentialsRequest) => authService.loginWithCredentials(data),
    onSuccess: (response) => {
      setAuthToken(response.data.accessToken);
      localStorage.setItem('auth_token', response.data.accessToken);
      queryClient.setQueryData(authKeys.user(), response.data.user);
      toast({
        title: "Đăng nhập thành công",
        description: `Chào mừng ${response.data.user.name}!`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Lỗi đăng nhập",
        description: error.message || "Số điện thoại hoặc mật khẩu không đúng",
        variant: "destructive",
      });
    },
  });

  // Logout
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('auth_token');
    queryClient.clear();
    toast({
      title: "Đăng xuất thành công",
      description: "Hẹn gặp lại bạn!",
    });
  };

  const isAuthenticated = !!user && !!getAuthToken();

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    login: loginMutation.mutateAsync,
    loginWithCredentials: loginWithCredentialsMutation.mutateAsync,
    logout,
    isLoginLoading: loginMutation.isPending || loginWithCredentialsMutation.isPending,
  };
};