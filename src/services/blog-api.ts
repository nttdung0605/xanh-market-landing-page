import { api } from '@/lib/api-config';
import {
  BlogPost,
  BlogComment,
  CreateBlogRequest,
  UpdateBlogRequest,
  CreateCommentRequest,
  UpdateCommentRequest,
  BlogsResponse,
  BlogResponse,
  CommentsResponse,
  CommentResponse,
  LikeResponse,
} from '@/types/blog';

// Blog CRUD operations
export const blogApi = {
  // Get all blogs
  getBlogs: async (params?: {
    page?: number;
    limit?: number;
    type?: string;
    tags?: string[];
  }): Promise<BlogsResponse> => {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.type) searchParams.append('type', params.type);
    if (params?.tags?.length) {
      params.tags.forEach(tag => searchParams.append('tags', tag));
    }

    const queryString = searchParams.toString();
    const endpoint = `/blogs${queryString ? `?${queryString}` : ''}`;
    
    return api.get<BlogsResponse>(endpoint);
  },

  // Create a new blog
  createBlog: async (data: CreateBlogRequest): Promise<BlogResponse> => {
    return api.post<BlogResponse>('/blogs', data);
  },

  // Get blog by ID
  getBlogById: async (id: string): Promise<BlogResponse> => {
    return api.get<BlogResponse>(`/blogs/${id}`);
  },

  // Update blog
  updateBlog: async (id: string, data: UpdateBlogRequest): Promise<BlogResponse> => {
    return api.patch<BlogResponse>(`/blogs/${id}`, data);
  },

  // Delete blog
  deleteBlog: async (id: string): Promise<void> => {
    return api.delete<void>(`/blogs/${id}`);
  },

  // Like a blog
  likeBlog: async (id: string): Promise<LikeResponse> => {
    return api.post<LikeResponse>(`/blogs/${id}/like`);
  },

  // Unlike a blog
  unlikeBlog: async (id: string): Promise<LikeResponse> => {
    return api.delete<LikeResponse>(`/blogs/${id}/unlike`);
  },
};

// Comment operations
export const commentApi = {
  // Get comments for a blog
  getComments: async (blogId: string, params?: {
    page?: number;
    limit?: number;
  }): Promise<CommentsResponse> => {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());

    const queryString = searchParams.toString();
    const endpoint = `/blogs/${blogId}/comments${queryString ? `?${queryString}` : ''}`;
    
    return api.get<CommentsResponse>(endpoint);
  },

  // Create a comment
  createComment: async (blogId: string, data: CreateCommentRequest): Promise<CommentResponse> => {
    return api.post<CommentResponse>(`/blogs/${blogId}/comment`, data);
  },

  // Update a comment
  updateComment: async (
    blogId: string,
    commentId: string,
    data: UpdateCommentRequest
  ): Promise<CommentResponse> => {
    return api.patch<CommentResponse>(`/blogs/${blogId}/comment/${commentId}`, data);
  },

  // Delete a comment
  deleteComment: async (blogId: string, commentId: string): Promise<void> => {
    return api.delete<void>(`/blogs/${blogId}/comment/${commentId}`);
  },
};

// Combined export for convenience
export const blogService = {
  ...blogApi,
  comments: commentApi,
};