import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlusCircle, Calendar, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const Blog = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [blogs, setBlogs] = useState<BlogPost[]>([
    {
      id: "1",
      title: "Khởi đầu hành trình thực phẩm sạch",
      content: "Tại Xanh Market, chúng tôi tin rằng thực phẩm sạch không chỉ là xu hướng mà là nhu cầu thiết yếu cho sức khỏe cộng đồng. Hành trình của chúng tôi bắt đầu từ mong muốn mang đến những sản phẩm thực phẩm an toàn, có nguồn gốc rõ ràng...",
      author: "Nguyễn Văn A",
      createdAt: "2024-01-15"
    },
    {
      id: "2", 
      title: "Công nghệ truy xuất nguồn gốc thực phẩm",
      content: "Với sự phát triển của công nghệ blockchain, việc truy xuất nguồn gốc thực phẩm đã trở nên minh bạch và đáng tin cậy hơn bao giờ hết. Mỗi sản phẩm tại Xanh Market đều được gắn mã QR để khách hàng có thể kiểm tra...",
      author: "Trần Thị B",
      createdAt: "2024-01-10"
    }
  ]);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !author.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive"
      });
      return;
    }

    const newBlog: BlogPost = {
      id: Date.now().toString(),
      title,
      content,
      author,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setBlogs([newBlog, ...blogs]);
    setTitle("");
    setContent("");
    setAuthor("");
    setIsWriting(false);
    
    toast({
      title: "Thành công",
      description: "Blog đã được đăng tải thành công"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Blog Xanh Market
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chia sẻ kiến thức và kinh nghiệm về thực phẩm sạch, nông nghiệp bền vững
          </p>
        </div>

        {/* Write Blog Button */}
        <div className="flex justify-end mb-8">
          <Button 
            onClick={() => setIsWriting(!isWriting)}
            className="bg-gradient-primary text-white"
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
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nhập tiêu đề blog..."
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="author">Tác giả</Label>
                  <Input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Tên của bạn..."
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Nội dung</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Viết nội dung blog của bạn..."
                    className="min-h-[200px] border-primary/20 focus:border-primary"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button type="submit" className="bg-gradient-primary text-white">
                    Đăng Blog
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

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Card key={blog.id} className="group hover:shadow-elegant transition-shadow border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-smooth">
                  {blog.title}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {blog.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-4">
                  {blog.content}
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto mt-4 text-primary hover:text-primary/80"
                  onClick={() => setSelectedBlog(blog)}
                >
                  Đọc thêm →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              Chưa có blog nào. Hãy là người đầu tiên viết blog!
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
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {selectedBlog.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedBlog.createdAt).toLocaleDateString('vi-VN')}
                  </div>
                </div>
              </DialogHeader>
              <div className="prose prose-slate max-w-none">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedBlog.content}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>  

    </div>
  );
};

export default Blog;