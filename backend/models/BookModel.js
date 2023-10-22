import mongoose from 'mongoose';
const { Schema } = mongoose;

const Book = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publishyear: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
  }
);
