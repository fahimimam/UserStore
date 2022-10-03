const express = require('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');
/**
 * @Description Route  
 * @method GET/
 */

route.get('/', services.homeRoutes);
 route.get('/add-user', services.add_user)


 route.post('/api/users', controller.create);
 route.get('/api/users', controller.find);
 route.get('/api/users/:id',controller.view);
 route.get('/api/users/:id', controller.update);
 route.delete('/api/users/:id', controller.delete);

  module.exports = route