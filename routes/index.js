const { Router } = require('express');
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const userRoutes = require('./userRoutes');
const indexRouter = Router();

indexRouter.use('/auth', authRoutes);
indexRouter.use('/admin', adminRoutes);
indexRouter.use('user', userRoutes);
module.exports = indexRouter;
