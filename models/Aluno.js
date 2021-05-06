module.exports = (sequelize, DataTypes) => {
    const Aluno = sequelize.define(
        'Aluno', {
        nome_aluno: DataTypes.STRING,
        cpf: DataTypes.STRING,
        img_perfil: DataTypes.STRING,
        modulo_id: DataTypes.INTEGER
    }, {
        tableName: "alunos",
        timestamps: false
    }
    )

     // To create a One - To - One relationship, the hasOne and belongsTo associations are used together;
    // To create a One - To - Many relationship, the hasMany and belongsTo associations are used together;
    // To create a Many - To - Many relationship, two belongsToMany calls are used together

    Aluno.associate = (models) => {
        Aluno.hasMany(models.AlunoDisciplina,{ as: "boletim", foreignKey: "aluno_id" })
        
        Aluno.belongsTo(models.Modulo, { as: "modulo", foreignKey: "modulo_id"})
    }
    return Aluno;
}