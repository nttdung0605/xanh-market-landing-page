# Blog API Integration Documentation

This document describes the complete API integration for the blog functionality in the Xanh Market application.

## Overview

The blog system now supports full CRUD operations with the backend API, including:
- Creating, reading, updating, and deleting blogs
- Like/unlike functionality
- Comments system
- Image and thumbnail support
- Tag-based filtering
- Type-based categorization

## API Schema

The blog API uses the following data structure:

```json
{
  "title": "Understanding the Basics of NestJS",
  "content": "This blog post explains the fundamentals of NestJS, a progressive Node.js framework.",
  "tags": [
    "sầu-riêng",
    "ri6",
    "kỹ-thuật-trồng",
    "kinh-nghiệm",
    "hữu-cơ"
  ],
  "type": "experience",
  "thumbnailUrl": "https://example.com/thumbnail.jpg",
  "images": [
    {
      "imageUrl": "https://example.com/image1.jpg",
      "index": 0
    },
    {
      "imageUrl": "https://example.com/image2.jpg",
      "index": 1
    }
  ]
}
```

## API Endpoints

### Blog Operations
- `GET /api/v1/blogs` - Get all blogs (with optional filtering)
- `POST /api/v1/blogs` - Create a new blog
- `GET /api/v1/blogs/{id}` - Get blog details
- `PATCH /api/v1/blogs/{id}` - Update a blog
- `DELETE /api/v1/blogs/{id}` - Delete a blog
- `POST /api/v1/blogs/{id}/like` - Like a blog
- `DELETE /api/v1/blogs/{id}/unlike` - Unlike a blog

### Comment Operations
- `POST /api/v1/blogs/{id}/comment` - Comment on a blog
- `GET /api/v1/blogs/{id}/comments` - Get comments of a blog
- `PATCH /api/v1/blogs/{id}/comment/{commentId}` - Update a comment
- `DELETE /api/v1/blogs/{id}/comment/{commentId}` - Delete a comment

## File Structure

```
src/
├── lib/
│   └── api-config.ts          # API configuration and fetch wrapper
├── types/
│   └── blog.ts                # TypeScript interfaces for blog data
├── services/
│   └── blog-api.ts            # API service functions
├── hooks/
│   └── use-blogs.ts           # React Query hooks for blog operations
└── pages/
    └── Blog.tsx               # Updated blog page component
```

## Configuration

### Environment Variables

Create a `.env` file in your project root:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### API Configuration

The API configuration is handled in `src/lib/api-config.ts`:

- **Base URL**: Configurable via `VITE_API_BASE_URL` environment variable
- **API Version**: `/api/v1`
- **Error Handling**: Centralized error handling with proper error messages
- **Content Type**: Automatic JSON content type headers

## TypeScript Interfaces

### Core Blog Interface
```typescript
interface BlogPost {
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
```

### Request/Response Types
- `CreateBlogRequest` - For creating new blogs
- `UpdateBlogRequest` - For updating existing blogs
- `BlogsResponse` - API response for blog lists
- `BlogResponse` - API response for single blog
- `CreateCommentRequest` - For creating comments
- `CommentsResponse` - API response for comments

## React Query Integration

### Query Keys
Organized query keys for efficient caching and invalidation:

```typescript
export const blogKeys = {
  all: ['blogs'],
  lists: () => [...blogKeys.all, 'list'],
  list: (filters: any) => [...blogKeys.lists(), { filters }],
  details: () => [...blogKeys.all, 'detail'],
  detail: (id: string) => [...blogKeys.details(), id],
  comments: (blogId: string) => [...blogKeys.all, 'comments', blogId],
};
```

### Available Hooks

#### Queries
- `useBlogs(params?)` - Fetch blogs with optional filtering
- `useBlog(id)` - Fetch single blog by ID
- `useBlogComments(blogId, params?)` - Fetch comments for a blog

#### Mutations
- `useCreateBlog()` - Create new blog
- `useUpdateBlog()` - Update existing blog
- `useDeleteBlog()` - Delete blog
- `useLikeBlog()` - Like a blog
- `useUnlikeBlog()` - Unlike a blog
- `useCreateComment()` - Add comment to blog
- `useUpdateComment()` - Update comment
- `useDeleteComment()` - Delete comment

