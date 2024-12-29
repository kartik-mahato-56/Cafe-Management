const catchAsync = require('../utils/errorHandle');
const userService = require('../services/userService');
const ApiError = require('../errors/ApiError');
const { sendApiSuccess } = require('../utils/sendApiResponse');
const categoryService = require('../services/categoryService');
const { Op } = require('sequelize');
const {
    getProductList,
    addProduct,
    getProductDetails,
    updateProduct,
} = require('../services/productService');

exports.userLists = catchAsync(async (req, res) => {
    let userList = await userService.getUserList({});
    sendApiSuccess(res, userList, 'User list retrieved successfully.', 200);
});

exports.categoryList = catchAsync(async (req, res) => {
    let categoryList = await categoryService.getList();
    sendApiSuccess(
        res,
        categoryList,
        'Category list retrieved successfully.',
        200,
    );
});

exports.addCategory = catchAsync(async (req, res) => {
    let { name } = req.body;
    if (!name) {
        throw new ApiError('Please provide category name', 422);
    }
    let category = await categoryService.createCategory({ name: name });
    sendApiSuccess(res, category, 'Category successfully added,', 201);
});

exports.updateCategory = catchAsync(async (req, res) => {
    let id = req.params?.id;
    console.log(id);
    let { name, status } = req.body;
    if (!name || !status) {
        throw new ApiError(
            'Missing required information to update category',
            422,
        );
    }
    let category = await categoryService.findById(id);
    if (!category) {
        throw new ApiError('Category not found.', 404);
    }
    const data = {
        name: name,
        status: status,
    };
    console.log(data);
    let result = await categoryService.updateData(id, data);
    if (result) {
        category = await categoryService.findById(id);
        category = category.toJSON();
        sendApiSuccess(res, category, 'Category data updated successfully.');
    } else {
        throw new Error(result);
    }
});

exports.listProduct = catchAsync(async (req, res) => {
    let searchKey = req.query?.searchKey;
    let query = {};
    if (searchKey) {
        query = {
            ...query,
            [Op.or]: [
                {
                    name: {
                        [Op.like]: `%${searchKey} %`,
                    },
                },
                {
                    price: {
                        [Op.eq]: searchKey,
                    },
                },
                {
                    satus: { [Op.eq]: searchKey },
                },
            ],
        };
    }
    let productList = await getProductList(query);
    sendApiSuccess(res, productList, 'Product list retrived successfully.');
});
exports.addProduct = catchAsync(async (req, res) => {
    let body = req.body;
    let productData = await addProduct(body);
    sendApiSuccess(res, productData, 'Product added successfully.', 201);
});

exports.productDetails = catchAsync(async (req, res) => {
    let productId = req.params?.id;
    let productDetails = await getProductDetails({ id: productId });
    if (!productDetails) {
        throw new ApiError('Product not found.', 404);
    }
    sendApiSuccess(res, productDetails, 'Product details found');
});

exports.updateProductDetail = catchAsync(async (req, res) => {
    let productId = req.params?.id;
    let body = req.body;
    let product = await getProductDetails({ id: productId });
    if (!product)
        throw new ApiError('Product details not found to update', 404);
    product = await updateProduct(body, { id: product?.id });
    if (product) {
        sendApiSuccess(res, product, 'Product updated successfully.');
    } else {
        throw new ApiError('Failed to update product details.');
    }
});

exports.updateProductStatus = catchAsync(async (req, res) => {
    let productId = req.params?.id;

    return res.json({ id: productId });
});
