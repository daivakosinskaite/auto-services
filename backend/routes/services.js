const express = require('express');
const router = express.Router();
const Service = require('../models/Service');


router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.post('/', async (req, res) => {
    const { name, address, manager } = req.body;
    try {
        const newService = new Service({
            name,
            address,
            manager
        });

        const service = await newService.save();
        res.json(service);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;