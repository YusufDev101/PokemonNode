// Require third-party packages.
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const PokemonRoutes = require('./routes');

// Set the default port.
const httpPort = process.env.HTTP_PORT || 4080;

// Create a new Express application.
const app = express();

/*******************************************************************************
 *  Setup Middleware
 *******************************************************************************/

var corsOptions = {
	origin: ['http://localhost:1962', '192.168.25.222:1962', 'http://localhost:1963'],
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true
};

// Enable the CORS middleware.
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.enable('trust proxy');

// A generic logging middleware - all requests.
app.use(function (req, res, next) {
	console.log(`-> Route: ${req.method} - ${req.protocol}://${req.get('host')}${req.originalUrl}`);
	next();
});

/*******************************************************************************
 *  Setup API and Authentication Routes
 *******************************************************************************/

app.get('/', function (req, res) {
	res.json({ message: 'Welcome to the API', pong: Date.now() });
});

app.use('/api/v1/', PokemonRoutes);

// Handle 404 error. 
// The last middleware.
app.use("*", function (req, res) {
	console.log(`404: ${req.method} - ${req.protocol}://${req.get('host')}${req.originalUrl}`);
	res.status(404).send('404');
});

// Http port listening.	
app.listen(httpPort, () => {
	console.log(`HTTP listening on http://localhost:${httpPort}`);
});