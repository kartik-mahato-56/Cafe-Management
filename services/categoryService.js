const db = require('../db/models')
const Category = db.Category;

exports.getList = async (query = {}) => {
    let result = await Category.findAll({
        where: query, // Apply query conditions if provided
        order: [['name', 'ASC']],
    });
    return result;
};
exports.createCategory = async (data) => {
    const result = await Category.create({ ...data });
    return result;
};

exports.findById = async (id) => {
    return await Category.findByPk(id);
};

exports.updateData = async (id, data) => {
    const result = await Category.update(data, { where: { id } });
    return result;
};
