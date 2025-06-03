import express from 'express';
import { admin, db } from '../config/Connecion.js';

export const createProductStatus=async(req,res)=>{
    const productStatus=req.body;
    if (productStatus.name==null) {
        return res.status(400).json({error:'Name is required'});
    }
    try {
        const productStatusRef=db.collection('productStatus');
        const productStatusSnapshot=await productStatusRef.where('name', '==', productStatus.name).get();
        if (!productStatusSnapshot.empty) {
            return res.status(400).json({error:'order status already exists'});
        }

        const newProductStatus=({
            name:productStatus.name,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        })
        const productStatusDocRef=await db.collection('productStatus').add(newProductStatus);
        return res.status(201).json({
            message:'Product status created successfully!',
            productStatusId: productStatusDocRef.id
        })
    }catch (e){
        console.error('Error creating product status:',e);
        return res.status(500).json({error:'Internal error'});
    }
};

export const listStatus=async(req,res)=>{
    try {
        const snapshot=await db.collection('productStatus').get();
        const status=snapshot.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
        }))
        return res.status(200).json(status);
    }catch (e) {
        console.error('Error getting status:',e);
        return res.status(500).json({error:'Internal error'});
    }

};

const router = express.Router();

router.post('/create-order-status', createProductStatus);
router.get('/list-order-status', listStatus);
export default router;