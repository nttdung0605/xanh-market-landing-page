// Blog interfaces based on the actual API schema from OpenAPI spec
export interface BlogImage {
  imageUrl: string;
  index: number;
}

export interface BlogPost {
  id: number; // Changed from string to number to match API
  title: string;
  content: string;
  tags: string[];
  type: string;
  thumbnailUrl: string; // Made required as per API spec
  images: BlogImage[]; // Made required as per API spec
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  likesCount?: number;
  commentsCount?: number;
  isLiked?: boolean;
}

export interface BlogComment {
  id: number; // Changed from string to number to match API
  content: string;
  author?: string; // Made optional as it might not always be present
  createdAt?: string; // Made optional
  updatedAt?: string;
}

// Request DTOs matching the API specification
export interface CreateBlogRequest {
  title: string;
  content: string;
  tags: string[];
  type: string;
  thumbnailUrl: string; // Required as per API spec
  images: BlogImage[]; // Required as per API spec
}

export interface UpdateBlogRequest {
  title?: string;
  content?: string;
  tags?: string[];
  type?: string;
  thumbnailUrl?: string;
  images?: BlogImage[];
}

export interface CreateCommentRequest {
  content: string;
}

export interface UpdateCommentRequest {
  content: string;
}

// API response meta structure based on actual API response
export interface ApiMeta {
  statusCode: number;
  message: string;
  error: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// Response wrapper structure matching actual API
export interface ApiResponse<T> {
  meta: ApiMeta;
  data: T;
}

export interface PaginatedData<T> {
  items: T[];
  meta: PaginationMeta;
}

export interface PaginatedResponse<T> extends ApiResponse<PaginatedData<T>> {}

// Specific response types
export interface BlogsResponse extends PaginatedResponse<BlogPost> {}

export interface BlogResponse extends ApiResponse<BlogPost> {}

export interface CommentsResponse extends PaginatedResponse<BlogComment> {}

export interface CommentResponse extends ApiResponse<BlogComment> {}

export interface LikeResponse extends ApiResponse<{
  isLiked: boolean;
  likesCount: number;
}> {}