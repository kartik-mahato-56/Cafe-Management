const userService = require('../services/userService');
const categoryService = require('../services/categoryService');
const catchAsync = require('../utils/errorHandle');
const { sendApiSuccess } = require('../utils/sendApiResponse');

exports.categoryList = catchAsync(async (req, res) => {
    let categoryList = await categoryService.getList({ status: 'active' });
    sendApiSuccess(res, categoryList, 'Category list retrived');
});
