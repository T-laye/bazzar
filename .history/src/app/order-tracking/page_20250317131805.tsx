import Button from '@/components/ui/Button'
import React from 'react'

const OrderTracking = () => {
  return (
    <div className='relative  h-screen'>
      <img className='w-full h-full object-cover' src='/track.png'/>
      <div className='w-full h-full absolute left-0 top-0 bg-[#152039BF] flex items-center justify-center flex-col gap-2'>
        <h2 className='text-[32px] font-[800] text-white'>Innovative and Reliable  Solution for just you.</h2>
        <div className='flex flex-col gap-2'>
          <h3 className='text-sm text-white'>Tracking ID</h3>
          <div className='flex items-center gap-2'>
            <input className='w-[450px] h-[50px] bg-white border-none outline-none pl-6' placeholder='Tracking ID'/>
            <Button
              type='button'
              style='primary'
            >
              Track
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderTracking
