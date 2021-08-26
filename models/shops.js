import mongoose from 'mongoose'

const Schema = mongoose.Schema

const shopSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '店名不能為空'],
      minlength: [1, '店名不能為空']
    },
    address: {
      type: String,
      minlength: [1, '地址不能為空'],
      required: [true, '地址不能為空']
    },
    description: {
      type: String
    },
    image: {
      type: String,
      required: [true, '照片不能為空']
    },
    phone: {
      type: Number,
      required: [true, '電話不能為空']
    },
    time: {
      type: String,
      required: [true, '時間不能為空']
    },
    sell: {
      type: Boolean,
      default: false
    }
  },
  { versionKey: false }
)

export default mongoose.model('shops', shopSchema)
