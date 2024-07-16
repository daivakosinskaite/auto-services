const express = require('express');
const router = express.Router();
const Master = require('../models/Master');


router.get('/', async (req, res) => {
    try {
        const masters = await Master.find();
        res.json(masters);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.post('/', async (req, res) => {
    const { firstName, lastName, specialization, photo, city, service } = req.body;
    try {
        const newMaster = new Master({
            firstName,
            lastName,
            specialization,
            photo,
            city,
            service
        });

        const master = await newMaster.save();
        res.json(master);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;