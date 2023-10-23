import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const bookSchema = new Schema({
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
    type: Number,
    required: true,
  },
},
  {
    timestamps: true,
  });

const Book = model('Book', bookSchema);

export default Book;

