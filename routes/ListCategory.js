import express from 'express'
import {db} from '../config/Connecion.js';

export const listCategory=async(req,res)=>{
    try {
        const snapshot=await db.collection('categories').get();
        const categories=snapshot.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
        }))
        return res.status(200).json(categories);
    }catch (e) {
        console.error('Error getting categories:',e);
        return res.status(500).json({error:'Internal error'});
    }

};

const router = express.Router();
router.get('/list-category', listCategory);
export default router;