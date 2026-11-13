import express from "express";
import { getUsuarios, getUsuario, createUsuario, deleteUsuario, attUsuario } from "../controller/usuarios.js";
import { autenticarToken, verificarId } from '../middleware/auth.js';

export const routerUsuarios = express.Router()

routerUsuarios.get('/', autenticarToken, verificarId, getUsuarios);

routerUsuarios.get('/:id', autenticarToken, verificarId, getUsuario);

routerUsuarios.post('/', createUsuario);



routerUsuarios.delete('/:id', autenticarToken, verificarId, deleteUsuario)


routerUsuarios.put('/:id', autenticarToken, verificarId, attUsuario);
