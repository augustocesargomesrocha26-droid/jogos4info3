import express from "express";
import { getJogo, getJogos, createJogo, deleteJogo, attJogo } from "../controller/jogos.js";

export const routerJogos = express.Router()

routerJogos.get('/jogos', getJogos);

routerJogos.get('/jogos/:id', getJogo);

routerJogos.post('/jogos', createJogo);



routerJogos.delete('/jogos/:id', deleteJogo)


routerJogos.put('/jogos/:id', attJogo);
