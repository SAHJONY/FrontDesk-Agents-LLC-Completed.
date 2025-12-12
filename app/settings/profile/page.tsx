// app/settings/profile/page.tsx
import React from 'react';

export default function ProfileSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-xl shadow-premium border border-gray-100">
        
        <h1 className="text-3xl font-extrabold text-gray-900 border-b pb-3 mb-6">
          User Profile & Security
        </h1>
        
        {/* Profile Card / Identity */}
        <div className="flex items-center space-x-6 mb-10">
          {/* Avatar Placeholder */}
          <div className="flex-shrink-0 h-16 w-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
            JD
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">John Doe (Admin)</h2>
            <p className="text-gray-500">john.doe@innovatecorp.com</p>
          </div>
        </div>

        {/* Security and Information Form (Client Component structure assumed) */}
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="name" defaultValue="John Doe" className="input-premium" />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <input type="text" id="role" defaultValue="Tenant Administrator" readOnly className="input-premium bg-gray-50 cursor-not-allowed" />
            </div>
            
            {/* Password Update */}
            <div className="md:col-span-2 pt-4 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Password Security</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                  <input type="password" id="password" placeholder="Enter new password" className="input-premium" />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input type="password" id="confirmPassword" placeholder="Confirm new password" className="input-premium" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-6">
            <button type="submit" className="btn-primary-premium">Save Profile Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
