'use client'
import { Link } from "lucide-react"
import Head from "next/head"
import { useSearchParams } from "next/navigation"

export default function Account() {
  const searchParams = useSearchParams()
  const tab= searchParams.get('tab')

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
    </div>
  )
}