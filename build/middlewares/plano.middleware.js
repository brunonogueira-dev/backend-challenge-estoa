"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typesMiddleware = exports.positiveMiddleware = exports.existeMiddleware = void 0;
function existeMiddleware(req, res, next) {
    const { nome, periodo, preco } = req.body;
    if (!nome || !periodo || !preco) {
        return res.status(404).json({ message: 'Informe todas as propriedades' });
    }
    return next();
}
exports.existeMiddleware = existeMiddleware;
function positiveMiddleware(req, res, next) {
    const { periodo, preco } = req.body;
    if (periodo < 0 || preco < 0) {
        return res.status(404)
            .json({ message: 'As propiedades "periodo" e "preco" não devem ser negativos' });
    }
    next();
}
exports.positiveMiddleware = positiveMiddleware;
function typesMiddleware(req, res, next) {
    const { nome, periodo, preco } = req.body;
    if (typeof (periodo) !== 'number' || typeof (preco) !== 'number') {
        return res.status(404)
            .json({ message: 'As propiedades "periodo" e "preco" devem conter números' });
    }
    if (typeof (nome) !== 'string') {
        return res.status(404)
            .json({ message: 'As propiedade "nome" deve conter uma string' });
    }
    return next();
}
exports.typesMiddleware = typesMiddleware;
