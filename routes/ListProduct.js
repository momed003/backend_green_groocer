const express = require('express');
const { admin, db } = require('../config/Connecion');

 const listProduct=async(req,res)=>{

    const snapshot=await db.collection('products').get();

    try {
        const products=snapshot.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
        }))

        return res.status(200).json(products);
    }catch (e){
        console.error('Error getting products:',e);
        return res.status(500).json({error:'Internal error'});
    }

};

const router = express.Router();

router.get('/list-product', listProduct);

module.exports = router;