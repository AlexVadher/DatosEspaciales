import express from 'express';
import morgan from 'morgan';
import {engine} from 'express-handlebars';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';
import personasRoutes from './routes/personas.routes.js';
import dotenv from 'dotenv';

dotenv.config(); // cargar variables de entorno
// Initialize express
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// setting up the port
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));
app.engine(
    'hbs',
    engine({
        defaultLayout: 'main',
        layoutsDir: join(app.get('views'), 'layouts'),
        partialsDir: join(app.get('views'), 'partials'),
        extname: '.hbs',
    }),
);

// configurar el motor de plantillas handlebars para la aplicación
app.set('view engine', '.hbs');

//Middlewares (funciones que se ejecutan antes de llegar a las rutas)
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Middleware para pasar la clave de API a todas las vistas
app.use((req, res, next) => {
    res.locals.API_KEY = process.env.API_KEY_GOOGLE_MAPS; // clave de API de Google Maps para la aplicación
    next();
});

// Routes (rutas de la aplicación)
app.get('/', (req, res) => {
    res.render('index');
});

// Rutas de personas (clientes) de la aplicación CRUD de Node.js
app.use(personasRoutes);

// public files (static files)
app.use(express.static(join(__dirname, 'public')));

// Starting the server on port 3000
app.listen(app.get('port'), () =>
    console.log('Server on port', app.get('port')),
);
