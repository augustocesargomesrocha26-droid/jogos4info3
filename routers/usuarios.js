import express from "express";
import { getUsuarios, getUsuario, createUsuario, deleteUsuario, attUsuario } from "../controller/usuarios.js";

export const routerUsuarios = express.Router()

routerUsuarios.get('/', getUsuarios);

routerUsuarios.get('/:id', getUsuario);

routerUsuarios.post('/', createUsuario);



routerUsuarios.delete('/:id', deleteUsuario)


routerUsuarios.put('/:id', attUsuario);