## Features

### Blog Management
- ✅ Create blogs with title, content, type, tags, thumbnail, and images
- ✅ View all blogs in a responsive grid layout
- ✅ Filter blogs by type and tags
- ✅ Delete blogs with confirmation
- ✅ Like/unlike blogs with real-time updates

### Rich Content Support
- ✅ Thumbnail images for blog cards
- ✅ Multiple additional images per blog
- ✅ Tag system with clickable filtering
- ✅ Blog type categorization (experience, tutorial, news, review)

### User Interface
- ✅ Responsive design for all screen sizes
- ✅ Loading states for all API operations
- ✅ Error handling with user-friendly messages
- ✅ Toast notifications for user feedback
- ✅ Modal dialog for detailed blog view

### Performance Optimizations
- ✅ React Query caching with 5-minute stale time
- ✅ Optimistic updates for like/unlike operations
- ✅ Efficient query invalidation
- ✅ Image lazy loading and hover effects

## Usage Examples

### Creating a Blog
```typescript
const createBlogMutation = useCreateBlog();

const handleSubmit = async (data: CreateBlogRequest) => {
  try {
    await createBlogMutation.mutateAsync(data);
    // Success handling is automatic via the hook
  } catch (error) {
    // Error handling is automatic via the hook
  }
};
```

### Fetching Blogs with Filters
```typescript
const { data: blogsResponse, isLoading, error } = useBlogs({
  type: "experience",
  tags: ["sầu-riêng", "kỹ-thuật-trồng"],
  page: 1,
  limit: 10
});
```

### Liking a Blog
```typescript
const likeBlogMutation = useLikeBlog();

const handleLike = async (blogId: string) => {
  await likeBlogMutation.mutateAsync(blogId);
  // UI updates automatically via query invalidation
};
```

## Error Handling

The system includes comprehensive error handling:

1. **Network Errors**: Automatic retry and user-friendly error messages
2. **API Errors**: Server error messages displayed to users
3. **Validation Errors**: Form validation with immediate feedback
4. **Loading States**: Loading indicators for all async operations

## Testing the Integration

### Prerequisites
1. Ensure your backend API is running on the configured URL
2. Verify all API endpoints are accessible
3. Check that the API returns data in the expected format

### Manual Testing
1. **Create Blog**: Fill out the form and submit
2. **View Blogs**: Check that blogs load and display correctly
3. **Filter Blogs**: Test type and tag filtering
4. **Like/Unlike**: Test the like functionality
5. **Delete Blog**: Test blog deletion with confirmation
6. **Responsive Design**: Test on different screen sizes

### API Testing
You can test the API endpoints directly using tools like Postman or curl:

```bash
# Get all blogs
curl -X GET "http://localhost:3000/api/v1/blogs"

# Create a blog
curl -X POST "http://localhost:3000/api/v1/blogs" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Blog",
    "content": "This is a test blog post.",
    "type": "experience",
    "tags": ["test", "example"]
  }'
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend allows requests from your frontend domain
2. **404 Errors**: Verify API endpoints match the expected URLs
3. **Network Errors**: Check that the backend server is running
4. **TypeScript Errors**: Ensure all interfaces match your API response format

### Debug Mode

To enable debug mode, you can add console logs in the API configuration:

```typescript
// In api-config.ts
console.log('API Request:', url, config);
console.log('API Response:', response);
```

## Future Enhancements

Potential improvements for the blog system:

1. **Authentication**: Add user authentication for blog creation
2. **Rich Text Editor**: Implement a WYSIWYG editor for blog content
3. **Image Upload**: Add direct image upload functionality
4. **Search**: Implement full-text search across blogs
5. **Pagination**: Add pagination for large blog lists
6. **Comments UI**: Add a complete comments interface
7. **Social Sharing**: Add social media sharing buttons
8. **SEO**: Add meta tags and structured data for better SEO

## Dependencies

The blog API integration uses the following key dependencies:

- `@tanstack/react-query`: For API state management
- `lucide-react`: For icons
- `@radix-ui/*`: For UI components
- `tailwindcss`: For styling

All dependencies are already included in the project's `package.json`.