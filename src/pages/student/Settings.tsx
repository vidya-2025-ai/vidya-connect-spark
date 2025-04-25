
import React from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { UserSettingsForm } from '@/components/settings/UserSettingsForm';
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Manage your account preferences and settings
                </p>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="mt-4">
              <UserSettingsForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
