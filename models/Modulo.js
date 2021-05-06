module.exports = (sequelize, DataTypes) => {
    const Modulo = sequelize.define(
        'Modulo', {
        nome: DataTypes.STRING
    }, {
        tableName: 'modulos',
        timestamps: false
    }
    )

     // To create a One - To - One relationship, the hasOne and belongsTo associations are used together;
    // To create a One - To - Many relationship, the hasMany and belongsTo associations are used together;
    // To create a Many - To - Many relationship, two belongsToMany calls are used together

    Modulo.associate = (models) => {
        //varias disciplinas para um modulo
        Modulo.hasMany(models.Disciplina, {as: "disciplinas", foreignKey: 'modulo_id'});
        //um professor para um modulo
        Modulo.hasOne(models.Professor, {as: 'professor', foreignKey:'modulo_id'});

        Modulo.hasOne(models.Aluno, {as:"aluno", foreignKey: "modulo_id"});
    }

    return Modulo;
}
