import Listing from '../../../../lib/models/listing.model.js';
import { connect } from '../../../../lib/mongodb/mongoose.js';
import { currentUser } from '@clerk/nextjs/server';
export const POST = async (req) => {
  const user = await currentUser();
  try {
    await connect();
    const data = await req.json();
    if (!user || user.publicMetadata.userMogoId !== data.userMongoId) {
      return new Response('Unauthorized', {
        status: 401,
      });
    }
    const newListing = await Listing.create({
      userRef: user.publicMetadata.userMogoId,
      // the next line is for manual import with Python's post requests
      // userRef: data.userMongoId,
      city: data.city,
      indoor_surface: data.indoor_surface, 
      nb_bedrooms: data.nb_bedrooms, 
      nb_rooms: data.nb_rooms, 
      parking: data.parking,
      price: data.price, 
      province: data.province,
      zip_code: data.zip_code, 
      images: data.images,
      discription: data.discription,
      furnished: data.furnished,
      offer: data.offer,
      type: data.type
    });
    await newListing.save();
    return new Response(JSON.stringify(newListing), {
      status: 200,
    });
  } catch (error) {
    console.log('Error creating post:', error);
    return new Response('Error creating post: ' + error, {
      status: 500,
    });
  }
};
