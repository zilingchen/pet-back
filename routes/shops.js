import express from 'express'
import auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'

import { newShop, getShop, editShop, getAllShop, getShopById } from '../controllers/shops.js'

const router = express.Router()

router.post('/', auth, upload, newShop)
router.get('/', getShop)
router.get('/all', auth, getAllShop)
router.get('/:id', getShopById)
router.patch('/:id', auth, upload, editShop)

export default router
