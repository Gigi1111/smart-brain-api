const handleSignIn = (req, res, db, bcrypt) => {
	//const handleSignIn =( db, bcrypt) => (req, res,)=> {
	const { email, password } = req.body;

	db('login')
		.where({ email })
		.then((data) => {
			if (bcrypt.compareSync(password, data[0].hash)) {
				db('users')
					.where({ email: data[0].email })
					.then((data) => res.json(data[0]))
					.catch((err) => res.status(400).json('unable to sign in'));
			} else res.status(400).json('wrong credentials');
		})
		.catch((err) => res.status(400).json('unable to sign in'));
};
module.exports = {
	handleSignIn: handleSignIn
};
