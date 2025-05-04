import express from 'express';
import { mainRouter } from './routes/mainRouter.js';
import { __dirname } from './utils.js';
import { engine } from 'express-handlebars';

console.clear();
console.log('⌛ Inicializando servidor...');


const app = express();

const PORT = process.env.PORT || 3000;

// Cofiguracion de Handlebars
app.engine('handlebars', engine());
app.set('views',`${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(express.static(`${__dirname}/public`))

app.use(express.json());

app.use('/api/v1', mainRouter)


app.listen(PORT, () => {
    console.log(`🥟 El servidor está arriba y en el puerto ${PORT}`);
  });