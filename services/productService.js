const db = require('../db/models');
const Product = db.Product;
const Category = db.Category;
exports.getProductList = async (query = {}) => {
    const result = await Product.findAll({
        where: { ...query },
        include: [
            {
                model: Category,
                as: 'category',
            },
        ],
        order: [['name', 'ASC']],
    });
    return result;
};

exports.addProduct = async (data) => {
    let productData = await Product.create(data);
    return productData;
};

exports.getProductDetails = async (query) => {
    let product = await Product.findOne({
        where: query,
        include: [
            {
                model: Category,
                as: 'category',
            },
        ],
    });
    return product;
};

exports.updateProduct = async (data, query) => {
    console.log(query)
    let product = await Product.update(data, { where: {...query} });
    return product;
};
