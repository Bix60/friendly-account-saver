
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { saveCredentials } from '@/utils/authUtils';

interface AuthFormProps {
  isLogin: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }

    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!isLogin) {
      try {
        await saveCredentials(email, password);
        toast({
          title: "Account created",
          description: "Your account has been created successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "There was an error creating your account",
          variant: "destructive",
        });
      }
    } else {
      // Handle login logic here
      toast({
        title: "Login attempted",
        description: "This is just a demo - no actual login is performed",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10"
          />
        </div>
        {!isLogin && (
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10"
            />
          </div>
        )}
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
        {isLogin ? (
          "Sign In"
        ) : (
          <div className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Create Account
          </div>
        )}
      </Button>
    </form>
  );
};

export default AuthForm;
