import Link from 'next/link';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link href={`/listing/${listing._id}`}>
        <img
          src={
            listing.images ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.city}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.discription}
          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
            $ {listing.price}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.bedrooms > 1
                ? `${listing.nb_bedrooms} bedrooms `
                : `${listing.nb_bedrooms} bedroom `}
            </div>
            <div className='font-bold text-xs'>
              {listing.bathrooms > 1
                ? `${listing.nb_rooms} rooms `
                : `${listing.nb_rooms} room `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}