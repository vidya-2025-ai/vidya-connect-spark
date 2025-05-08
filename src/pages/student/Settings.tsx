
import React, { useState } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/services/api/types';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    bio: user?.bio || '',
    skills: user?.skills || [],
    socialLinks: user?.socialLinks || {
      linkedin: '',
      github: '',
      twitter: '',
      portfolio: ''
    },
    preferences: user?.preferences || {
      emailNotifications: true,
      applicationUpdates: true,
      marketingEmails: false
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value
      }
    }));
  };

  const handlePreferenceChange = (key: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: checked
      }
    }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, skills }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      // This would be an actual API call in a real application
      // await userService.updateUserProfile(formData);
      
      // For now, just update the local user state
      updateUser(formData);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was a problem updating your profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      
      <div className="flex-1 overflow-auto">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Account Settings
            </h1>
            
            <Tabs defaultValue="profile">
              <TabsList className="mb-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          className="mt-1 h-24"
                          placeholder="Write a short bio about yourself"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="skills">Skills (comma separated)</Label>
                        <Textarea
                          id="skills"
                          name="skills"
                          value={formData.skills?.join(', ')}
                          onChange={handleSkillsChange}
                          className="mt-1"
                          placeholder="React, JavaScript, UI/UX Design"
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Social Links</h3>
                        
                        <div>
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input
                            id="linkedin"
                            name="linkedin"
                            value={formData.socialLinks?.linkedin}
                            onChange={handleSocialLinkChange}
                            className="mt-1"
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="github">GitHub</Label>
                          <Input
                            id="github"
                            name="github"
                            value={formData.socialLinks?.github}
                            onChange={handleSocialLinkChange}
                            className="mt-1"
                            placeholder="https://github.com/username"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="twitter">Twitter</Label>
                          <Input
                            id="twitter"
                            name="twitter"
                            value={formData.socialLinks?.twitter}
                            onChange={handleSocialLinkChange}
                            className="mt-1"
                            placeholder="https://twitter.com/username"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="portfolio">Portfolio Website</Label>
                          <Input
                            id="portfolio"
                            name="portfolio"
                            value={formData.socialLinks?.portfolio}
                            onChange={handleSocialLinkChange}
                            className="mt-1"
                            placeholder="https://yourwebsite.com"
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" disabled={isUpdating}>
                        {isUpdating ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>User Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="emailNotifications">Email Notifications</Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Receive notifications via email
                            </p>
                          </div>
                          <Switch
                            id="emailNotifications"
                            checked={formData.preferences?.emailNotifications}
                            onCheckedChange={(checked) => 
                              handlePreferenceChange('emailNotifications', checked)
                            }
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="applicationUpdates">Application Updates</Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Get notifications about your application status
                            </p>
                          </div>
                          <Switch
                            id="applicationUpdates"
                            checked={formData.preferences?.applicationUpdates}
                            onCheckedChange={(checked) => 
                              handlePreferenceChange('applicationUpdates', checked)
                            }
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="marketingEmails">Marketing Emails</Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Receive promotional content and news
                            </p>
                          </div>
                          <Switch
                            id="marketingEmails"
                            checked={formData.preferences?.marketingEmails}
                            onCheckedChange={(checked) => 
                              handlePreferenceChange('marketingEmails', checked)
                            }
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" disabled={isUpdating}>
                        {isUpdating ? 'Saving...' : 'Save Preferences'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Change Password</h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            className="mt-1"
                          />
                        </div>
                        <Button>Update Password</Button>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium">Danger Zone</h3>
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <Button variant="destructive">Delete Account</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Email Notifications</h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Application Updates</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Updates about the status of your applications
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Opportunities</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Notifications about new opportunities matching your profile
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Messages</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Notifications about new messages from recruiters
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Events and Workshops</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Updates about upcoming events and workshops
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                    
                    <Button>Save Notification Settings</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
