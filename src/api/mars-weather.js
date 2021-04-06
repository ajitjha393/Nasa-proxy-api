const express = require('express');
const axios = require('axios');

const router = express.Router();

const BASE_URL = 'https://api.nasa.gov/insight_weather/?';

// Will be our proxy api to Nasa
router.get('/', async (req, res, next) => {
	try {
		const params = new URLSearchParams({
			api_key: process.env.NASA_API_KEY,
			feedtype: 'json',
			ver: '1.0',
		});

		//1. Make a req to Nasa Endpt from here

		const { data } = await axios.get(`${BASE_URL}${params}`);
		//2. Then Respond to this req by Data received from Nasa

		res.json(data);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
