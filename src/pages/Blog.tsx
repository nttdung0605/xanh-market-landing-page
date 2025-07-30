import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  PlusCircle, 
  Calendar, 
  User, 
  Heart, 
  MessageCircle, 
  Tag, 
  Image as ImageIcon,
  Trash2,
  Edit,
  Send
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBlogs, useCreateBlog, useDeleteBlog, useLikeBlog, useUnlikeBlog } from "@/hooks/use-blogs";
import { BlogPost, CreateBlogRequest, BlogImage } from "@/types/blog";
import { API_BASE_URL } from "@/lib/api-config";

const BLOG_TYPES = [
  { value: "experience", label: "Kinh nghiệm" },
  { value: "tutorial", label: "Hướng dẫn" },
  { value: "news", label: "Tin tức" },
  { value: "review", label: "Đánh giá" },
];

// Mock data for development when API is not available
const MOCK_BLOGS: BlogPost[] = [
  {
    id: "1",
    title: "Khởi đầu hành trình thực phẩm sạch",
    content: "Tại Xanh Market, chúng tôi tin rằng thực phẩm sạch không chỉ là xu hướng mà là nhu cầu thiết yếu cho sức khỏe cộng đồng. Hành trình của chúng tôi bắt đầu từ mong muốn mang đến những sản phẩm thực phẩm an toàn, có nguồn gốc rõ ràng...",
    tags: ["thực-phẩm-sạch", "sức-khỏe", "an-toàn"],
    type: "experience",
    author: "Nguyễn Văn A",
    createdAt: "2024-01-15",
    likesCount: 15,
    commentsCount: 8,
    isLiked: false,
    thumbnailUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=300&fit=crop"
  },
  {
    id: "2", 
    title: "Công nghệ truy xuất nguồn gốc thực phẩm",
    content: "Với sự phát triển của công nghệ blockchain, việc truy xuất nguồn gốc thực phẩm đã trở nên minh bạch và đáng tin cậy hơn bao giờ hết. Mỗi sản phẩm tại Xanh Market đều được gắn mã QR để khách hàng có thể kiểm tra...",
    tags: ["công-nghệ", "blockchain", "truy-xuất"],
    type: "tutorial",
    author: "Trần Thị B",
    createdAt: "2024-01-10",
    likesCount: 23,
    commentsCount: 12,
    isLiked: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1518796745738-41048802f99a?w=500&h=300&fit=crop"
  }
];

