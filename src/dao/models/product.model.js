import mongoose, { Schema, model } from 'mongoose';
//import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSchema = new Schema ({
    title: { 
      type: String, 
      unique: true, 
      required: true 
    },
    description: String,
    code: { 
      type: String, 
      unique: true, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true, 
      min: 0 
    },
    stock: { 
      type: Number, 
      default: 0, 
      min: 0 
    },
    category: { 
      type: String, 
      required: true 
    },
    thumbnails: { 
      type: [String], 
      default: [] 
    }
    }, { timestamps: true }
);

//ProductSchema.plugin(mongoosePaginate)

export default model("Product", ProductSchema)