module.exports = (req, res, next) => {
    let notas = req.body;
        for (let [key, values] of Object.entries(notas)) {
            if (values < 0 || values > 10) {
                res.render('error', { error: `Nota inválida!` })
                // res.status(400).json({ erro: "Nota invalida" });
            } 
        }
        next();
}
