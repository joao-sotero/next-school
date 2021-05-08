const { Professor, Aluno } = require('../models');
module.exports = async (req, res, next) => {
    console.log('entrei');
    let { cpf } = req.body;
    let UserProfessor = await Professor.findOne({ where: { cpf } })
   
    let UserAluno = await Aluno.findOne({ where: { cpf } })
  
    if (!cpf ) {
        res.render('error', { error: `Preencha todos os campos!` })
        // res.status(400).json({ erro: "campo em branco" });
    }
        
        if (UserAluno == null) {
            console.log(UserAluno);
            console.log('aq o');
            console.log('if 2');
            res.render('error', { error: `Usuario não encontrado!` })
        } else {
            next();
        }
    
    }