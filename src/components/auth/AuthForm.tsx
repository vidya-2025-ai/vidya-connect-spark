
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AuthFormProps {
  type: 'student' | 'organization';
  isLogin?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, isLogin = false }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setLoading(false);
      if (isLogin) {
        // Navigate to respective dashboard based on user type
        navigate(type === 'student' ? '/student/dashboard' : '/organization/dashboard');
      } else {
        // For registration, navigate to the onboarding page
        navigate(type === 'student' ? '/student/onboarding' : '/organization/onboarding');
      }
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          {isLogin ? 'Log In' : 'Create an Account'}
          {type === 'student' ? ' as Student' : ' as Organization'}
        </CardTitle>
        <CardDescription>
          {isLogin 
            ? 'Enter your credentials to access your account' 
            : 'Join Vidya-Samveda and start your journey'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">
                {type === 'student' ? 'Full Name' : 'Organization Name'}
              </Label>
              <Input 
                id="name" 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={type === 'student' ? 'John Doe' : 'Organization Name'} 
                required 
                className="vs-input-focus"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" 
              required 
              className="vs-input-focus"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {isLogin && (
                <a href="/forgot-password" className="text-xs text-vs-purple-600 hover:underline">
                  Forgot password?
                </a>
              )}
            </div>
            <Input 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required 
              className="vs-input-focus"
            />
          </div>
          
          <Button 
            type="submit" 
            className={type === 'student' ? 'vs-btn-primary w-full' : 'vs-btn-secondary w-full'}
            disabled={loading}
          >
            {loading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          {' '}
          <a 
            href={isLogin ? `/register${type === 'organization' ? '-org' : ''}` : `/login`} 
            className="text-vs-purple-600 hover:underline"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

const AuthTabs: React.FC<{ isLogin?: boolean }> = ({ isLogin = false }) => {
  return (
    <Tabs defaultValue="student" className="w-full max-w-md mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="student">Student</TabsTrigger>
        <TabsTrigger value="organization">Organization</TabsTrigger>
      </TabsList>
      <TabsContent value="student" className="mt-6">
        <AuthForm type="student" isLogin={isLogin} />
      </TabsContent>
      <TabsContent value="organization" className="mt-6">
        <AuthForm type="organization" isLogin={isLogin} />
      </TabsContent>
    </Tabs>
  );
};

export { AuthForm, AuthTabs };
