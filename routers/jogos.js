import express from "express";
import { getJogo, getJogos, createJogo, deleteJogo, attJogo } from "../controller/jogos.js";

export const routerJogos = express.Router()

routerJogos.get('/', getJogos);

routerJogos.get('/:id', getJogo);

routerJogos.post('/', createJogo);



routerJogos.delete('/:id', deleteJogo)


routerJogos.put('/:id', attJogo);
