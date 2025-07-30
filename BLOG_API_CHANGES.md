# Blog API Integration Changes

This document outlines the changes made to integrate with the XanhMarket API based on the official OpenAPI specification from `https://xanhmarket-api.hpcc.vn/docs`.

## Summary of Changes

### 1. Updated Type Definitions (`src/types/blog.ts`)

**Key Changes:**
- Changed `id` fields from `string` to `number` to match API specification
- Made `thumbnailUrl` and `images` required fields in `BlogPost` and `CreateBlogRequest`
- Updated response types to match actual API response structure with `meta` wrapper
- Added proper pagination metadata structure

**New Response Structure:**
```typescript
interface ApiResponse<T> {
  meta: {
    statusCode: number;
    message: string;
    error: string;
  };
  data: T;
}

interface PaginatedResponse<T> {
  meta: ApiMeta;
  data: {
    items: T[];
    meta: {
      page: number;
      limit: number;
      itemCount: number;
      pageCount: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
  };
}
```

### 2. Updated API Service (`src/services/blog-api.ts`)

**Key Changes:**
- Updated all ID parameters from `string` to `number`
- Changed search parameter from `type` and `tags` to `q` (search keyword)
- Updated method signatures to match OpenAPI specification
- Added proper endpoint comments referencing the API paths

**API Endpoints Mapped:**
- `GET /api/v1/blogs` - Get all blogs with pagination and search
- `POST /api/v1/blogs` - Create a new blog
- `GET /api/v1/blogs/{id}` - Get blog details
- `PATCH /api/v1/blogs/{id}` - Update a blog
- `DELETE /api/v1/blogs/{id}` - Delete a blog
- `POST /api/v1/blogs/{id}/like` - Like a blog
- `DELETE /api/v1/blogs/{id}/unlike` - Unlike a blog
- `GET /api/v1/blogs/{id}/comments` - Get blog comments
- `POST /api/v1/blogs/{id}/comment` - Create a comment
- `PATCH /api/v1/blogs/{id}/comment/{commentId}` - Update a comment
- `DELETE /api/v1/blogs/{id}/comment/{commentId}` - Delete a comment

### 3. Enhanced API Configuration (`src/lib/api-config.ts`)

**Key Changes:**
- Added Bearer token authentication support (as required by API)
- Added token management functions (`setAuthToken`, `getAuthToken`)
- Improved error handling to match API error responses
- Automatic token inclusion in requests when available

### 4. Updated React Hooks (`src/hooks/use-blogs.ts`)

**Key Changes:**
- Updated all ID parameters from `string` to `number`
- Changed query parameters to match new API specification
- Updated query keys to use number IDs
- Fixed mutation function signatures

### 5. Fixed Blog Component (`src/pages/Blog.tsx`)

**Key Changes:**
- Updated `handleDelete` function to accept `number` instead of `string`
- Fixed API query parameters to use `q` instead of `type` and `tags`
- Updated response data access to use `blogsResponse.data.items`
- Added default values for required fields (`thumbnailUrl` and `images`)

### 6. Example Component (`src/components/BlogList.tsx`)

**Features:**
- Complete blog listing with pagination
- Search functionality
- Like/unlike functionality
- Loading states and comprehensive error handling
- Responsive design using Tailwind CSS
- Empty state handling

### 7. Comprehensive Documentation (`BLOG_API_CHANGES.md`)

- Detailed explanation of all changes made
- Usage examples for all API methods
- Authentication setup instructions
- Error handling guidelines
- Testing instructions

## 🔧 Key API Endpoints Integrated

- `GET /api/v1/blogs` - Get all blogs with pagination and search
- `POST /api/v1/blogs` - Create a new blog
- `GET /api/v1/blogs/{id}` - Get blog details
- `PATCH /api/v1/blogs/{id}` - Update a blog
- `DELETE /api/v1/blogs/{id}` - Delete a blog
- `POST /api/v1/blogs/{id}/like` - Like a blog
- `DELETE /api/v1/blogs/{id}/unlike` - Unlike a blog
- `GET /api/v1/blogs/{id}/comments` - Get blog comments
- `POST /api/v1/blogs/{id}/comment` - Create a comment
- `PATCH /api/v1/blogs/{id}/comment/{commentId}` - Update a comment
- `DELETE /api/v1/blogs/{id}/comment/{commentId}` - Delete a comment

## Usage Examples

### Basic Blog Fetching

