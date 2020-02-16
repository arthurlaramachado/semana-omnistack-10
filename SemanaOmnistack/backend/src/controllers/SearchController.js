const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseArrayAsString');

exports.index = async (req, res) => {
    const { latitude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
        techs: {
            $in: techsArray,
        },
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                },
                $maxDistance: 100000,
            },
        },
    });
    
    return res.json({ devs });
};