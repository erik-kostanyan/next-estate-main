import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkerAlt,
    FaParking,
  } from 'react-icons/fa';

import { TbRulerMeasure } from "react-icons/tb";

  export default async function Listing({ params }) {
    let listing = null;
    try {
      const result = await fetch(process.env.URL + '/api/listing/get', {
        method: 'POST',
        body: JSON.stringify({ listingId: params.id }),
        cache: 'no-store',
      });
      const data = await result.json();
      listing = data[0];
    } catch (error) {
      listing = { title: 'Failed to load listing' };
    }
    if (!listing || listing.name === 'Failed to load listing') {
      return (
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
          <h2 className='text-xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-2xl'>
            Listing not found
          </h2>
        </main>
      );
    }
  
    if (listing && listing.name !== 'Failed to load listing') {
      return (
        <main>
          <div>
            <img
              src={listing.images}
              alt={"image of house"}
              className='w-3xl h-[400px] object-cover m-auto'
            />
            <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
              <p className='text-2xl font-semibold'>
                Appartement for {listing.type} - ${listing.price}
                {listing.type === 'rent' && ' / month'}
              </p>
              <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
                <FaMapMarkerAlt className='text-green-700' />
                {listing.city}
              </p>
              <div className='flex gap-4'>
                <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                </p>
              </div>
              <p className='text-slate-800'>
                <span className='font-semibold text-black'>Description - </span>
                {listing.discription}
              </p>
              <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaBed className='text-lg' />
                  {listing.rooms > 1
                    ? `${listing.nb_rooms} rooms `
                    : `${listing.nb_rooms} room `}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaBath className='text-lg' />
                  {listing.bedrooms > 1
                    ? `${listing.nb_bedrooms} bedrooms `
                    : `${listing.nb_bedrooms} bedroom `}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaParking className='text-lg' />
                  {listing.parking ? 'Parking spot' : 'No Parking'}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaChair className='text-lg' />
                  {listing.furnished ? 'Furnished' : 'Unfurnished'}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <TbRulerMeasure className='text-lg'/>
                  {listing.indoor_surface} square meters
                </li>
              </ul>
            </div>
          </div>
        </main>
      );
    }
  }
  