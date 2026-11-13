import express from "express";
import { getJogo, getJogos, createJogo, deleteJogo, attJogo } from "../controller/jogos.js";
import { autenticarToken } from '../middleware/auth.js';
export const routerJogos = express.Router()

routerJogos.get('/', getJogos);

routerJogos.get('/:id', getJogo);

routerJogos.post('/', autenticarToken, createJogo);



routerJogos.delete('/:id', autenticarToken, deleteJogo)


routerJogos.put('/:id',autenticarToken, attJogo);
