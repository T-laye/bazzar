'use client'
import { useState, useRef, FormEventHandler } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronDown, ChevronUp, User, Upload } from 'lucide-react';
import { useSessionStore } from '@/store/SessionStore';
import { authAxios } from '@/config/axios';
import { toast } from 'sonner';
import Button from '../ui/Button';

export default function AccountTab() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { session } = useSessionStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false)

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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };
  

  // Handle profile picture upload
  const handleProfilePicClick = () => {
    fileInputRef?.current?.click()
  };

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Create a preview of the image
      const reader = new FileReader();
      reader.onloadend =async () => {
        setProfilePic(reader.result as string);
        try{
          const response = await authAxios.put('/customer/picture',{picture: reader.result as string})
          // console.log('Profile picture uploaded successfully:', response.data);
          toast.success(response.data.message)
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
  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
setIsLoading(true)
    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      middle_name:session?.user?.name?.middle_name,
      email:formData.email,
      phoneNumber:formData.phoneNumber
    }

    try{
      const response = await authAxios.put('/customer/update-profile', payload)
      toast.success(response.data.message)
      setIsLoading(false)
    }catch(err){
      setIsLoading(false)
      toast.error('Failed to update profile details')
    }
    // Here you would send the updated data to your backend
    console.log('Form submitted with data:', formData);
    // Update user in session store if needed
  };

  // Handle password change
  const handlePasswordChange = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords don't match");
      return;
    }
    setIsLoading(true)
    // Send the password change request to your backend
    console.log("Password change requested");
    try{
      const response = await authAxios.put('/customer/update-password',{password:formData.newPassword})
      toast.success(response.data.message)
    }catch(e){
      setIsLoading(false)
      toast.error('Failed to change password')
    }
    // Reset password fields
    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };
  
  const user = session?.user;
  
  return (
    
          <>
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
                
                <Button 
                  type="submit"
                  style='primary'
                  css="text-white py-2 px-6 rounded hover:bg-red-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Save profile"}
                </Button>
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
                
                <Button
                  type="submit" 
                  style='primary'
                  css="text-white py-2 px-6 rounded"
                  disabled={isLoading}
                >
                  Change Password
                </Button>
              </form>
            </div>
          </div>
          </>

  );
}