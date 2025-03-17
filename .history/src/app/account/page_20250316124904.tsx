'use client'
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronDown, ChevronUp, User } from 'lucide-react';
import { useSessionStore } from '@/store/SessionStore';

export default function Account() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const {session} = useSessionStore()

  const user = session?.user
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Account Management</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="max-w-6xl mx-auto flex">
          <Link href="/">
            <span className="text-gray-700 hover:text-gray-900 mr-4">Home</span>
          </Link>
          <span className="text-red-600">Account</span>
        </div>
      </nav>
      
      <main className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64">
            <div className="border border-gray-200 rounded mb-4">
              <div 
                className="bg-gray-100 p-3 flex justify-between items-center cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="font-medium">Manage My Account</span>
                {isMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
              
              {isMenuOpen && (
                <div className="divide-y divide-gray-100">
                  <Link href="/account/profile">
                    <span className="block p-3 hover:bg-gray-50">• My Profile</span>
                  </Link>
                  <Link href="/account/address">
                    <span className="block p-3 hover:bg-gray-50 text-red-600">• Address Book</span>
                  </Link>
                </div>
              )}
            </div>
            
            <div className="border border-gray-200 rounded mb-4">
              <Link href="/orders">
                <span className="block p-3 font-medium hover:bg-gray-50">My Orders</span>
              </Link>
            </div>
            
            <div className="border border-gray-200 rounded mb-4">
              <Link href="/saved-items">
                <span className="block p-3 font-medium hover:bg-gray-50">Saved Items</span>
              </Link>
            </div>
            
            <button className="w-full bg-red-600 text-white py-2 px-4 rounded mb-4 hover:bg-red-700">
              Log Out
            </button>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white border border-gray-200 rounded p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Customize Avatar</h2>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <User size={32} className="text-gray-400" />
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4">Upload a photo to personalize your account.</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={user?.name?.first_name}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={user?.name?.last_name}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={user?.email}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="example@gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={user?.phoneNumber}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="+1 (234) 567-8910"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded p-6">
              <h2 className="text-lg font-medium mb-4">Password Change</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="currentPassword">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"

                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter current password"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter new password"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
                  Re-enter New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Re-enter new password"
                />
              </div>
              
              <button className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}