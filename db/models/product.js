'use strict';
const { Model, DataTypes } = require('sequelize');
const Category = require('./category'); // Import Category

module.exports = (sequelize) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.Category, {
                foreignKey: 'categoryId',
                as: 'category',
            });
        }
    }

    Product.init(
        {
            name: DataTypes.STRING,
            categoryId: DataTypes.INTEGER,
            description: DataTypes.TEXT,
            price: DataTypes.DOUBLE,
            status: DataTypes.ENUM('active', 'inactive'),
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'Product',
            tableName: 'products',
            timestamps: true,
        },
    );

    return Product;
};
