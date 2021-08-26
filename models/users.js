import mongoose from 'mongoose'
import md5 from 'md5'
import validator from 'validator'

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    account: {
      type: String,
      minlength: [4, '帳號必須 4 個字以上'],
      maxlength: [20, '帳號不能超過 20 個字'],
      unique: true,
      required: [true, '帳號不能為空']
    },
    name: {
      type: String,
      minlength: [2, '名字必須 2 個字以上'],
      maxlength: [5, '名字不能超過 5 個字'],
      required: [true, '名字不能為空']
    },
    password: {
      type: String,
      minlength: [4, '密碼必須 4 個字以上'],
      maxlength: [20, '密碼不能超過 20 個字'],
      required: [true, '密碼不能為空']
    },
    // email: {
    //   type: String,
    //   required: [true, '信箱不能為空'],
    //   unique: true,
    //   validate: {
    //     validator: email => {
    //       return validator.isEmail(email)
    //     },
    //     message: '信箱格式不正確'
    //   }
    // },
    phone: {
      type: String,
      required: [true, '電話不能為空'],
      unique: true,
      validate: {
        validator: phone => {
          return validator.isMobilePhone(phone, 'zh-TW')
        },
        message: '電話格式不正確'
      }
    },
    petName: {
      type: String,
      minlength: [1, '寵物名字必須 1 個字以上'],
      maxlength: [10, '寵物名字不能超過 10 個字'],
      required: [true, '寵物名字不能為空']
    },
    petGender: {
      type: String,
      required: [true, '寵物性別不能為空']
    },
    petType: {
      type: String,
      required: [true, '寵物類別不能為空']
    },
    role: {
      // 0 = 一般會員
      // 1 = 管理員
      // 2 = 店家
      type: Number,
      default: 0,
      required: [true, '沒有使用者分類']
    },
    tokens: {
      type: [String]
    },
    cart: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: 'products',
            required: [true, '缺少商品 ID']
          },
          amount: {
            type: Number,
            required: [true, '缺少商品數量']
          }
        }
      ]
    }
  },
  { versionKey: false }
)

UserSchema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = md5(user.password)
  }
  next()
})

export default mongoose.model('users', UserSchema)
