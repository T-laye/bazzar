'use client'
import { useState } from 'react'
import { useSessionStore } from "@/store/SessionStore"

export default function AddressForm() {
    
      const { session } = useSessionStore()
      const user = session?.user
  const [address, setAddress] = useState({
    country: user?.address?.[0]?.country,
    street: user?.address?.[0]?.street,
    city: user?.address?.[0]?.city,
    state: user?.address?.[0]?.state,
    zip_code: user?.address?.[0]?.zip_code,
    default_address: user?.address?.[0]?.default_address
  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setAddress({
      ...address,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    console.log('Address submitted:', address)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-end mb-4">
        <button 
          className="border border-red-600 text-red-600 px-4 py-2 rounded flex items-center"
        >
          <span className="mr-1">+</span> Add New Address
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
         
          
          <div>
            <label htmlFor="suite" className="block mb-1 text-sm">
              Suite, Unit <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={address.street}
              onChange={handleChange}
              placeholder="Flat 3/16 34B"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="lga" className="block mb-1 text-sm">
              L.G.A
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={address.country}
              onChange={handleChange}
              placeholder="Nigeria"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label htmlFor="city" className="block mb-1 text-sm">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={address.city}
              onChange={handleChange}
              placeholder="Yaba"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="state" className="block mb-1 text-sm">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={address.state}
              onChange={handleChange}
              placeholder="Rivers"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label htmlFor="zipCode" className="block mb-1 text-sm">
              Zip Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={address.zip_code}
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
              name="isDefaultShipping"
              checked={address.default_address}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm">Set as default shipping address</span>
          </label>
        </div>

        <button 
          type="submit" 
          className="w-full bg-red-800 text-white py-3 rounded hover:bg-red-900"
        >
          Save Address
        </button>
      </form>
    </div>
  )
}