const { Router } = require('express');
const { verifyJwtToken } = require('../middlewares/jwt');
const validateRole = require('../middlewares/validateRole');
const userController = require('../controllers/userController')
const userRoutes = Router();
userRoutes.use(verifyJwtToken);
userRoutes.use(validateRole('user'));

userRoutes.get('/categories', userController.categoryList);
module.exports = userRoutes;
