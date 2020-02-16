const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// async --> avisa que esta função pode demorar a responder
routes.route('/devs')
.post(DevController.store)
.get(DevController.index);

routes.route('/search')
.get(SearchController.index);

routes.route('/deleteDev/:id')
.delete(DevController.delete);

module.exports = routes;