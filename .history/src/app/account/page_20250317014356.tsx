'use client'
import AddressForm from "@/components/account/address"
import Orders from "@/components/account/orders"
import AccountTab from "@/components/account/profile"
import { ChevronDown, ChevronUp } from "lucide-react"
import Head from "next/head"
import Link from "next/link" // Changed to Next.js Link
import { useSearchParams } from "next/navigation"
import { useState } from "react"


export default function Account() {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const [isMenuOpen, setIsMenuOpen] = useState(true);



  
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
                  <Link href="/account?tab=profile">
                    <span className={`${tab === 'profile' && 'text-red-600 '} p-3 block`}>• My Profile</span>
                  </Link>
                  <Link href="/account?tab=address&&d=list">
                    <span className={`${tab === 'address' && 'text-red-600 '} p-3 block`}>• Address Book</span>
                  </Link>
                </div>
              )}
            </div>
            
            <div className="border border-gray-200 rounded mb-4">
              <Link href="/account?tab=orders">
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
            {tab === 'profile' && (
              <AccountTab/>
            )}
            
            {tab === 'address' && (
            <AddressForm/>
            )}
            {tab === 'orders' && (
            <Orders/>
            )}
            
            {!tab && (
              <div className="bg-white border border-gray-200 rounded p-6 mb-6">
                <h2 className="text-lg font-medium mb-4">Account Overview</h2>
                <p>Welcome to your account dashboard. Select an option from the menu to manage your account.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}