const express = require('express');

const router = express.Router();

const BASE_URL = 'https://api.nasa.gov/insight_weather/?';

// Will be our proxy api to Nasa
router.get('/', (req, res) => {
	const params = new URLSearchParams({
		api_key: 'DEMO_KEY',
		feedtype: 'json',
		ver: '1.0',
	});

	//1. Make a req to Nasa Endpt from here
	//2. Then Respond to this req by Data received from Nasa

	res.json({
		message: 'Hello Mars weather!',
	});
});

module.exports = router;
