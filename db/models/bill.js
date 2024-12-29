'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class bill extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    bill.init(
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            createdBy: DataTypes.STRING,
            paymentMethod: DataTypes.STRING,
            productDetails: DataTypes.TEXT,
            total: DataTypes.NUMBER,
            uuid: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Bill',
            tableName: 'bills',
        },
    );
    return bill;
};