```typescript
import { blogService } from '@/services/blog-api';

// Get blogs with pagination
const response = await blogService.getBlogs({
  page: 1,
  limit: 10,
  q: 'search term' // optional search
});

console.log(response.data.items); // Array of blogs
console.log(response.data.meta); // Pagination info
```

### Creating a Blog

```typescript
const newBlog = await blogService.createBlog({
  title: "My Blog Post",
  content: "Blog content here...",
  tags: ["tag1", "tag2"],
  type: "experience",
  thumbnailUrl: "https://example.com/image.jpg",
  images: [
    { imageUrl: "https://example.com/img1.jpg", index: 0 },
    { imageUrl: "https://example.com/img2.jpg", index: 1 }
  ]
});
```

### Authentication

```typescript
import { setAuthToken } from '@/lib/api-config';

// Set authentication token (required for API access)
setAuthToken('your-jwt-token-here');

// Now all API calls will include the Bearer token
const blogs = await blogService.getBlogs();
```

### Working with Comments

```typescript
// Get comments for a blog
const comments = await blogService.comments.getComments(blogId, {
  page: 1,
  limit: 10
});

// Add a comment
const newComment = await blogService.comments.createComment(blogId, {
  content: "Great blog post!"
});

// Update a comment
const updatedComment = await blogService.comments.updateComment(
  blogId, 
  commentId, 
  { content: "Updated comment" }
);
```

## Authentication Requirements

The API requires Bearer token authentication for all endpoints. Make sure to:

1. Obtain a JWT token through the authentication endpoints
2. Set the token using `setAuthToken(token)`
3. The token will be automatically included in all subsequent requests

## Error Handling

The API returns errors in this format:
```json
{
  "meta": {
    "statusCode": 400,
    "message": "Error message",
    "error": "Bad Request"
  }
}
```

All service methods will throw errors with the message from the API response.

## Testing the Integration

You can test the API integration by:

1. Setting up authentication:
```typescript
import { setAuthToken } from '@/lib/api-config';
setAuthToken('your-valid-jwt-token');
```

2. Using the BlogList component:
```tsx
import { BlogList } from '@/components/BlogList';

function App() {
  return (
    <div>
      <BlogList searchQuery="" page={1} limit={10} />
    </div>
  );
}
```

3. Or directly calling the API:
```typescript
import { blogService } from '@/services/blog-api';

const testAPI = async () => {
  try {
    const blogs = await blogService.getBlogs({ page: 1, limit: 5 });
    console.log('API working!', blogs);
  } catch (error) {
    console.error('API error:', error);
  }
};
```

## Environment Variables

Make sure to set the API base URL in your environment:

```env
VITE_API_BASE_URL=https://xanhmarket-api.hpcc.vn
```

If not set, it defaults to `https://xanhmarket-api.hpcc.vn`.

## Troubleshooting

### TypeScript Errors

If you encounter TypeScript errors related to ID types:

1. **"Argument of type 'number' is not assignable to parameter of type 'string'"**
   - This error occurs when old code is still using string IDs
   - Update all ID parameters to use `number` type
   - Check hooks, components, and service calls

2. **Response structure errors**
   - Make sure to access response data as `response.data.items` for paginated responses
   - Use `response.data` for single item responses

### API Response Issues

1. **Empty response or undefined data**
   - Check if authentication token is set properly
   - Verify the API endpoint is accessible
   - Check network connectivity

2. **Pagination not working**
   - Ensure you're accessing `response.data.items` for the array of items
   - Use `response.data.meta` for pagination metadata

### Common Fixes Applied

1. **Updated Blog.tsx**:
   - Changed `handleDelete` parameter from `string` to `number`
   - Fixed query parameters to use `q` instead of `type` and `tags`
   - Updated response data access pattern
   - Added default values for required fields

2. **Updated use-blogs.ts**:
   - Changed all ID types from `string` to `number`
   - Updated query parameters structure
   - Fixed mutation signatures

3. **Updated types**:
   - Made `thumbnailUrl` and `images` required in create requests
   - Updated response structure to match actual API format

## 🚀 Ready to Use

The blog API integration is now fully updated and ready to use with the XanhMarket API. The code includes:

- ✅ Proper TypeScript types matching the API specification
- ✅ Bearer token authentication support
- ✅ Complete CRUD operations for blogs and comments
- ✅ Pagination and search functionality
- ✅ Error handling and loading states
- ✅ Example React component
- ✅ Comprehensive documentation
- ✅ Fixed TypeScript compilation errors

You can now use the updated `blogService` to interact with the XanhMarket API, and the `BlogList` component as a reference for implementing blog functionality in your application.