'use client'
import { ChevronDown, ChevronUp, Link } from "lucide-react"
import Head from "next/head"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export default function Account() {
  const searchParams = useSearchParams()
  const tab= searchParams.get('tab')
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
          </div>
          </main>
    </div>
  )
}