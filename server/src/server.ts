
import express from 'express';
import cors from 'cors';
import { routes } from './routes';


const app = express();

app.use(cors({
     // origin: 'http:'
}));
app.use(express.json());
app.use(routes);



//GET, POST, PUT, DELETE, PATCH

//GET = Buscar informação
//POST = Cadastrar informações
//PUT = Atualizar informações de uma entidade
//PATCH = Atualizar uma informação única de uma entidade
//DELETE = Deletar uma informação


app.listen(process.env.PORT || 3333, () => {
     console.log('HTTP server running!')
})



//SQLite
//Prisma