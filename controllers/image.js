const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
	apiKey: '7ca141084cfc46eeb50bba7a00ec4e02'
});
const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => res.status(400).json('unable to work with api'));
};
const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users')
		.where({ id })
		.increment('entries', 1)
		.returning('entries')
		.then((entries) => {
			if (entries.length) res.json(entries[0]);
			else res.status(400).json('Not found');
		})
		.catch((err) => res.status(400).json('error getting entries'));
};
module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};
