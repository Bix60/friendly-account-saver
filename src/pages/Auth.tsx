
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Lock, UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import AuthForm from '@/components/auth/AuthForm';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md p-6 space-y-6 shadow-xl">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {isLogin ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin 
              ? "Enter your credentials to access your account" 
              : "Enter your information to create an account"}
          </p>
        </div>

        <AuthForm isLogin={isLogin} />

        <div className="text-center space-y-2">
          <div className="text-sm text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
