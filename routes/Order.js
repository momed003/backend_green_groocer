const express = require('express');
const { admin, db } = require('../config/Connecion');
const orderItem = require('./orderItem');

 const create_order = async (req, res) => {
    const orderData = req.body;

    if (!orderData.date || !orderData.status || !orderData.itemOrder || !orderData.userId || orderData.paymentsMethod) {
        return res.status(400).send({error: 'all fields are required'});
    }

    try {
        const validItems = [];
        let total = 0;

        const statusSnapshot = await db.collection('productStatus')
            .where('name', '==', orderData.status)
            .get();

        if (statusSnapshot.empty) {
            return res.status(400).send({ error: 'Status inválido. Deve ser um valor existente na tabela productStatus.' });
        }

        for (const item of orderData.itemOrder) {
            const snapshot = await db.collection('orders')
                .where('name', '==', item.name)
                .where('price', '==', item.price)
                .get();

            if (snapshot.empty) {
                console.log(`order not found: ${item.name}`);
                continue;
            }

            let itemValidated = false;

            snapshot.forEach(doc => {
                const productData = doc.data();
                if (item.quantity <= productData.quantity) {
                    validItems.push({
                        productId: doc.id,
                        name: productData.name,
                        price: productData.price,
                        quantity: item.quantity,
                        subtotal: productData.price * item.quantity
                    });
                    total += productData.price * item.quantity;
                    itemValidated = true;
                }
            });

            if (!itemValidated) {
                console.log(`Quantidade insuficiente para: ${item.name}`);
            }
        }

        if (validItems.length === 0) {
            return res.status(400).send({error: 'Nenhum item válido na encomenda'});
        }


        const orderRef = await db.collection('orders').add({
            date: orderData.date,
            status: orderData.status,
            userId: orderData.userId,
            paymentsMethod: orderData.paymentsMethod,
            itemOrder: validItems,
            total: total,
        });


        const userDoc = await db.collection('users').doc(orderData.userId).get();
        const userData = userDoc.exists ? userDoc.data() : null;

        return res.status(201).send({
            orderId: orderRef.id,
            user: userData,
            items: validItems,
            total: total,
            status: orderData.status,
            date: orderData.date
        });


    } catch (e) {
        console.error(e);
        return res.status(500).send({error: 'Internal Server Error'});
    }
};

const router = express.Router();
router.post('/create-order', create_order);
module.exports = router;