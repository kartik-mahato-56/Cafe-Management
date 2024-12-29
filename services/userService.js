const db = require('../db/models')
const User = db.User;

exports.findOneByField = async (query) => {
    return await User.findOne({ where: query });
};
exports.createUser = async (data) => {
    const result = await User.create({ ...data });
    return result;
};

exports.findById = async (id) => {
    return await User.findByPk(id);
};
exports.getUserList = async (query) => {
    return await User.findAll({ where: { role: 'user' } });
};
