'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Product, {
                foreignKey: 'categoryId',
                as: 'products',
            });
        }
    }

    Category.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING,
            },
            status: {
                type: DataTypes.ENUM('active', 'inactive'),
                defaultValue: 'active',
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: 'Category',
            tableName: 'categories',
            timestamps: true,
        },
    );

    return Category;
};
