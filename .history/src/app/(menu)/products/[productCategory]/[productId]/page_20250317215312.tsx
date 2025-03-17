/* eslint-disable @next/next/no-img-element */
"use client";
import PageLoading from "@/components/ui/PageLoading";
import { useGetProductsById } from "@/hooks/useProducts";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import React, { useContext, useRef, useState } from "react";
import { HeartIcon, Home, ChevronRight } from "lucide-react";
import { cartService } from "@/hooks/useCart";
import { AppContext, IContext } from "@/providers/Context";
import Button from "@/components/ui/Button";
import PaystackHookWrapper from "@/components/cart/paystackPayment";
import { useSessionStore } from "@/store/SessionStore";

export default function Page() {
  const { productId } = useParams();
  const { data, isLoading } = useGetProductsById(productId as string);
  const router = useRouter();
  const {session} = useSessionStore();
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');
  const [selectedImage, setSelectedImage] = useState(0);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const {setCartItems} = useContext(AppContext) as IContext
   const buttonRef = useRef<HTMLButtonElement>(null);

  // console.log(data, productId);

  return (
    <div className="min-h-[70vh]">
      {isLoading ? (
        <PageLoading />
      ) : (
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="text-sm mb-6">
            <ol className="list-none p-0 flex items-center">
              <li className="flex items-center">
                <Link href="/" className="text-gray-600 hover:text-red-700 flex items-center">
                  <Home size={16} />
                  <span className="ml-1">Home</span>
                </Link>
                <ChevronRight size={16} className="mx-2 text-gray-500" />
              </li>
              <li className="text-red-700">Product page</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              {data?.product_media && data.product_media.length > 0 ? (
                <>
                  <div className="relative bg-white rounded-lg overflow-hidden h-64 md:h-96 border">
                    <img 
                      src={data.product_media[selectedImage]} 
                      alt={data?.name || "Product image"} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {data.product_media.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {data.product_media.slice(0, 4).map((media:string, index:number) => (
                        <div 
                          key={index} 
                          className={`cursor-pointer border rounded-lg overflow-hidden h-20 ${selectedImage === index ? 'ring-2 ring-red-500' : ''}`}
                          onClick={() => setSelectedImage(index)}
                        >
                          <img src={media} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-gray-100 h-64 md:h-96 w-full rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold">{data?.name || "Power Engine Drill"}</h1>
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <HeartIcon size={24} />
                </button>
              </div>
              
              <p className="text-sm text-gray-600 mt-2">Product id: {data?.product_id || "p9450202"}</p>
              
              {data?.rating && (
                <div className="flex items-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star} 
                      className={`w-5 h-5 ${star <= Math.round(data.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600">{data.rating?.toFixed(1)} ({data.reviewCount || 121} Reviews)</span>
                </div>
              )}
              
              <div className="mt-4 text-sm text-gray-700">
                <p>{data?.product_description || "Quisque varius diam vel metus mattis, id aliquam diam rhoncus. Proin vitae magna in dui finibus malesuada et at nulla. Morbi elit ex, viverra vitae ante vel, blandit feugiat ligula."}</p>
              </div>
              
              <div className="mt-6">
                <p className="text-3xl font-bold text-red-700">₦ {data?.pricing?.unit_price?.toLocaleString() || "300,000"}</p>
              </div>
              
              <div className="mt-4">
                <p>Make an enquiry about this product. <a href="#" className="text-red-700 hover:underline">Click Here</a></p>
              </div>
              
              <div className="flex items-center mt-6">
                <div className="flex items-center border border-gray-300 rounded">
                  <button 
                    onClick={decrementQuantity} 
                    className="px-3 py-1 text-xl"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-l border-r border-gray-300">{quantity}</span>
                  <button 
                    onClick={incrementQuantity} 
                    className="px-3 py-1 text-xl"
                  >
                    +
                  </button>
                </div>
                <Button style="primary" type="button" css="">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>

          {/* Description Tabs */}
          <div className="mt-12">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {['Description', 'Specifications', 'Reviews'].map((tab) => (
                  <button
                    key={tab}
                    className={`py-4 px-1 ${
                      activeTab === tab
                        ? 'border-b-2 border-red-700 font-medium text-red-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="py-6">
              {activeTab === 'Description' && (
                <div className="space-y-4">
                  {data?.fullDescription ? (
                    <div dangerouslySetInnerHTML={{ __html: data.fullDescription }} />
                  ) : (
                    <>
                      <p>Lorem ipsum amet minim non deserunt ullamco est sit aliqua dolor do amet sint amet minim non deserunt ullamco est sita dolor do amet deserunt ulcolor do amet sint amet minim.</p>
                      
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Lorem ipsum amet minim non deserunt ullamco est sit.</li>
                        <li>Lorem ipsum amet ullamco est sit.</li>
                        <li>Lorem ipsum amet minim non ullamco est sit.</li>
                        <li>Lorem ipsum amet est sit.</li>
                      </ul>
                      
                      <p>Lorem ipsum amet minim non deserunt ullamco est sit aliqua dolor do amet sint amet minim non deserunt ullamco est sita dolor do amet sint deserunt ullamcolor do amet sint amet minim.</p>
                    </>
                  )}
                </div>
              )}
              
              {activeTab === 'Specifications' && (
                <div>
                  {data?.specifications ? (
                    <div dangerouslySetInnerHTML={{ __html: data.specifications }} />
                  ) : (
                    <p>Product specifications will be displayed here.</p>
                  )}
                </div>
              )}
              
              {activeTab === 'Reviews' && (
                <div>
                  {data?.reviews && data.reviews.length > 0 ? (
                    <div className="space-y-4">
                      {data.reviews.map((review:any, index:number) => (
                        <div key={index} className="border-b pb-4">
                          <div className="flex items-center">
                            <p className="font-medium">{review.user || "Anonymous"}</p>
                            <div className="flex ml-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg 
                                  key={star} 
                                  className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                  fill="currentColor" 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">{review.date || "March 10, 2025"}</p>
                          <p className="mt-2">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No reviews available for this product.</p>
                  )}
                </div>
              )}
            </div>
          </div>
          <PaystackHookWrapper mode='instant' amount={data?.pricing?.unit_price} email={session?.user?.email as string} buttonRef={buttonRef}/>
          
        </div>
      )}
    </div>
  );
}