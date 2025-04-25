
import React from 'react';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <RecruiterSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex items-center gap-4 mb-6">
              <SettingsIcon className="h-8 w-8 text-gray-400" />
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Manage your account and preferences
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Profile Information
                  </h2>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john@company.com" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" defaultValue="Tech Corp" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="position">Position</Label>
                      <Input id="position" defaultValue="Senior Recruiter" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Notification Preferences
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-600">
                          Receive notifications about new applications
                        </p>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Interview Reminders</h3>
                        <p className="text-sm text-gray-600">
                          Get reminders before scheduled interviews
                        </p>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
