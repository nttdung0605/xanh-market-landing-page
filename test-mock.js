// Simple test to verify mock service
import { mockBlogService } from './src/services/mock-blog-service.js';

async function testMockService() {
  console.log('Testing mock service...');
  
  try {
    const result = await mockBlogService.getBlogs();
    console.log('Mock service result:', result);
    console.log('Blogs count:', result.data.items.length);
  } catch (error) {
    console.error('Mock service error:', error);
  }
}

testMockService();