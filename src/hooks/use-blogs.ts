import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { blogService } from '@/services/blog-api';
import {
  BlogPost,
  CreateBlogRequest,
  UpdateBlogRequest,
  CreateCommentRequest,
  UpdateCommentRequest,
} from '@/types/blog';
import { useToast } from "@/hooks/use-toast";

// Query keys
export const blogKeys = {
  all: ['blogs'] as const,
  lists: () => [...blogKeys.all, 'list'] as const,
  list: (filters: any) => [...blogKeys.lists(), { filters }] as const,
  details: () => [...blogKeys.all, 'detail'] as const,
  detail: (id: number) => [...blogKeys.details(), id] as const,
  comments: (blogId: number) => [...blogKeys.all, 'comments', blogId] as const,
};

// Blog queries
export const useBlogs = (params?: {
  page?: number;
  limit?: number;
  q?: string; // Updated to match API spec
}) => {
  return useQuery({
    queryKey: blogKeys.list(params),
    queryFn: () => blogService.getBlogs(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useBlog = (id: number) => {
  return useQuery({
    queryKey: blogKeys.detail(id),
    queryFn: () => blogService.getBlogById(id),
    enabled: !!id,
  });
};

export const useBlogComments = (blogId: number, params?: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: blogKeys.comments(blogId),
    queryFn: () => blogService.comments.getComments(blogId, params),
    enabled: !!blogId,
  });
};

// Blog mutations
export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateBlogRequest) => blogService.createBlog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      toast({
        title: "Thành công",
        description: "Blog đã được tạo thành công",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể tạo blog",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateBlogRequest }) =>
      blogService.updateBlog(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(id) });
      toast({
        title: "Thành công",
        description: "Blog đã được cập nhật thành công",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể cập nhật blog",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: number) => blogService.deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      toast({
        title: "Thành công",
        description: "Blog đã được xóa thành công",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể xóa blog",
        variant: "destructive",
      });
    },
  });
};

// Like mutations
export const useLikeBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => blogService.likeBlog(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(id) });
    },
  });
};

export const useUnlikeBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => blogService.unlikeBlog(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(id) });
    },
  });
};

// Comment mutations
export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ blogId, data }: { blogId: number; data: CreateCommentRequest }) =>
      blogService.comments.createComment(blogId, data),
    onSuccess: (_, { blogId }) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.comments(blogId) });
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(blogId) });
      toast({
        title: "Thành công",
        description: "Bình luận đã được thêm",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể thêm bình luận",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ 
      blogId, 
      commentId, 
      data 
    }: { 
      blogId: number; 
      commentId: number; 
      data: UpdateCommentRequest 
    }) => blogService.comments.updateComment(blogId, commentId, data),
    onSuccess: (_, { blogId }) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.comments(blogId) });
      toast({
        title: "Thành công",
        description: "Bình luận đã được cập nhật",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể cập nhật bình luận",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ blogId, commentId }: { blogId: number; commentId: number }) =>
      blogService.comments.deleteComment(blogId, commentId),
    onSuccess: (_, { blogId }) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.comments(blogId) });
      queryClient.invalidateQueries({ queryKey: blogKeys.comments(blogId) });
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(blogId) });
      toast({
        title: "Thành công",
        description: "Bình luận đã được xóa",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể xóa bình luận",
        variant: "destructive",
      });
    },
  });
};