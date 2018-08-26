const express = require('express');
const app = express();
const request = require('request');

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/twitter', (req, res) => {
  request(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=2`, function (error, response, body) {
    console.log(JSON.parse(body));
    res.send(JSON.parse(body));
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))