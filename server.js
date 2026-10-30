
import express from 'express';
import { routerJogos } from './routers/jogos.js';
import { routerUsuarios } from './routers/usuarios.js';

const app = express();
app.use(express.json());

app.use("/Jogos", routerJogos)
            
app.use("/Usuarios", routerUsuarios)

app.listen(3000, async () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});

