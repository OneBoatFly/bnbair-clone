const router = require('express').Router();
const { googleMapsAPIKey } = require('../../config');
const { geoAPIKey } = require('../../config')

router.post('/key', (req, res) => {
    res.json({ googleMapsAPIKey });
});


router.post('/geokey', (req, res) => {
    res.json({ geoAPIKey });
});


module.exports = router;