const { Professor, Aluno } = require('../models')

module.exports = async (req, res, next) => {
    let { cpf, nome, modulo_id, senha_professor } = req.body;
    let UserProfessor = await Professor.findOne({ where: { cpf } });
    if (UserProfessor) {
        res.render('error', { error: `CPF já cadastrado!` })
        // res.status(400).json({ erro:  `CPF ja cadastrado no professor: ${ UserProfessor.nome}`});
    }else{
        let UserAluno = await Aluno.findOne({ where: { cpf } });
        if (UserAluno) {
            res.render('error', { error: `CPF já cadastrado!.` })
            // res.status(400).json({ erro:  `CPF ja cadastrado no aluno: ${ UserAluno.nome_aluno}`});
    } 
        if ( !nome || !cpf || !modulo_id || !senha_professor) {
            res.render('error', { error: `Preencha todos os campos!.` })
            // res.status(400).json({ erro: "campo em branco" });
        } else {
            if (senha_professor.length < 8 ) {
                res.render('error', { error: `A senha precisa ter no minimo 8 caracteres.` })
                // res.status(400).json({ erro: "A senha precisa ter no minimo 8 caracteres." });
            } else {
                next();
            }
        }
    }
}
