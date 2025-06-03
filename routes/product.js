import express from 'express';
import { admin, db } from '../config/Connecion.js';

export const createProduct=async(req,res)=>{
    const product=req.body;

    if (product.name==null || product.grossprice==null || product.quantity==null || product.category==null ) {
        return res.status(400).json({error:'Name, price and quantity are required'});
    }

    if (product.iva==null) {
        product.iva=0.16;
    }

    try {

       const categorySnapshot = await db
            .collection('categories')
            .where('name', '==', product.category)
            .get();
        if (categorySnapshot.empty) {
            return res.status(400).json({error: 'Category does not exist'});
        }

        const productRef=db.collection('products');
        const productSnapshot = await productRef
            .where('name', '==', product.name)
            .where('category', '==', product.category)
            .get();
        if (!productSnapshot.empty) {
            return res.status(400).json({error:'Product already exists'});
        }

        const newProduct=({
            name:product.name,
            grossprice: product.grossprice,
            quantity: product.quantity,
            category: product.category,
            iva: product.iva,
            price: product.grossprice+(product.grossprice*product.iva),
            photos: product.photos || [],
            expiry_date: product.expiry_date,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        })

        const productDocRef=await db.collection('products').add(newProduct);
        return res.status(201).json({
            message:'Product created successfully!',
            productId: productDocRef.id
        });

    }catch (e) {
        console.error('Error creating product:', e);
        return res.status(500).json({ error: 'Internal error! Server not avaiable' });
    }

};

const router = express.Router();

router.post('/create-product', createProduct);
export default router;