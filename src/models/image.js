import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

var Schema = mongoose.Schema;

var image = new Schema({
  file_name: {
    type: String,
    required: true,
  },
  original_url: {
    type: String,
    required: true,
  },
  compressed_url: {
    type: String,
    required: true,
  },
  original_size: {
    type: Number,
    required: true,
  },
  compressed_size: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

mongoose.models = {};

image.plugin(mongoosePaginate);
var Image = mongoose.model("Image", image);

export default Image;
