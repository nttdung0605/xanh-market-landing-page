// Blog interfaces based on the API schema
export interface BlogImage {
  imageUrl: string;
  index: number;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  tags: string[];
  type: string;
  thumbnailUrl?: string;
  images?: BlogImage[];
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  likesCount?: number;
  commentsCount?: number;
  isLiked?: boolean;
}

export interface BlogComment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateBlogRequest {
  title: string;
  content: string;
  tags: string[];
  type: string;
  thumbnailUrl?: string;
  images?: BlogImage[];
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
  author?: string;
}

export interface UpdateCommentRequest {
  content: string;
}

// Response types
export interface BlogsResponse {
  data: BlogPost[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface BlogResponse {
  data: BlogPost;
}

export interface CommentsResponse {
  data: BlogComment[];
  total?: number;
}

export interface CommentResponse {
  data: BlogComment;
}

export interface LikeResponse {
  data: {
    isLiked: boolean;
    likesCount: number;
  };
}