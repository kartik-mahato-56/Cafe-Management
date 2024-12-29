const { Router } = require('express');
const { verifyJwtToken } = require('../middlewares/jwt');
const validateRole = require('../middlewares/validateRole');
const validateRequestSchema = require('../middlewares/validateRequest');
const validationSchema = require('../utils/validationSchema');
const adminController = require('../controllers/adminController');

const adminRoutes = Router();

adminRoutes.use(verifyJwtToken);
adminRoutes.use(validateRole('admin'));
adminRoutes.get('/user-list', adminController.userLists);

/** ------------------Categories Routes ------------------------ */
adminRoutes.get('/categories', adminController.categoryList);
adminRoutes.post('/categories', adminController.addCategory);
adminRoutes.patch('/categories/:id', adminController.updateCategory);

/**----------- Product Routes -------------------- */
adminRoutes.get('/products', adminController.listProduct);
adminRoutes.post(
    '/products',
    validateRequestSchema(validationSchema.productSchema),
    adminController.addProduct,
);
/** Product Details API */
adminRoutes.get('/products/:id', adminController.productDetails);
/** update product details  */
adminRoutes.patch(
    '/products/:id',
    validateRequestSchema(validationSchema.productSchema),
    adminController.updateProductDetail,
);
/** Update status of product */
adminRoutes.patch(
    '/products/updateStatus/:id',
    adminController.updateProductStatus,
);
module.exports = adminRoutes;
