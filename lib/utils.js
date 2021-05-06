module.exports = {
    modulo: function(modulo_id) {
        switch (modulo_id) {
            case 1:
                return "FRONT-END"
            case 2:
                return "BACK-END"
            case 3:
                return "BANCO DE DADOS"
            default:
                return "Módulo não especificado."
        }
    }
    // ,
    // disciplina: function(disciplina_id) {
    //     switch (disciplina_id) {
    //         case 1:
    //             return "FRONT-END"
    //         case 2:
    //             return "BACK-END"
    //         case 3:
    //             return "BANCO DE DADOS"
    //         default:
    //             return "Módulo não especificado."
    // }
}