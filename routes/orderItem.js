import express from 'express';
import {admin, db} from '../config/Connecion.js';

export const orderItem = async (req, res) => {
    const itemData = req.body;

    if (!itemData.name|| !itemData.category || !itemData.quantity || !itemData.price) {
        return res.status(400).send({error: 'Item data is required'});
    }
    //todo product details
    try {
        const productSnapshot = await db.collection('products')
            .where('name', '==', itemData.name)
            .where('price', '==', itemData.price)
            .where('category', '==', itemData.category)
            .get();
        if (productSnapshot.empty) {
            return res.status(404).send({error: 'Product not found'});
        }

        const productDoc = productSnapshot.docs[0];
        const productData = productDoc.data();

        if (itemData.quantity > productData.quantity) {
            return res.status(400).send({error: 'Quantity not available'});
        }


    } catch (error) {
        console.error("Erro ao buscar produto:", error);
        return res.status(400).json({error: 'error finding products'});
    }

    try {

        const orderItem = ({
            name: itemData.name,
            price: itemData.price,
            quantity: itemData.quantity,
        })

        const orderDoc = await db.collection('orders').add(orderItem);
        return res.status(201).json({
            message: 'orderItem created successfully!',
            orderId: orderDoc.id
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({error: 'Internal error! Server not avaiable'});
    }

};

const router = express.Router();
router.post('/orderItem', orderItem);
export default router;