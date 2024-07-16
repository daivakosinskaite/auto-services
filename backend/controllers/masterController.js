const Master = require('../models/Master');

exports.createMaster = async (req, res) => {
    const { firstName, lastName, specialization, photo, city, service } = req.body;

    try {
        let master = new Master({
            firstName,
            lastName,
            specialization,
            photo,
            city,
            service
        });

        await master.save();
        res.json(master);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getMasters = async (req, res) => {
    try {
        const masters = await Master.find().populate('service');
        res.json(masters);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateMaster = async (req, res) => {
    const { firstName, lastName, specialization, photo, city, service } = req.body;

    try {
        let master = await Master.findById(req.params.id);

        if (!master) {
            return res.status(404).json({ msg: 'Master not found' });
        }

        master.firstName = firstName || master.firstName;
        master.lastName = lastName || master.lastName;
        master.specialization = specialization || master.specialization;
        master.photo = photo || master.photo;
        master.city = city || master.city;
        master.service = service || master.service;

        await master.save();
        res.json(master);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteMaster = async (req, res) => {
    try {
        let master = await Master.findById(req.params.id);

        if (!master) {
            return res.status(404).json({ msg: 'Master not found' });
        }

        await master.remove();
        res.json({ msg: 'Master removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
