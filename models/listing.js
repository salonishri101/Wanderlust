const mongoose = require("mongoose");
const Schema= mongoose.Schema;
const Review = require("./review.js");
const { types } = require("joi");
const listingSchema = new Schema({
    title:{
type:String,
required:true,
    },
    description:{
        type:String
    },
    image:{
        url:{
            type:String,
            required:true
        },
        filename:{
            type:String,
            required:true
        }
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    geometry:{

        type: {
            type: String, // 'Point'
            enum: ['Point'], // 'Point' is the only valid value
            required: true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    }

});

listingSchema.post("findOneAndDelete",async(listing)=>{

    if(listing){
        await Review.deleteMany({
            _id: {
                $in: listing.reviews
            }
        });
    }
})

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;