import mongoose, { trusted } from 'mongoose';
const listingSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    geolocation: {
      type: String,
      required: false,
      default: "",
    },
    indoor_surface: {
      type: Number,
      required: true
    },
    nb_bedrooms: {
      type: Number, 
      required: true
    },
    nb_rooms: {
      type: Number, 
      required: true
    },
    parking: {
      type: Boolean,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    province: {
      type: String, 
      required: true
    },
    zip_code: {
      type: String,
      required: true
    },
    images: {
      type: String,
      required: true
    }, 
    discription: {
      type: String, 
      required: false,
      default: ""
    },
    furnished: {
      type: Boolean, 
      required: false,
      default: false
    },
    offer: {
      type: Boolean,
      required: false,
      default: false
    },
    type: {
      type: String,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Listing = mongoose.models.Listing || mongoose.model('Listing', listingSchema);
export default Listing;