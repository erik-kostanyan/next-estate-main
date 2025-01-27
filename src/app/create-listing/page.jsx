'use client';

import { useState } from 'react';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function CreateListing() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    city: '',
    geolocation: '',
    indoor_surface: 0,
    nb_bedrooms: 1,
    nb_rooms: 1,
    parking: false,
    price: 5000,
    province: "06",
    zip_code: "", 
    images: "",
    discription: "",
    furnished: false,
    offer: false,
    type: "rent"
  });

  console.log(formData);

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userMongoId: user.publicMetadata.userMogoId,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      router.push(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <h1 className='text-center text-xl my-7 font-semibold'>Loading...</h1>
    );
  }
  if (!isSignedIn) {
    return (
      <h1 className='text-center text-xl my-7 font-semibold'>
        You are not authorized to view this page
      </h1>
    );
  }


  return (
    <main className="h-screen overflow-hidden flex items-center justify-center pt-36" >
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
  <div className="container max-w-screen-lg mx-auto">
    <div>
      <h2 className="font-semibold text-xl text-gray-600">Create a listing</h2>
      <p className="text-gray-500 mb-6">//</p>

      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="text-gray-600">
            <p className="font-medium text-lg">Personal Details</p>
            <p>Please fill out all the fields.</p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-2">
                <label htmlFor="country">Type</label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <input 
                    name="type" 
                    id="type" 
                    placeholder="Sale" 
                    className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" 
                    value="" 
                    onChange={()=>{}}
                  />
                  <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                  <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokelinecaps="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                  <button tabIndex="-1" htmlFor="show_more" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"strokelinecaps="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  </button>
                </div>
              </div>
              <div className="md:col-span-3">
                <label htmlFor="full_name">Price</label>
                <input 
                  type="text" 
                  name="price"
                  id="price" 
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                  value="" 
                  onChange={()=>{}}
                />
              </div>

              <div className="md:col-span-1">
                <label htmlFor="full_name">Zipcode</label>
                <input 
                  type="text" 
                  name="zip_code" 
                  id="zip_code" 
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                  value="" 
                  onChange={()=>{}}
                />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="full_name">Province</label>
                <input 
                  type="text" 
                  name="zip_code" 
                  id="zip_code" 
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                  value="" 
                  onChange={()=>{}}
                />
              </div>
              <div className="md:col-span-3">
                <label htmlFor="full_name">City</label>
                <input 
                  type="text" 
                  name="city"
                  id="city" 
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                  value="" 
                  onChange={()=>{}}
                />
              </div>

              <div className="md:col-span-1">
                <label htmlFor="email">Surface</label>
                <input 
                  type="text" 
                  name="surface" 
                  id="surface" 
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                  value="" 
                  onChange={()=>{}}
                />
              </div>

              <div className="md:col-span-1">
                <label htmlFor="address">Rooms</label>
                <div className="h-10 w-28 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <button tabIndex="-1" htmlFor="show_more" className="cursor-pointer outline-none focus:outline-none border-r border-gray-200 transition-all text-gray-500 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRulee="evenodd" />
                    </svg>
                  </button>
                  <input 
                    type="text"
                    name="rooms" 
                    id="rooms" 
                    placeholder="0" 
                    className="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent" 
                    value="0" 
                    onChange={()=>{}}
                  />
                  <button tabIndex="-1" htmlFor="show_more" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-500 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 fill-current" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="md:col-span-1">
                <label htmlFor="city">Bedrooms</label>
                <div className="h-10 w-28 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <button tabIndex="-1" htmlFor="show_more" className="cursor-pointer outline-none focus:outline-none border-r border-gray-200 transition-all text-gray-500 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRulee="evenodd" />
                    </svg>
                  </button>
                  <input 
                    type="text"
                    name="bedrooms" 
                    id="bedrooms" 
                    placeholder="0" 
                    className="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent" 
                    value="0" 
                    onChange={()=>{}}
                  />
                  <button tabIndex="-1" htmlFor="show_more" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-500 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 fill-current" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="md:col-span-1">
                <label htmlFor="state">Parking </label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <input 
                    name="state" 
                    id="state" 
                    className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" 
                    value="" 
                    onChange={()=>{}}
                  />
                </div>
              </div>

              <div className="md:col-span-1">
                <label htmlFor="zipcode">Furnished</label>
                <input 
                  type="text" 
                  name="furnished" 
                  id="furnished" 
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                  value="" 
                  onChange={()=>{}}
                />
              </div>

              <div className="md:col-span-4">
                <label htmlFor="zipcode">Image (URL's only)</label>
                <input 
                  type="text" 
                  name="image" 
                  id="image" 
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                  value="" 
                  onChange={()=>{}}
                />
              </div>
              <div className="md:col-span-1">
                <button>Fetch Image</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</main>
  )
}
