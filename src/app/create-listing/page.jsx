'use client';

import { useState } from 'react';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function CreateListing() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({
    city: '',
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
    // type options: ['rent', 'sale']
    if (e.target.id === 'type') {
      setFormData({
        ...formData,
        type: e.target.value,
      });
    }
    // parking and furnished options: [true, false]
    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' 
    ) {
      if (e.target.value === 'true') {
        setFormData({
          ...formData,
          [e.target.id]: true
        })
      } else if (e.target.value === 'false') {
        setFormData({
          ...formData,
          [e.target.id]: false
        })
      }
    }
    // number -> price, surface, rooms and bedrooms
    // text -> zipcode, province, city and image
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
      // send post request to the MongoDB database
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
      if (data.success === false) {
        console.log("succes");
      }
      // navigate to the new listing
      router.push(`/listing/${data._id}`);
    } catch (error) {
      console.log(error);
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
    <main className="h-screen overflow-hidden flex items-center justify-center py-36" >
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
                <label>Type</label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <select 
                    type="text"
                    name="type" 
                    id="type" 
                    className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" 
                    onChange={handleChange}
                    defaultValue={"default"}
                  >
                    <option value="default">-- Please Select -- </option>
                    <option value="sale" id="sale">Sale</option>
                    <option value="rent" id="rent">Rent</option>
                  </select>
                </div>

              </div>
              <div className="md:col-span-3">
                <label>Price</label>
                <input 
                  type="number" 
                  name="price"
                  id="price" 
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-1">
                <label>Zipcode</label>
                <input 
                  type="text" 
                  name="zip_code" 
                  id="zip_code" 
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                  onChange={handleChange}
                />
              </div>
              <div className="md:col-span-1">
                <label>Province</label>
                <input 
                  type="text" 
                  name="province" 
                  id="province" 
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                  onChange={handleChange}
                />
              </div>
              <div className="md:col-span-3">
                <label>City</label>
                <input 
                  type="text" 
                  name="city"
                  id="city" 
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-1">
                <label>Surface (in m²)</label>
                <input 
                  type="number" 
                  name="indoor_surface" 
                  id="indoor_surface" 
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-1">
                <label>Rooms</label>
                <div className="h-10 w-28 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <input 
                    type="number"
                    name="rooms" 
                    id="rooms" 
                    placeholder="0" 
                    className="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent" 
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="md:col-span-1">
                <label>Bedrooms</label>
                <div className="h-10 w-28 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <input 
                    type="number"
                    name="bedrooms" 
                    id="bedrooms" 
                    placeholder="0" 
                    className="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent" 
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="md:col-span-1">
                <label>Parking </label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <select 
                    type="text"
                    name="parking" 
                    id="parking" 
                    defaultValue={"default"}
                    className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" 
                    onChange={handleChange}
                  >
                    <option value="default" disabled>-- Select --</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-1">
                <label>Furnished</label>
                <select 
                  type="text" 
                  name="furnished" 
                  id="furnished" 
                  defaultValue={"default"}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                  onChange={handleChange}
                >
                  <option value="default" disabled>-- Select --</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="md:col-span-4">
                <label>Image (URL's only)</label>
                <input 
                  type="text" 
                  name="images" 
                  id="images" 
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                  onChange={handleChange}
                />
              </div>
              <div className="md:col-span-5">
                <label>Discription</label>
                <input 
                  type="textarea" 
                  name="discription" 
                  id="discription" 
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                  onChange={handleChange}
                />
              </div>
              <div className="md:col-span-1">
                <button 
                  type="submit" 
                  className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={handleSubmit}
                  >
                  Submit
                </button>
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
