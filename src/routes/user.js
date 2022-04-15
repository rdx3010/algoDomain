const express = require('express');
const router = new express.Router();
const Product = require('../model/product');
const ObjectId = require('mongodb').ObjectID;


router.post('/createProduct', async (req, res) => {
    const product = new Product(req.body);

    try {
        await product.save()
        let response = {
            data: product,
            error: null,
            status: true,
        }
        res.status(201).send(response);
    } catch (e) {
        let response = {
            data: null,
            error: e,
            status: false
        }
        res.status(400).send(response);
    }

});

router.post('/getProducts', async (req, res) => {
    const update = Object.keys(req.body);
    const allowedSearches = ['name', 'type', 'category', 'price_range'];
    const isSearchAllowed = allowedSearches.includes(update[0]);

    if(!isSearchAllowed){
        return res.status(400).send('Invalid Search');
    }

    try {
        let request = { }
        request[update[0]] = req.body[update[0]];
        const product = await Product.find(request)

        res.status(200).send({ body: product, message: 'Search Complete', error: null, status: true });
    } catch (e) {
        res.status(400).send(e)
    }
});

router.post('/getProduct/:id', async (req, res) => {

    try {
        const products = await Product.find({user_id: req.params.id});

        if (!products) {
            return res.status(200).send('No products found!')
        }
        let response = {
            data: products,
            error: null,
            status: true
        }
        res.status(200).send(response)
    } catch (e) {
        let response = {
            data: null,
            error: e,
            status: false
        }
        res.status(400).send(response);
    }
});

router.post('/updateProduct/:user_id/:product_id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'type', 'category', 'price_range'];
    const isUpdateAllowed = updates.every((update) => allowedUpdates.includes(update));

    if(!isUpdateAllowed){
        return res.status(400).send('Invalid Update');
    }

    try {
        console.log(req.params.product_id)
        console.log(updates[0])
        const product = await Product.find({user_id: req.params.user_id, _id: ObjectId(req.params.product_id)})
        product[0][updates[0]] = req.body[updates[0]];
        console.log(product)
        await product[0].save();

        res.status(200).send({ body: null, message: 'Product Updated', error: null, status: true });
    } catch (e) {
        res.status(400).send(e)
    }
});

router.post('/deleteProduct/:id', async (req, res) => {     //async and await

    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).send({ message: 'Product deleted!', status: true });
    } catch (e) {
        res.status(400).send({ message: 'Product id not found!', status: false });
    }
});

module.exports = router;