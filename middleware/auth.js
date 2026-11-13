import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { manipularDB } from '../db/db.js';
import { getUsuarioEmail } from '../db/usuarios.js';

const SECRET = process.env.JWT_SECRET;

export const autenticarToken = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ 
            erro: "Acesso negado! O token não foi fornecido!"
        });
    }

    try {
        const userEmail = jwt.verify(token, SECRET);
        const usuario = await manipularDB({ email: userEmail.email }, getUsuarioEmail);
        const { email } = usuario;
        req.usuario = { id: String(usuario._id), email };
        next();
    } catch (e) {
        console.error(e)
        return res.status(403).json({
            erro: "Acesso negado! Token inválido ou expirado!"
        })
    }
}


export const verificarId = (req, res, next) => {
    const id = req.usuario.id;
    if (!req.usuario || id !== req.params.id) {
        return res.status(403).json("Usuário não autorizado para realizar esta operação!");
    }
    next();
}