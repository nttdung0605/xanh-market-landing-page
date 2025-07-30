// Test mock service directly
const mockBlogs = [
  {
    id: 1,
    title: "Kinh nghiệm trồng sầu riêng Ri6",
    content: "Sầu riêng Ri6 là một trong những giống sầu riêng được ưa chuộng nhất tại Việt Nam.",
    tags: ["sầu-riêng", "ri6", "kỹ-thuật-trồng", "kinh-nghiệm"],
    type: "experience",
    thumbnailUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        index: 0
      }
    ],
    author: "Nguyễn Văn A",
    createdAt: "2024-01-15T10:30:00Z",
    likesCount: 25,
    commentsCount: 8,
    isLiked: false
  }
];

const mockBlogService = {
  getBlogs: async (params) => {
    console.log('Mock service called with params:', params);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
      meta: {
        statusCode: 200,
        message: "OK",
        error: ""
      },
      data: {
        items: mockBlogs,
        meta: {
          page: 1,
          limit: 10,
          itemCount: mockBlogs.length,
          pageCount: 1,
          hasPreviousPage: false,
          hasNextPage: false
        }
      }
    };
  }
};

async function testMockService() {
  console.log('Testing mock service...');
  
  try {
    const result = await mockBlogService.getBlogs();
    console.log('Mock service result:', JSON.stringify(result, null, 2));
    console.log('Blogs count:', result.data.items.length);
    console.log('First blog title:', result.data.items[0]?.title);
  } catch (error) {
    console.error('Mock service error:', error);
  }
}

testMockService();