// pages/tracking/[id].js
'use client'
import { useRouter,useParams } from 'next/navigation';
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function TrackingDetail() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [trackingData, setTrackingData] = useState<Record<string,any>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    // This would typically be an API call to fetch tracking data
    // For demo purposes, we're using mock data
    setTimeout(() => {
      setTrackingData({
        trackingId: id || 'BY187746',
        parcelDate: '2023-02-20 03:42:20am',
        expectedDate: '2023-02-26',
        currentStatus: 'PARCEL ARRIVED AT OWERRI STATION',
        timeline: [
          {
            id: 1,
            status: 'Transit to OWERRI',
            date: '2023-02-20 07:42am'
          },
          {
            id: 2,
            status: 'Transit to Customs Sorting Facility',
            date: '2023-02-20 10:30am'
          },
          {
            id: 3,
            status: 'Transit to Akwa Sorting Facility',
            date: '2023-02-21 03:14pm'
          },
          {
            id: 4,
            status: 'Parcel Located (UPDATED NOTIFICATION SENT)',
            date: '2023-02-22 06:36pm'
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading tracking information...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Tracking Detail: {trackingData?.trackingId}</title>
        <meta name="description" content="Parcel tracking information" />
      </Head>

      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-xl font-semibold text-center text-gray-700 mb-6">
              TRACKING DETAIL: {trackingData?.trackingId}
            </h1>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h2 className="text-sm font-medium text-gray-600 mb-2">Parcel Date</h2>
                <div className="bg-gray-100 p-3 rounded">
                  <p className="text-gray-700">{trackingData?.parcelDate}</p>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-medium text-gray-600 mb-2">Expected Date</h2>
                <div className="bg-gray-100 p-3 rounded">
                  <p className="text-gray-700">{trackingData?.expectedDate}</p>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-sm font-medium text-gray-600 mb-2">Current Status</h2>
              <div className="text-center py-6">
                <h3 className="text-xl font-bold text-red-700">{trackingData?.currentStatus}</h3>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-center mb-6">TIMELINE</h2>
              <div className="space-y-6">
                {trackingData?.timeline.map((event, index) => (
                  <div key={event.id} className="relative pl-8">
                    <div className="absolute left-0 top-1.5 w-3 h-3 bg-red-600 rounded-full"></div>
                    <div className="mb-1 text-gray-800">{event.status}</div>
                    <div className="text-sm text-gray-500">{event.date}</div>
                    {index < trackingData.timeline.length - 1 && (
                      <div className="absolute left-1.5 top-4 w-0.5 h-12 bg-gray-300"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}