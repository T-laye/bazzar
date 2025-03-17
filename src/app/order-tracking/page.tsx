'use client'
import Button from '@/components/ui/Button'
import React,{useRef} from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const OrderTracking = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  return (
    <div className='relative  h-screen'>
      <img className='w-full h-full object-cover' src='/track.png'/>
      <div className='w-full h-full absolute left-0 top-0 bg-[#152039BF] flex items-center justify-center flex-col gap-2'>
        <h2 className='md:text-[32px] text-[18px] text-center font-[800] text-white'>Innovative and Reliable  Solution for just you.</h2>
        <div className='flex flex-col gap-2'>
          <h3 className='text-sm text-white'>Tracking ID</h3>
          <div className='flex items-center gap-2'>
            <input ref={inputRef} className='md:w-[450px] w-[90%] h-[50px] bg-white border-none outline-none pl-6 rounded-[3px]' placeholder='Tracking ID'/>
            <Button
              type='button'
              style='primary'
              css='h-[50px]'
              fn={() => {
                if (inputRef.current?.value) {
                  router.push(`/order-tracking/${inputRef.current.value}`)
                } else {
                  toast.error('Please enter a tracking ID.')
                }
              }}
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
