const Service = require('../models/Service');

exports.createService = async (req, res) => {
    const { name, address, manager } = req.body;

    try {
        let service = new Service({
            name,
            address,
            manager
        });

        await service.save();
        res.json(service);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateService = async (req, res) => {
    const { name, address, manager } = req.body;

    try {
        let service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ msg: 'Service not found' });
        }

        service.name = name || service.name;
        service.address = address || service.address;
        service.manager = manager || service.manager;

        await service.save();
        res.json(service);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteService = async (req, res) => {
    try {
        let service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ msg: 'Service not found' });
        }

        await service.remove();
        res.json({ msg: 'Service removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
