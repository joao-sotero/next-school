module.exports = (req, res, next) => {
    let { cpf } = req.body;

function TestaCPF(strCPF) {
    var Soma = 0;
    var Resto;
    
    if (strCPF == "00000000000") {
           return false ;
    }

    for (i = 1; i <= 9; i++) {
           Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
           Resto = (Soma * 10) % 11;
    }
    if ((Resto == 10) || (Resto == 11)) {
           Resto = 0;
    }
    if (Resto != parseInt(strCPF.substring(9, 10))) {
           return false ;
    }
    Soma = 0;
    for (i = 1; i <= 10; i++) {
           Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
           Resto = (Soma * 10) % 11;
    }
    if ((Resto == 10) || (Resto == 11)) { 
           Resto = 0;
     }
    if (Resto != parseInt(strCPF.substring(10, 11))) {
           return false;
    } else {
           return true ;
    }
}

if(!TestaCPF(cpf)){
       res.render('error', { error: `CPF invalido, verifique e tente novamente!` })
       // res.status(400).json({ erro:  `CPF invalido, verifique e tente novamente`});
}else{
  
    next();
}

}