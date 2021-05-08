var express = require('express');
var router = express.Router();
const sessionMiddleware = require('../middlewares/session')
const professoresController = require('../controllers/professoresController')
const validarNota = require('../middlewares/validarNota')
const autorizarLogin = require('../middlewares/autorizarLogin')


//aluno
router.get('/entrar', professoresController.login)
// http://localhost:3000/professor/entrar

router.post('/entrar', autorizarLogin, professoresController.auth)
// http://localhost:3000/professor/entrar

router.get('/show/:id', sessionMiddleware, professoresController.show)
// http://localhost:3000/professor/show/:id

router.get('/listagem', sessionMiddleware, professoresController.listagemAlunos)
// http://localhost:3000/professor/listagem

router.get('/notas/:id', sessionMiddleware, professoresController.notas)
router.put('/notas/:id', sessionMiddleware, validarNota, professoresController.putNotas)
// http://localhost:3000/professor/notas/:id

module.exports = router; 
