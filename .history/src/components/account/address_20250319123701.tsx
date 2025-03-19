'use client'
import { useState } from 'react'
import { useSessionStore } from "@/store/SessionStore"
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Button from '../ui/Button'

export default function AddressForm() {
  const { session } = useSessionStore()
  const user = session?.user
  const searchParams = useSearchParams()
  const d = searchParams.get('d')
  
  const [address, setAddress] = useState({
    country: user?.address?.[0]?.country || '',
    street: user?.address?.[0]?.street || '',
    city: user?.address?.[0]?.city || '',
    state: user?.address?.[0]?.state || '',
    zip_code: user?.address?.[0]?.zip_code || '',
    default_address: user?.address?.[0]?.default_address || false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setAddress({
      ...address,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    console.log('Address submitted:', address)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-end mb-4">
       {d!=='new-address'? (<Link href='?tab=address&&d=new-address'
          type="button"
          className="border border-red-600 text-red-600 px-4 py-2 rounded flex items-center"
        >
          <span className="mr-1">+</span> Add New Address
        </Link>):
      (  <Link href='?tab=address&&d=list'
          type="button"
          className="border border-red-600 text-red-600 px-4 py-2 rounded flex items-center"
        >
          <span className="mr-1">+</span> Return to address list
        </Link>)}
      </div>

      {d === 'new-address' ? (<form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="street" className="block mb-1 text-sm">
            Street Address
          </label>
          <input
            type="text"
            id="street"
            name="street"
            // value={address.street}
            onChange={handleChange}
            placeholder="123 Main Street"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="city" className="block mb-1 text-sm">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              // value={address.city}
              onChange={handleChange}
              placeholder="Lagos"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label htmlFor="state" className="block mb-1 text-sm">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              // value={address.state}
              onChange={handleChange}
              placeholder="Rivers"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="country" className="block mb-1 text-sm">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              // value={address.country}
              onChange={handleChange}
              placeholder="Nigeria"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label htmlFor="zip_code" className="block mb-1 text-sm">
              Zip Code
            </label>
            <input
              type="text"
              id="zip_code"
              name="zip_code"
              // value={address.zip_code}
              onChange={handleChange}
              placeholder="23401A"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="default_address"
              // checked={address.default_address}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm">Set as default shipping address</span>
          </label>
        </div>

        <Button 
          type="submit"
          style='primary'
          css="w-full text-white py-3 rounded hover:bg-red-900"
        >
          Save Address
        </Button>
      </form>):(
        user?.address?.map(address =>(
            <div key={address._id} className='w-full h-[200px] border rounded-[8px]'>
                <div className='h-[42px] border-b px-7 flex items-center justify-between'>
                    <h2 className='text-[16px] font-semibold'>Address Book</h2>
                </div>
                <div className='px-7 mt-3'>
                    <h2 className='text-xs font-semibold'>your {address.default_address && 'default'} shipping address</h2>
                    <p className='text-sm mt-3'>{address.street} <br/> {address.city},<br/> {address.state},<br/> {address.country} - {address.zip_code}</p>
                </div>
            </div>
        ))
      )
          }
    </div>
  )
}