module.exports = (sequelize, DataTypes) => {
    const AlunoDisciplina = sequelize.define(
        'AlunoDisciplina', {
        aluno_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            primaryKey: true
        },
        disciplina_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            primaryKey: true
        },
        nota: DataTypes.DOUBLE,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
        {
            tableName: 'alunos_disciplina',
            timestamps: true
        }
    )

    // To create a One - To - One relationship, the hasOne and belongsTo associations are used together;
    // To create a One - To - Many relationship, the hasMany and belongsTo associations are used together;
    // To create a Many - To - Many relationship, two belongsToMany calls are used together

    AlunoDisciplina.associate = (models) => {
        // relação N:1
        AlunoDisciplina.belongsTo(models.Aluno, { as: "notas", foreignKey: "aluno_id" })
        // relação N:1
        AlunoDisciplina.belongsTo(models.Disciplina, { as: "aluno", foreignKey: "disciplina_id" })
    }
    return AlunoDisciplina;
}