const Blog = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Form states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [tags, setTags] = useState<string>("");
  const [images, setImages] = useState<BlogImage[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  // API hooks
  const { data: blogsResponse, isLoading, error } = useBlogs({
    type: selectedType && selectedType !== "all" ? selectedType : undefined,
    tags: selectedTags.length > 0 ? selectedTags : undefined,
  });
  const createBlogMutation = useCreateBlog();
  const deleteBlogMutation = useDeleteBlog();
  const likeBlogMutation = useLikeBlog();
  const unlikeBlogMutation = useUnlikeBlog();

  // Use mock data if API fails or returns invalid data
  const blogs = Array.isArray(blogsResponse?.data) 
    ? blogsResponse.data 
    : error 
    ? MOCK_BLOGS 
    : [];

  // Debug logging (remove in production)
  if (blogsResponse && !Array.isArray(blogsResponse.data)) {
    console.warn('API response data is not an array:', blogsResponse);
  }
  
  if (error) {
    console.warn('API error, using mock data:', error.message);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !type) {
      return;
    }

    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    const blogData: CreateBlogRequest = {
      title: title.trim(),
      content: content.trim(),
      type,
      tags: tagsArray,
      thumbnailUrl: thumbnailUrl.trim() || undefined,
      images: images.length > 0 ? images : undefined,
    };

    try {
      await createBlogMutation.mutateAsync(blogData);
      // Reset form
      setTitle("");
      setContent("");
      setType("");
      setThumbnailUrl("");
      setTags("");
      setImages([]);
      setIsWriting(false);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      const newImage: BlogImage = {
        imageUrl: newImageUrl.trim(),
        index: images.length,
      };
      setImages([...images, newImage]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleLike = async (blog: BlogPost) => {
    try {
      if (blog.isLiked) {
        await unlikeBlogMutation.mutateAsync(blog.id);
      } else {
        await likeBlogMutation.mutateAsync(blog.id);
      }
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const handleDelete = async (blogId: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa blog này?")) {
      try {
        await deleteBlogMutation.mutateAsync(blogId);
      } catch (error) {
        // Error handling is done in the mutation
      }
    }
  };

  const handleTagFilter = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Show error banner but continue with mock data
  const showErrorBanner = error && blogs.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Error Banner */}
        {error && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-800 font-medium">
                  Không thể kết nối tới API backend
                </p>
                <p className="text-yellow-700 text-sm mt-1">
                  Đang hiển thị dữ liệu mẫu. API: {API_BASE_URL}
                </p>
              </div>
              <Button 
                onClick={() => window.location.reload()} 
                size="sm"
                variant="outline"
                className="border-yellow-300 text-yellow-800 hover:bg-yellow-100"
              >
                Thử lại
              </Button>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Blog Xanh Market
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chia sẻ kiến thức và kinh nghiệm về thực phẩm sạch, nông nghiệp bền vững
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Lọc theo loại" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại</SelectItem>
              {BLOG_TYPES.map((blogType) => (
                <SelectItem key={blogType.value} value={blogType.value}>
                  {blogType.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleTagFilter(tag)}
                >
                  {tag} ×
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Write Blog Button */}
        <div className="flex justify-end mb-8">
          <Button 
            onClick={() => setIsWriting(!isWriting)}
            className="bg-gradient-primary text-white"
            disabled={!!error}
            title={error ? "Cần kết nối API để tạo blog mới" : ""}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            {isWriting ? "Hủy" : "Viết Blog"}
          </Button>
        </div>

        {/* Write Blog Form */}
        {isWriting && (
          <Card className="mb-8 border-primary/20 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-primary">Viết Blog Mới</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Tiêu đề</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Nhập tiêu đề blog..."
                      className="border-primary/20 focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Loại blog</Label>
                    <Select value={type} onValueChange={setType} required>
                      <SelectTrigger className="border-primary/20 focus:border-primary">
                        <SelectValue placeholder="Chọn loại blog" />
                      </SelectTrigger>
                      <SelectContent>
                        {BLOG_TYPES.map((blogType) => (
                          <SelectItem key={blogType.value} value={blogType.value}>
                            {blogType.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnailUrl">URL ảnh đại diện</Label>
                  <Input
                    id="thumbnailUrl"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    placeholder="https://example.com/thumbnail.jpg"
                    className="border-primary/20 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (phân cách bằng dấu phẩy)</Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="sầu-riêng, ri6, kỹ-thuật-trồng, kinh-nghiệm"
                    className="border-primary/20 focus:border-primary"
                  />
                </div>

                {/* Images section */}
                <div className="space-y-2">
                  <Label>Hình ảnh bổ sung</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="URL hình ảnh"
                      className="border-primary/20 focus:border-primary"
                    />
                    <Button type="button" onClick={handleAddImage} variant="outline">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  {images.length > 0 && (
                    <div className="space-y-2">
                      {images.map((image, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded">
                          <img 
                            src={image.imageUrl} 
                            alt={`Image ${index + 1}`}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <span className="flex-1 text-sm">{image.imageUrl}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Nội dung</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Viết nội dung blog của bạn..."
                    className="min-h-[200px] border-primary/20 focus:border-primary"
                    required
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    className="bg-gradient-primary text-white"
                    disabled={createBlogMutation.isPending}
                  >
                    {createBlogMutation.isPending ? "Đang đăng..." : "Đăng Blog"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsWriting(false)}
                    className="border-primary/20"
                  >
                    Hủy
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Đang tải...</p>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!isLoading && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Card key={blog.id} className="group hover:shadow-elegant transition-shadow border-primary/10">
                {blog.thumbnailUrl && (
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={blog.thumbnailUrl} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-smooth">
                      {blog.title}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(blog.id)}
                      className="text-destructive hover:text-destructive"
                      disabled={!!error}
                      title={error ? "Cần kết nối API để xóa blog" : ""}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {blog.author && (
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {blog.author}
                      </div>
                    )}
                    {blog.createdAt && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="text-xs cursor-pointer"
                          onClick={() => handleTagFilter(tag)}
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                      {blog.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{blog.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground line-clamp-4 mb-4">
                    {blog.content}
                  </p>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(blog)}
                        className={blog.isLiked ? "text-red-500" : ""}
                        disabled={!!error}
                        title={error ? "Cần kết nối API để thích blog" : ""}
                      >
                        <Heart className={`w-4 h-4 mr-1 ${blog.isLiked ? "fill-current" : ""}`} />
                        {blog.likesCount || 0}
                      </Button>
                      
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MessageCircle className="w-4 h-4" />
                        {blog.commentsCount || 0}
                      </div>
                    </div>
                    
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-primary hover:text-primary/80"
                      onClick={() => setSelectedBlog(blog)}
                    >
                      Đọc thêm →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && blogs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              {(selectedType && selectedType !== "all") || selectedTags.length > 0 
                ? "Không tìm thấy blog nào phù hợp với bộ lọc." 
                : "Chưa có blog nào. Hãy là người đầu tiên viết blog!"
              }
            </p>
          </div>
        )}
      </main>

      <Footer />

      {/* Blog Detail Dialog */}
      <Dialog open={!!selectedBlog} onOpenChange={() => setSelectedBlog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedBlog && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-primary mb-4">
                  {selectedBlog.title}
                </DialogTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  {selectedBlog.author && (
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {selectedBlog.author}
                    </div>
                  )}
                  {selectedBlog.createdAt && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedBlog.createdAt).toLocaleDateString('vi-VN')}
                    </div>
                  )}
                  <Badge variant="outline">{BLOG_TYPES.find(t => t.value === selectedBlog.type)?.label}</Badge>
                </div>
              </DialogHeader>
              
              {selectedBlog.thumbnailUrl && (
                <div className="mb-6">
                  <img 
                    src={selectedBlog.thumbnailUrl} 
                    alt={selectedBlog.title}
                    className="w-full max-h-64 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className="prose prose-slate max-w-none mb-6">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedBlog.content}
                </p>
              </div>

              {selectedBlog.images && selectedBlog.images.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Hình ảnh bổ sung:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedBlog.images.map((image) => (
                      <img 
                        key={image.index}
                        src={image.imageUrl} 
                        alt={`Image ${image.index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              {selectedBlog.tags && selectedBlog.tags.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedBlog.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 pt-4 border-t">
                <Button
                  variant="ghost"
                  onClick={() => handleLike(selectedBlog)}
                  className={selectedBlog.isLiked ? "text-red-500" : ""}
                  disabled={!!error}
                  title={error ? "Cần kết nối API để thích blog" : ""}
                >
                  <Heart className={`w-4 h-4 mr-2 ${selectedBlog.isLiked ? "fill-current" : ""}`} />
                  {selectedBlog.isLiked ? "Đã thích" : "Thích"} ({selectedBlog.likesCount || 0})
                </Button>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MessageCircle className="w-4 h-4" />
                  {selectedBlog.commentsCount || 0} bình luận
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>  
    </div>
  );
};

export default Blog;