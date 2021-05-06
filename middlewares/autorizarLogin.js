const { Professor } = require('../models');
module.exports = (req, res, next) => {
    console.log('entrei');
    let { cpf, senha_professor } = req.body;
    let UserProfessor = Professor.findOne({ where: { cpf } })
    
    if (!cpf || !senha_professor) {
        res.render('error', { error: `Preencha todos os campos!` })
        // res.status(400).json({ erro: "campo em branco" });
    }
        if (!UserProfessor) {
            console.log('aq o');
            console.log('if 2');
            res.render('error', { error: `Usuario não encontrado!` })
        } else {
            next();
        }
    }
