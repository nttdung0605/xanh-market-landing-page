import { mockBlogService } from './mock-blog-service';
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
  // Get all blogs - matches GET /api/v1/blogs
  getBlogs: async (params?: {
    page?: number;
    limit?: number;
    q?: string; // Search keyword as per API spec
  }): Promise<BlogsResponse> => {
    // Force use mock service for testing
    console.log('Using mock blog service for testing');
    return mockBlogService.getBlogs(params);
  },

  // Create a new blog - matches POST /api/v1/blogs
  createBlog: async (data: CreateBlogRequest): Promise<BlogResponse> => {
    // Force use mock service for testing
    console.log('Using mock blog service for testing');
    return mockBlogService.createBlog(data);
  },

  // Get blog by ID - matches GET /api/v1/blogs/{id}
  getBlogById: async (id: number): Promise<BlogResponse> => {
    return api.get<BlogResponse>(`/blogs/${id}`);
  },

  // Update blog - matches PATCH /api/v1/blogs/{id}
  updateBlog: async (id: number, data: UpdateBlogRequest): Promise<BlogResponse> => {
    return api.patch<BlogResponse>(`/blogs/${id}`, data);
  },

  // Delete blog - matches DELETE /api/v1/blogs/{id}
  deleteBlog: async (id: number): Promise<void> => {
    return api.delete<void>(`/blogs/${id}`);

  },

  // Like a blog - matches POST /api/v1/blogs/{id}/like
  likeBlog: async (id: number): Promise<LikeResponse> => {
    // Force use mock service for testing
    console.log('Using mock blog service for testing');
    return mockBlogService.likeBlog(id);
  },

  // Unlike a blog - matches DELETE /api/v1/blogs/{id}/unlike
  unlikeBlog: async (id: number): Promise<LikeResponse> => {
    // Force use mock service for testing
    console.log('Using mock blog service for testing');
    return mockBlogService.unlikeBlog(id);
  },
};

// Comment operations
export const commentApi = {
  // Get comments for a blog - matches GET /api/v1/blogs/{id}/comments
  getComments: async (blogId: number, params?: {
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

  // Create a comment - matches POST /api/v1/blogs/{id}/comment
  createComment: async (blogId: number, data: CreateCommentRequest): Promise<CommentResponse> => {
    return api.post<CommentResponse>(`/blogs/${blogId}/comment`, data);
  },

  // Update a comment - matches PATCH /api/v1/blogs/{id}/comment/{commentId}
  updateComment: async (
    blogId: number,
    commentId: number,
    data: UpdateCommentRequest
  ): Promise<CommentResponse> => {
    return api.patch<CommentResponse>(`/blogs/${blogId}/comment/${commentId}`, data);
  },

  // Delete a comment - matches DELETE /api/v1/blogs/{id}/comment/{commentId}
  deleteComment: async (blogId: number, commentId: number): Promise<void> => {
    return api.delete<void>(`/blogs/${blogId}/comment/${commentId}`);
  },
};

// Combined export for convenience
export const blogService = {
  ...blogApi,
  comments: commentApi,
};