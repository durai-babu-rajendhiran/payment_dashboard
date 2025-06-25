module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Account', {
        name: { type: DataTypes.STRING, allowNull: false },
        balance: { type: DataTypes.FLOAT, defaultValue: 0 }
    }, { timestamps: true });
};
