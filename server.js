
import express from 'express';
import { routerJogos } from './routers/jogos';

const app = express();
app.use(express.json());

app.use("/Jogos", routerJogos)
            


app.listen(3000, async () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});

