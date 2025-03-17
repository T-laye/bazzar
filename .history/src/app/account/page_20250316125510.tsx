'use client'
import { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronDown, ChevronUp, User, Upload } from 'lucide-react';
import { useSessionStore } from '@/store/SessionStore';
import { authAxios } from '@/config/axios';

export default function Account() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { session } = useSessionStore();
  const fileInputRef = useRef(null);

  // Initialize form state with user data from session
  const [formData, setFormData] = useState({
    firstName: session?.user?.name?.first_name || '',
    lastName: session?.user?.name?.last_name || '',
    email: session?.user?.email || '',
    phoneNumber: session?.user?.phoneNumber || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Initialize profile picture state
  const [profilePic, setProfilePic] = useState(session?.user?.picture || null);
  const [isUploading, setIsUploading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Handle profile picture upload
  const handleProfilePicClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      
      // Create a preview of the image
      const reader = new FileReader();
      reader.onloadend =async () => {
        setProfilePic(reader.result as string);
        try{
          const response = await authAxios.put('/profile',{})
        }catch(e){
          console.error('Error uploading profile picture:', e);
          setIsUploading(false);
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
      
      // Here you would typically upload the file to your server/cloud storage
      // uploadProfilePicture(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the updated data to your backend
    console.log('Form submitted with data:', formData);
    // Update user in session store if needed
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords don't match");
      return;
    }
    
    // Here you would send the password change request to your backend
    console.log('Password change requested');
    
    // Reset password fields
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const user = session?.user;
  
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
            <form onSubmit={handleSubmit}>
              <div className="bg-white border border-gray-200 rounded p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Customize Avatar</h2>
                  <div 
                    className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center relative cursor-pointer overflow-hidden"
                    onClick={handleProfilePicClick}
                  >
                    {profilePic ? (
                      <img 
                        src={profilePic} 
                        alt="Profile" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <User size={32} className="text-gray-400" />
                    )}
                    
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Upload size={20} className="text-white" />
                    </div>
                    
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                      accept="image/*" 
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  {isUploading ? 'Uploading...' : 'Upload a photo to personalize your account.'}
                </p>
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
                      value={formData.firstName}
                      onChange={handleInputChange}
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
                      value={formData.lastName}
                      onChange={handleInputChange}
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
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="example@gmail.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="phoneNumber">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="+1 (234) 567-8910"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700"
                >
                  Save Profile
                </button>
              </div>
            </form>
            
            <div className="bg-white border border-gray-200 rounded p-6">
              <h2 className="text-lg font-medium mb-4">Password Change</h2>
              
              <form onSubmit={handlePasswordChange}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="currentPassword">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
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
                    value={formData.newPassword}
                    onChange={handleInputChange}
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
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Re-enter new password"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700"
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}