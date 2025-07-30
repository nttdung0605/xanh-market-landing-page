import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { LogIn, Phone, User } from "lucide-react";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoginDialog: React.FC<LoginDialogProps> = ({ open, onOpenChange }) => {
  const { loginWithCredentials, isLoginLoading } = useAuth();
  
  // Credentials login state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  
  // Zalo login state (for demo purposes)
  const [zaloToken, setZaloToken] = useState("");
  const [userType, setUserType] = useState<'FARMER' | 'CUSTOMER'>('FARMER');

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber.trim() || !password.trim()) {
      return;
    }

    try {
      await loginWithCredentials({
        phoneNumber: phoneNumber.trim(),
        password: password.trim(),
      });
      
      // Reset form
      setPhoneNumber("");
      setPassword("");
      onOpenChange(false);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const handleZaloLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!zaloToken.trim()) {
      return;
    }

    // Note: This is a placeholder. In a real app, you'd integrate with Zalo SDK
    console.log("Zalo login not implemented in demo");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogIn className="w-5 h-5" />
            Đăng nhập
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="credentials" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="credentials">
              <Phone className="w-4 h-4 mr-2" />
              Số điện thoại
            </TabsTrigger>
            <TabsTrigger value="zalo">
              <User className="w-4 h-4 mr-2" />
              Zalo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="credentials" className="space-y-4">
            <form onSubmit={handleCredentialsLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Số điện thoại</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="0123456789"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary text-white"
                disabled={isLoginLoading}
              >
                {isLoginLoading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="zalo" className="space-y-4">
            <form onSubmit={handleZaloLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userType">Loại tài khoản</Label>
                <Select value={userType} onValueChange={(value: 'FARMER' | 'CUSTOMER') => setUserType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại tài khoản" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FARMER">Nông dân</SelectItem>
                    <SelectItem value="CUSTOMER">Khách hàng</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="zaloToken">Zalo Access Token</Label>
                <Input
                  id="zaloToken"
                  type="text"
                  value={zaloToken}
                  onChange={(e) => setZaloToken(e.target.value)}
                  placeholder="Nhập Zalo access token"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                disabled={isLoginLoading}
              >
                {isLoginLoading ? "Đang đăng nhập..." : "Đăng nhập với Zalo"}
              </Button>
            </form>
            
            <div className="text-sm text-muted-foreground text-center">
              <p>Tính năng Zalo đang trong quá trình phát triển</p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-sm text-muted-foreground text-center">
          <p>Bạn cần đăng nhập để tạo blog và tương tác</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};