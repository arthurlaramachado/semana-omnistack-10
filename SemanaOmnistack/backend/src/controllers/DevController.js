const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseArrayAsString');
const { findConnections, sendMessage } =  require('../websocket');

exports.store =  async (req, res) => {
    const { github_username, techs, latitude, longitude } = req.body;
    
    let dev = await Dev.findOne({ github_username });

    if (!dev) {
        // await --> manda esperar até ter uma resposta para executar a próxima linha
        const gitApiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

        const { name = login, avatar_url, bio } = gitApiResponse.data;

        const techsArray = parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }

        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        });

        const sendSocketMessageTo = findConnections(
            {
                latitude,
                longitude,
            },
            techsArray,
        )

        sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

    return res.json(dev);
}

exports.index = async (req, res) => {
    const devs = await Dev.find();

    return res.json(devs);
};

exports.delete = async (req, res) => {
    Dev.deleteOne({_id:req.params.id}, err => {
        if (err) return handleError(err);
    })  
}