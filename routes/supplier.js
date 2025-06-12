const express = require('express');
const { admin, db } = require('../config/Connecion');

 const createSupplier=async(req,res)=>{
    const supplier=req.body;

    if (supplier.name==null||supplier.email==null||supplier.phone==null||supplier.nuit==null|| supplier.adress==null || supplier.password==null) {
        return res.status(400).json({error:'All fields are required'});
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@greengrocer\.mz$/;
    if (!emailRegex.test(supplier.email.toLowerCase())) {
        return res.status(400).json({
            statusCode:400,
            error: 'Invalid email address',
            message: 'only @greengrocer.mz emails are allowed'
        });
    }

    try {
        const supplierRef=db.collection('suppliers');
        const supplierSnapshot=await supplierRef.where('email', '==', supplier.email).get();
        if (!supplierSnapshot.empty) {
            return res.status(400).json({
                statusCode:400,
                error:'Email already in use'});
        }

        const newSupplier=({
            name:supplier.name,
            email: supplier.email,
            password: supplier.password,
            phone: supplier.phone,
            nuit: supplier.nuit,
            adress: supplier.adress,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        })

        const supplierDocRef=await db.collection('suppliers').add(newSupplier);
        return res.status(201).json({
            statusCode:200,
            message:'Supplier created successfully!',
            supplierId: supplierDocRef.id
        });

    }catch (e) {
        console.error('Error creating supplier:', e);
        return res.status(500).json({
            statusCode:500,
            error: 'Internal error! Server not avaiable'
        });
    }

};
const router = express.Router();

router.post('/create-supplier', createSupplier);

module.exports = router;