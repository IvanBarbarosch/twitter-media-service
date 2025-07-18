console.log("ENV:");
console.log("TWITTER_CONSUMER_KEY:", process.env.TWITTER_CONSUMER_KEY);
console.log("TWITTER_CONSUMER_SECRET:", process.env.TWITTER_CONSUMER_SECRET);
console.log("TWITTER_ACCESS_TOKEN:", process.env.TWITTER_ACCESS_TOKEN);
console.log("TWITTER_ACCESS_SECRET:", process.env.TWITTER_ACCESS_SECRET);


const express = require('express');
const axios = require('axios');
const { TwitterApi } = require('twitter-api-v2');

const app = express();
app.use(express.json());

const client = new TwitterApi({
  appKey: "4uJBigRKNwUymIYh292qo0pO3",
  appSecret: "ricquzkGqUwlJnaehXRuREKkbSORwDwOLL8IKLu5B1FEYm1EkU",
  accessToken: "1408823667706957825-yMSEqPg9B3gZTRRAoAyR63fYvrZ7Hv",
  accessSecret: "9JyKCf8tzeMsi1V55kpWoQmIDfzfmaT5NciqW",
});


app.post('/tweet', async (req, res) => {
  const { text, imageUrl } = req.body;

  if (!text || !imageUrl) {
    return res.status(400).json({ error: 'Missing text or imageUrl' });
  }

  try {
    const imageResponse = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
    });

    const mediaId = await twitterClient.v1.uploadMedia(Buffer.from(imageResponse.data), {
      mimeType: 'image/png',
    });

    const tweet = await twitterClient.v2.tweet({
      text,
      media: { media_ids: [mediaId] },
    });

    res.json({ success: true, tweet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Twitter microservice running on port ${PORT}`);
});
