var express = require('express');
var router = express.Router();
const sessionMiddleware = require('../middlewares/session');
const alunosController = require('../controllers/alunosController')
const autorizarLogin = require('../middlewares/autorizarLogin')


//aluno
router.get('/entrar', alunosController.login)
// http://localhost:3000/aluno/entrar

router.post('/entrar',autorizarLogin, alunosController.auth)
// http://localhost:3000/aluno/entrar

router.get('/:id', sessionMiddleware, alunosController.show)
// http://localhost:3000/aluno/:id

router.get('/:id/boletim', sessionMiddleware, alunosController.boletim)
// http://localhost:3000/aluno/:id/boletim

module.exports = router; 
