module.exports = (sequelize, DataTypes) => {
    const Adm = sequelize.define(
        'Adm', {
        // id: DataTypes.STRING,
        senha: DataTypes.STRING
      
    }, {
        tableName: "adm",
        timestamps: false
    }
    )
    return Adm;
}