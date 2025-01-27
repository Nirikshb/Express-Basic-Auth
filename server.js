const express = require('express');

const app = express();
const bcrypt = require('bcrypt');

const users = [];

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
// takes info from forms and access.

app.get('/', (req, res) => {
	res.render('index.ejs', { name: 'NIRIKSH' });
});

app.get('/login', (req, res) => {
	res.render('login.ejs');
});

app.get('/register', (req, res) => {
	res.render('register.ejs');
});

app.post('/register', async (req, res) => {
    console.log(req.body, 'Request Body');
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		users.push({
			id: Date.now().toString(),
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword
		});
		res.redirect('/login');
	} catch (error) {
		console.log('====================================');
		console.log(error, 'error');
		console.log('====================================');
		res.redirect('/register');
	}
	console.log('====================================');
	console.log(users, '==');
	console.log('====================================');
	// req.body.email
});


app.post('/login', async (req, res) => {
	const user = users.find((u) => u.email === req.body.email);
	if (!user) {
		return res.status(400).send('Cannot find user'); // Handle invalid user
	}

	try {
		if (await bcrypt.compare(req.body.password, user.password)) {
			res.send('Login Successful!');
		} else {
			res.send('Not Allowed');
		}
	} catch (error) {
		console.log(error, 'Error during login');
		res.status(500).send('An error occurred');
	}
});



app.listen(3001);
