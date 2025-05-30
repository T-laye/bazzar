// pages/orders/[id].js
import { useRouter,useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useGetOrderById } from '@/hooks/useOrder';
import {v4 as uuidV4} from 'uuid'
 
export default function OrderDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const { data: order, isLoading, error } = useGetOrderById(orderId as string);
    console.log(order)
  if (isLoading) return <p>Loading order details...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  
  // Sample order data - in a real app this would come from an API
  const orderData = {
    orderNumber: 'TF-07845Qh',
    orderDate: '24-08-2023',
    trackingId: '35467289366457',
    item: {
      name: 'Power Engine Drill',
      price: 300000,
      quantity: 1,
      image: '/placeholder.jpg',
      status: 'Delivered'
    },
    delivery: {
      name: 'Helen Uju',
      phone: '+2348063627487',
      email: 'Adaisagirl@gmail.com',
      address: '25 elijiji housing estate, Woji, Port Harcourt'
    },
    payment: {
      method: 'Bank Transfer',
      subtotal: 300000,
      deliveryFee: 'Free',
      total: 300000
    }
  };
  const formatDate = (dateString:Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-');
  };

  const shippingCost = order?.deliveryOption === 'express' ? 3000 : order?.deliveryOption === 'next-day' ? 5000 : 1500;
  const realPrice = order?.totalAmount as number - shippingCost
  return (
    <div className="container mx-auto max-w-2xl p-6">
      {/* Back button */}
      <Link href="?tab=orders" className="flex items-center text-gray-700 mb-6">
        <ArrowLeft size={18} className="mr-2" />
        <span>Order Details</span>
      </Link>

      {/* Order Information */}
      <div className="mb-6">
        <div className="bg-gray-700 text-white py-2 px-4 rounded mb-3">
          <h2>Order Information</h2>
        </div>
        
        <div className="space-y-2 px-1">
          <p><span className="font-medium">Order Number:</span> {orderId}</p>
          <p><span className="font-medium">Order Date:</span> {formatDate(order?.createdAt as Date)}</p>
          <p><span className="font-medium">Tracking ID:</span> {order?.trackingId}</p>
        </div>
      </div>
      
      <hr className="my-6 border-gray-200" />

      {/* Item Ordered */}
      <div className="mb-6">
        <div className="bg-gray-700 text-white py-2 px-4 rounded mb-3">
          <h2>Item(s) Ordered</h2>
        </div>
        
        {order?.products?.map((product) =>(
            <div className="flex mt-3" key={uuidV4()} >
            {/* Item image */}
            <img src={product.picture} className="bg-gray-200 w-16 h-16 flex-shrink-0"/>
            
            {/* Item details */}
            <div className="flex-grow px-4">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-black">₦{product.price.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
            </div>
            
            {/* Right side status and buttons */}
            <div className="flex flex-col items-end justify-between">
              {/* <span className="bg-green-500 text-white text-xs px-3 py-1 rounded">
                {order.status}
              </span> */}
              <div className="space-y-2">
                <Link href={`products/product/${product.productId}`} className="bg-red-700 text-white text-sm py-1 px-4 rounded w-full">
                  Buy Again
                </Link>
                {/* <button className="text-gray-700 text-sm py-1 px-4 w-full text-right">
                  See Status
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery and Payment Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Delivery Information */}
        <div>
          <div className="bg-gray-700 text-white py-2 px-4 rounded mb-3">
            <h2>Delivery Information</h2>
          </div>
          
          <div className="space-y-2 px-1">
            <p><span className="font-medium">Name:</span> {order?.billing?.name}</p>
            <p><span className="font-medium">Phone Number:</span> {order?.billing.phone}</p>
            <p><span className="font-medium">Email:</span> {order?.billing.email}</p>
            <p><span className="font-medium">Address:</span> {order?.shippingAddress?.state}, {order?.shippingAddress?.city}, {order?.shippingAddress?.street}, {order?.shippingAddress?.country}</p>
          </div>
        </div>

        {/* Payment Information */}
        <div>
          <div className="bg-gray-700 text-white py-2 px-4 rounded mb-3">
            <h2>Payment Information</h2>
          </div>
          
          <div className="space-y-2 px-1">
            <p><span className="font-medium">Payment Method:</span>Paystack payment gateway</p>
            <p><span className="font-medium">Payment Details:</span></p>
            <p className="pl-4"><span className="font-medium">Sub-Total:</span> ₦{realPrice?.toLocaleString()}</p>
            <p className="pl-4"><span className="font-medium">Delivery Fee:</span> {shippingCost?.toLocaleString()}</p>
            <p className="font-medium">Total: ₦{order?.totalAmount?.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}