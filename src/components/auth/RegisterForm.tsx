
import React, { useState } from 'react';
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
import { useAuth } from '@/hooks/useAuth';

interface RegisterFormProps {
  type: 'student' | 'organization';
}

const RegisterForm: React.FC<RegisterFormProps> = ({ type }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Register user
      const userRole = type === 'student' ? 'student' : 'recruiter';
      
      const userData = {
        firstName,
        lastName,
        email,
        password,
        role: userRole,
        ...(type === 'organization' ? { organization, jobTitle } : {})
      };
      
      console.log('Submitting registration data:', userData);
      await register(userData);
    } catch (error) {
      console.error('Registration error:', error);
      // Error is already handled in the useAuth hook
    } finally {
      setLoading(false);
    }
  };

  // Helper functions for getting text based on user type
  const getCardTitle = () => {
    return type === 'student' ? 'Create an Account as Student' : 'Create an Account as Recruiter';
  };

  const getCardDescription = () => {
    return type === 'student' 
      ? 'Join Vidya-Samveda and start your learning journey' 
      : 'Join Vidya-Samveda and connect with talented students';
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{getCardTitle()}</CardTitle>
        <CardDescription>{getCardDescription()}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <>
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
            <Label htmlFor="password">Password</Label>
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
                : 'bg-purple-600 hover:bg-purple-700'
            } text-white`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Sign Up'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          Already have an account?
          {' '}
          <a 
            href="/login" 
            className="text-vs-purple-600 hover:underline"
          >
            Log in
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
