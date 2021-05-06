// const { Aluno, Disciplina } = require('./models');


// async function teste (){
//     const Notas = await Aluno.findOne({
//         where: { id:19 },
//         include: "boletim"
//     })
//    const notas2  =Notas.toJSON()

//     for (let resultado of notas2.boletim) {
//         const disciplinas = await Disciplina.findOne({
//             where: { id: resultado.disciplina_id }
//         })
//         Object.assign(resultado, disciplinas.toJSON() );

//     }

//     console.log(notas2)
// };
// teste()
// Aluno.findAll({where: include:['boletim']}).then(
//     data => {
//         console.log(data.map( u => u.toJSON()));
//         sequelize.close();
//     }
// )



//o primeiro que iago fez

// const { sequelize, Aluno, Disciplina, Modulo } = require('./models');

// async function teste (){
//    const nomeDisciplina = []
//     const Notas = await Aluno.findOne({
//         where: { id:1 },
//         include: "boletim"
//     })
//    const notas2  =Notas.toJSON();
// //    

//     for (let resultado of notas2.boletim) {
//         const disciplinas = await Disciplina.findOne({
//             where: { id: resultado.disciplina_id }
//         })
//         const alunos = await Aluno.findOne({
//             where:{id: resultado.aluno_id}
//         })

//         const obj = Object.assign({}, alunos.toJSON(), disciplinas.toJSON(), resultado);
//         nomeDisciplina.push(obj)
//     }



//     console.log(nomeDisciplina)
// };
// teste()
// Aluno.findAll({where: include:['boletim']}).then(
//     data => {
//         console.log(data.map( u => u.toJSON()));
//         sequelize.close();
//     }
// )

//pedaço do profcontroller

//     const { id } = req.params;
//     const Notas = await Aluno.findOne({
//         where: { id },
//         include: "boletim"
//     })
//     const notas2 = Notas.toJSON()

//     for (let resultado of notas2.boletim) {
//         const disciplinas = await Disciplina.findOne({
//             where: { id: resultado.disciplina_id }
//         })
//         Object.assign(resultado, disciplinas.toJSON() );

//     }
//     // return res.render('professor/grades', { aluno: result })
//     return res.json(notas2)


// <%= nota.disciplina_id == 1 ? "HTML" : "" %> 
// <%= nota.disciplina_id == 2 ? "CSS" : "" %> 
// <%= nota.disciplina_id == 3 ? "JAVASCRIPT" : "" %> 
// <%= nota.disciplina_id == 4 ? "REACT" : "" %> 
// <%= nota.disciplina_id == 12 ? "POSTGRESQL" : "" %> 
// <%= nota.disciplina_id == 13 ? "ORACLE" : "" %> 
// <%= nota.disciplina_id == 14 ? "MARIADB" : "" %> 
// <%= nota.disciplina_id == 15 ? "MYSQL" : "" %>

// let id = '264bb47d-df00-46ed-ad97-9474c20c3eba'

// show: async
// Aluno.findOne({
//     where: { id }
// }).then(aluno => {
//     console.log(aluno)
// }).catch(erro => {
//     console.log(erro)
// })



// notas: async (req, res) => {
//     const notasAluno = []
//     const { id } = req.params;
//     const Notas = await Aluno.findOne({
//         where: { id :1 },
//         include: "boletim"
//     })
//    const notasJson = Notas.toJSON()        

//     for (let resultado of notasJson.boletim) {
//         const disciplinas = await Disciplina.findOne({
//             where: { id: resultado.disciplina_id }
//         })
//         const alunos = await Aluno.findOne({
//             where:{id: resultado.aluno_id}
//         })
//         const obj = Object.assign({},alunos.toJSON(), disciplinas.toJSON(), resultado);
//         notasAluno.push(obj)
//    }
//      return res.render('professor/grades', { notasAluno})
// }


// const { Aluno, AlunoDisciplina, Disciplina, Professor, Modulo } = require('./models')

//    const nota = async (req, res) => {
//     const { id } = req.params;
//     const result = await Aluno.findOne({
//         where: { id: 1 },
//         include: "boletim"
//     })
//     console.log(result);
//     return result;
// } 

// console.log(nota);


// ${Data.now().toString()}-

// <option value="" <% professor.modulo_id == 1 ? 'selected' : ''%> >FRONT-END</option>
// <option value="" <% professor.modulo_id == 2 ? 'selected' : ''%> >BACK-END</option>
// <option value="" <% professor.modulo_id == 3 ? 'selected' : ''%> >BANCO DE DADOS</option>

function TestaCPF(strCPF) {
       var Soma;
       var Resto;
       Soma = 0;
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
var strCPF = "12345678925";
TestaCPF(strCPF)

<h1><%= message %></h1>
<h2><%= error.status %></h2>
<pre><%= error.stack %></pre>