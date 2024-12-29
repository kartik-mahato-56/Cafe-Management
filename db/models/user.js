'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    class User extends Model {
        // Compare plain text password with the hashed password
        async comparePassword(plainPassword) {
            return await bcrypt.compare(plainPassword, this.password);
        }
        // Customize JSON response to omit sensitive data
        toJSON() {
            const values = { ...this.get() };
            delete values.password; // Remove password from the output
            return values;
        }
    }

    User.init(
        {
            name: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true, // Ensure email is valid
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                set(value) {
                    const hashedPassword = bcrypt.hashSync(value, 10);
                    this.setDataValue('password', hashedPassword);
                },
            },
            phoneNumber: DataTypes.STRING,
            status: {
                type: DataTypes.ENUM('active', 'inactive'),
                defaultValue: 'active',
            },
            role: {
                type: DataTypes.ENUM('admin', 'user'),
                defaultValue: 'user',
            },
            resetPasswordToken: DataTypes.STRING,
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
            sequelize, // Pass the Sequelize instance
            modelName: 'User', // Define the model name
            tableName: 'users', // Specify the table name
            timestamps: true, // Enable timestamps (createdAt, updatedAt)
        },
    );

    return User;
};
