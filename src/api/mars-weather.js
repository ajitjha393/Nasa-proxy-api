const express = require('express');
const axios = require('axios');

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 30 * 1000, // 30s
	max: 2, // limit each IP to 2 requests per 30s
});

const router = express.Router();

const BASE_URL = 'https://api.nasa.gov/insight_weather/?';

let cachedData;
let cacheTime;

// Will be our proxy api to Nasa
router.get('/', limiter, async (req, res, next) => {
	// In memory cache
	if (cacheTime && cacheTime > Date.now() - 30 * 1000) {
		return res.json(cachedData);
	}

	try {
		const params = new URLSearchParams({
			api_key: process.env.NASA_API_KEY,
			feedtype: 'json',
			ver: '1.0',
		});

		//1. Make a req to Nasa Endpt from here

		const { data } = await axios.get(`${BASE_URL}${params}`);
		cachedData = data;
		cacheTime = Date.now(); // Added Cached Timestamp
		data.cacheTime = cacheTime;
		//2. Then Respond to this req by Data received from Nasa

		return res.json(data);
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
