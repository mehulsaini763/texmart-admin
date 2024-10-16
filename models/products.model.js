import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
  {
    storeId: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    sizeId: {
      type: Schema.Types.ObjectId,
      ref: 'Size',
      required: true,
    },
    colorId: {
      type: Schema.Types.ObjectId,
      ref: 'Color',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      required: true,
    },
    isArchived: {
      type: Boolean,
      required: true,
    },
    images: [{ type: String }],
  },
  { timestamps: true },
);

export default mongoose.models.Product || mongoose.model('Product', productSchema);