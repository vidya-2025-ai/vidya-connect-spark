
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AuthFormProps {
  type: 'student' | 'organization' | 'university';
  isLogin?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, isLogin = false }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [organization, setOrganization] = useState('');
  const [university, setUniversity] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
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
        const userRole = type === 'student' ? 'student' : type === 'organization' ? 'recruiter' : 'university';
        
        const userData = {
          firstName,
          lastName,
          email,
          password,
          role: userRole as 'student' | 'recruiter' | 'university',
          organization: type === 'organization' ? organization : undefined,
          university: type === 'university' ? university : undefined,
          jobTitle: (type === 'organization' || type === 'university') ? jobTitle : undefined,
          department: type === 'university' ? department : undefined
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

  // Helper functions for getting text based on user type
  const getCardTitle = () => {
    if (isLogin) return 'Log In';
    if (type === 'student') return 'Create an Account as Student';
    if (type === 'organization') return 'Create an Account as Recruiter';
    return 'Create an Account as University';
  };

  const getCardDescription = () => {
    if (isLogin) return 'Enter your credentials to access your account';
    if (type === 'student') return 'Join InternMatch and start your learning journey';
    if (type === 'organization') return 'Join InternMatch and connect with talented students';
    return 'Join InternMatch and manage your university programs';
  };

  function getRegistrationLink() {
    if (type === 'organization') return '/register-org';
    if (type === 'university') return '/register-university';
    return '/register';
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{getCardTitle()}</CardTitle>
        <CardDescription>{getCardDescription()}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
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
              </div>
              
              {type === 'organization' && (
                <div className="space-y-2">
                  <Label htmlFor="organization">Company/Organization Name</Label>
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
              )}
              
              {type === 'organization' && (
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input 
                    id="jobTitle" 
                    type="text" 
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="HR Manager" 
                    required 
                    className="vs-input-focus"
                  />
                </div>
              )}
              
              {type === 'university' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="university">University Name</Label>
                    <Input 
                      id="university" 
                      type="text" 
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="University Name" 
                      required 
                      className="vs-input-focus"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select onValueChange={setDepartment} value={department}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="career-services">Career Services</SelectItem>
                        <SelectItem value="placement-cell">Placement Cell</SelectItem>
                        <SelectItem value="student-affairs">Student Affairs</SelectItem>
                        <SelectItem value="administration">Administration</SelectItem>
                        <SelectItem value="academics">Academics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input 
                      id="jobTitle" 
                      type="text" 
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="Placement Officer" 
                      required 
                      className="vs-input-focus"
                    />
                  </div>
                </>
              )}
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
            className={`w-full ${
              type === 'student' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : type === 'organization' 
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-green-600 hover:bg-green-700'
            } text-white`}
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
            href={isLogin ? getRegistrationLink() : `/login`} 
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
  const [activeTab, setActiveTab] = useState("student");
  
  return (
    <Tabs defaultValue="student" className="w-full max-w-md mx-auto" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="student">Student</TabsTrigger>
        <TabsTrigger value="organization">Organization</TabsTrigger>
        <TabsTrigger value="university">University</TabsTrigger>
      </TabsList>
      <TabsContent value="student" className="mt-6">
        <AuthForm type="student" isLogin={isLogin} />
      </TabsContent>
      <TabsContent value="organization" className="mt-6">
        <AuthForm type="organization" isLogin={isLogin} />
      </TabsContent>
      <TabsContent value="university" className="mt-6">
        <AuthForm type="university" isLogin={isLogin} />
      </TabsContent>
    </Tabs>
  );
};

export { AuthForm, AuthTabs };
