import express from 'express';
import { admin, db } from '../config/Connecion.js';

export const updateProduct = async (req, res) => {
    const { name, category,  iva,...updateData } = req.body;


    if (!name || !category) {
        return res.status(400).json({ error: '"name" and "category" fields are required.' });
    }

    if ('quantity' in updateData) {
        delete updateData.quantity;
    }

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: 'No fields to update.' });
    }

    try {

        const snapshot = await db.collection('products')
            .where('name', '==', name)
            .where('category', '==', category)
            .limit(1)
            .get();

        if (snapshot.empty) {
            return res.status(404).json({ error: 'Product not found with the given name and category.' });
        }

        const productRef = snapshot.docs[0].ref;
        const productData = snapshot.docs[0].data();

        const ivaValue = iva !== undefined ? iva : (productData.iva !== undefined ? productData.iva : 0.16);

        if ('grossprice' in updateData) {
            const newGrossPrice = updateData.grossprice;
            updateData.price = newGrossPrice + (newGrossPrice * ivaValue);
        }
        if (iva === undefined) {
            delete updateData.iva;
        } else {
            updateData.iva = ivaValue;
        }

        await productRef.update(updateData);

        return res.status(200).json({ message: 'Product updated successfully ' });
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

const router = express.Router();

router.put('/update-product', updateProduct);
export default router;