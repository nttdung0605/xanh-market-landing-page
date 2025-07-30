import { BlogPost, CreateBlogRequest } from '@/types/blog';

// Mock blog data for testing
const mockBlogs: BlogPost[] = [
  {
    id: 1,
    title: "Kinh nghiệm trồng sầu riêng Ri6",
    content: "Sầu riêng Ri6 là một trong những giống sầu riêng được ưa chuộng nhất tại Việt Nam. Trong bài viết này, tôi sẽ chia sẻ kinh nghiệm trồng và chăm sóc sầu riêng Ri6 để đạt năng suất cao nhất.\n\nĐầu tiên, bạn cần chọn đất trồng phù hợp. Sầu riêng Ri6 thích hợp với đất thịt pha cát, thoát nước tốt và có độ pH từ 5.5 đến 6.5. Đất cần được cày bừa kỹ và bón lót phân hữu cơ trước khi trồng.\n\nVề kỹ thuật trồng, khoảng cách giữa các cây nên từ 8-10m để đảm bảo không gian phát triển. Hố trồng nên có kích thước 60x60x60cm và được bón lót phân chuồng hoai mục.",
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
  },
  {
    id: 2,
    title: "Hướng dẫn chăm sóc cây ăn quả trong mùa mưa",
    content: "Mùa mưa là thời điểm quan trọng trong việc chăm sóc cây ăn quả. Độ ẩm cao và lượng mưa lớn có thể gây ra nhiều vấn đề cho cây trồng nếu không được xử lý đúng cách.\n\nTrong bài viết này, chúng ta sẽ tìm hiểu về các biện pháp chăm sóc cây ăn quả trong mùa mưa để đảm bảo cây phát triển tốt và cho năng suất cao.\n\nĐầu tiên, cần chú ý đến việc thoát nước. Đất trồng cần được thiết kế hệ thống thoát nước tốt để tránh ngập úng. Có thể đắp mô cao hoặc tạo rãnh thoát nước xung quanh gốc cây.",
    tags: ["chăm-sóc", "cây-ăn-quả", "mùa-mưa", "kỹ-thuật"],
    type: "tutorial",
    thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        index: 0
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        index: 1
      }
    ],
    author: "Trần Thị B",
    createdAt: "2024-01-10T14:20:00Z",
    likesCount: 18,
    commentsCount: 5,
    isLiked: true
  },
  {
    id: 3,
    title: "Thị trường nông sản sạch 2024: Xu hướng và cơ hội",
    content: "Năm 2024, thị trường nông sản sạch tại Việt Nam đang có những chuyển biến tích cực. Người tiêu dùng ngày càng quan tâm đến chất lượng và nguồn gốc thực phẩm, tạo ra cơ hội lớn cho các nhà sản xuất nông nghiệp sạch.\n\nTheo báo cáo mới nhất, thị trường nông sản sạch Việt Nam đạt giá trị khoảng 15.000 tỷ đồng trong năm 2023, tăng trưởng 20% so với năm trước. Dự kiến trong năm 2024, con số này sẽ tiếp tục tăng trưởng mạnh mẽ.\n\nCác xu hướng chính bao gồm: nông nghiệp hữu cơ, nông nghiệp công nghệ cao, và nông nghiệp thông minh. Người tiêu dùng sẵn sàng chi trả cao hơn cho các sản phẩm có chứng nhận chất lượng và nguồn gốc rõ ràng.",
    tags: ["thị-trường", "nông-sản-sạch", "xu-hướng", "2024"],
    type: "news",
    thumbnailUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    images: [],
    author: "Lê Văn C",
    createdAt: "2024-01-05T09:15:00Z",
    likesCount: 32,
    commentsCount: 12,
    isLiked: false
  }
];

let nextId = 4;

export const mockBlogService = {
  getBlogs: async (params?: {
    page?: number;
    limit?: number;
    q?: string;
  }) => {
    console.log('Mock blog service getBlogs called with params:', params);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredBlogs = [...mockBlogs];
    
    // Apply search filter
    if (params?.q) {
      const searchTerm = params.q.toLowerCase();
      filteredBlogs = filteredBlogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.content.toLowerCase().includes(searchTerm) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);
    
    return {
      meta: {
        statusCode: 200,
        message: "OK",
        error: ""
      },
      data: {
        items: paginatedBlogs,
        meta: {
          page,
          limit,
          itemCount: filteredBlogs.length,
          pageCount: Math.ceil(filteredBlogs.length / limit),
          hasPreviousPage: page > 1,
          hasNextPage: endIndex < filteredBlogs.length
        }
      }
    };
  },

  createBlog: async (data: CreateBlogRequest) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newBlog: BlogPost = {
      id: nextId++,
      ...data,
      author: "Test User",
      createdAt: new Date().toISOString(),
      likesCount: 0,
      commentsCount: 0,
      isLiked: false
    };
    
    mockBlogs.unshift(newBlog);
    
    return {
      meta: {
        statusCode: 201,
        message: "Blog created successfully",
        error: ""
      },
      data: newBlog
    };
  },

  deleteBlog: async (id: number) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockBlogs.findIndex(blog => blog.id === id);
    if (index !== -1) {
      mockBlogs.splice(index, 1);
    }
    
    return {
      meta: {
        statusCode: 200,
        message: "Blog deleted successfully",
        error: ""
      },
      data: null
    };
  },

  likeBlog: async (id: number) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const blog = mockBlogs.find(b => b.id === id);
    if (blog) {
      blog.isLiked = true;
      blog.likesCount = (blog.likesCount || 0) + 1;
    }
    
    return {
      meta: {
        statusCode: 200,
        message: "Blog liked successfully",
        error: ""
      },
      data: {
        isLiked: true,
        likesCount: blog?.likesCount || 0
      }
    };
  },

  unlikeBlog: async (id: number) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const blog = mockBlogs.find(b => b.id === id);
    if (blog) {
      blog.isLiked = false;
      blog.likesCount = Math.max(0, (blog.likesCount || 0) - 1);
    }
    
    return {
      meta: {
        statusCode: 200,
        message: "Blog unliked successfully",
        error: ""
      },
      data: {
        isLiked: false,
        likesCount: blog?.likesCount || 0
      }
    };
  }
};