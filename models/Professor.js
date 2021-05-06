module.exports = (sequelize, DataTypes) => {

    const Professor = sequelize.define(
        'Professor',{
            nome: DataTypes.STRING,
            senha_professor: DataTypes.STRING,
            cpf: DataTypes.STRING,
            img_perfil: DataTypes.STRING,
            modulo_id: DataTypes.INTEGER
        },
        {
            tableName: 'professores',
            timestamps: false
        }
    )

     // To create a One - To - One relationship, the hasOne and belongsTo associations are used together;
    // To create a One - To - Many relationship, the hasMany and belongsTo associations are used together;
    // To create a Many - To - Many relationship, two belongsToMany calls are used together
    
    Professor.associate = (models) => {
        // relação N:1 (vários posts de 1 usuario)
       Professor.belongsTo(models.Modulo, { as: "modulo", foreignKey: "modulo_id" });
    }
    return Professor;

}