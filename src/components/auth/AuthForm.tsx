
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
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface AuthFormProps {
  type: 'student' | 'organization';
  isLogin?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, isLogin = false }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [organization, setOrganization] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        // Login user
        await login(email, password);
      } else {
        // Register user
        const userData = {
          firstName,
          lastName,
          email,
          password,
          role: type === 'student' ? 'student' : 'recruiter',
          organization: type === 'organization' ? organization : undefined
        };
        
        await register(userData);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      // Error is already handled in the useAuth hook
    } finally {
      setLoading(false);
    }
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
            : 'Join InternMatch and start your journey'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && type === 'student' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John" 
                  required 
                  className="vs-input-focus"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  type="text" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe" 
                  required 
                  className="vs-input-focus"
                />
              </div>
            </>
          )}
          
          {!isLogin && type === 'organization' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John" 
                  required 
                  className="vs-input-focus"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  type="text" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe" 
                  required 
                  className="vs-input-focus"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="organization">Organization Name</Label>
                <Input 
                  id="organization" 
                  type="text" 
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Company Name" 
                  required 
                  className="vs-input-focus"
                />
              </div>
            </>
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
