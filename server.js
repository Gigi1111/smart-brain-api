const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'postgresql',
		database: 'smart_brain'
	}
});
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
//db.select('*').from('users').then((data) => console.log(data));

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.json('it is working'));

app.post('/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt));
//app.post('/signin', (req, res) => signin.handleSignIn(db, bcrypt)(req, res));
app.post('/register', (req, res) => {
	register.handleRegister(req, res, bcrypt, db);
});

app.get('/profiles/:id', (req, res) => {
	profile.handleProfileGet(req, res, db);
});

app.put('/image', (req, res) => {
	image.handleImage(req, res, db);
});
app.post('/imageurl', (req, res) => {
	image.handleApiCall(req, res);
});

app.listen(3001, () => {
	console.log('app is running on port 3001');
});
