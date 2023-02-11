const router = require('express').Router();
const { Configuration, OpenAIApi } = require('openai');
const { requireAuth } = require('../../utils/auth');
const { AMENITY_TYPES } = require('../../utils/amenities');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// get openai generated title or descriptions
router.post('/', requireAuth, async (req, res) => {
  const {
    city,
    state,
    bedrooms,
    bathrooms,
    beds,
    amenityBasic,
    amenityStandout,
    amenitySafety,
    type,
  } = req.body;

  let requirement = '';
  if (type === 'title') {
    requirement = 'title with less than thirty two characters';
  } else {
    requirement = 'description with less than five hundreds characters';
  }

  let amenityStr = '';
  for (key in amenityBasic) {
    if (amenityBasic[key]) amenityStr += `, ${AMENITY_TYPES[key]}`;
  }

  for (key in amenityStandout) {
    if (amenityStandout[key]) amenityStr += `, ${AMENITY_TYPES[key]}`;
  }

  for (key in amenitySafety) {
    if (amenitySafety[key]) amenityStr += `, ${AMENITY_TYPES[key]}`;
  }

  const prompt = `Generate a ${requirement} for a house in ${city}, ${state} with ${bedrooms} bedrooms, ${bathrooms} bathrooms, ${beds} beds ${amenityStr}.`;

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: 'OpenAI API key not configured.',
      },
    });
    return;
  }

  if (!prompt.length) {
    res.status(400).json({
      error: {
        message: 'Not enough information to generate automated content',
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 1,
      max_tokens: 150,
    });

    const result = completion.data.choices[0].text.replace(/\n/g, '');
    res.status(200).json(result);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  }
});

module.exports = router;
