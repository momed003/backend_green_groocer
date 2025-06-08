const express = require('express');
const { admin, db } = require('../config/Connecion');

 const createCategory=async(req,res)=>{
    const category=req.body;
    if (category.name==null) {
        return res.status(400).json({error:'Name is required'});
    }

    try {

        const categoryRef=db.collection('categories');
        const categorySnapshot=await categoryRef.where('name', '==', category.name).get();
        if (!categorySnapshot.empty) {
            return res.status(400).json({error:'Category already exists'});
        }

        const newCategory=({
            name:category.name,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        })
        const categoryDocRef=await db.collection('categories').add(newCategory);
        return res.status(201).json({
            message:'Category created successfully!',
            categoryId: categoryDocRef.id
        });
    }catch (e) {
        console.error('Error creating category:', e);
        return res.status(500).json({ error: 'Internal error! Server not avaiable' });
    }

};

const router = express.Router();
router.post('/create-category', createCategory);

module.exports = router;