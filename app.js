const Twitter = require('twitter');
const config = require('./config.js');
const client = new Twitter(config);

let searchParams = {
  q: 'baby elephants',
  count: 3,
  lang: 'en',
};

client.get('search/tweets', searchParams, function(err, data, response) {
  if (!err) {
    (async function anon() {
      for (let i = 0; i < data.statuses.length; i++) {
        let retweetParams = {
          id: data.statuses[i].id_str,
        };
        await (function() {
          client.post('statuses/retweet', retweetParams, function(err, data, response) {
            if (!err) {
              console.log(`Retweeted https://api.twitter.com/1.1/statuses/retweet/${retweetParams.id}.json`)
            } else {
              console.log(err);
            }
          });
        })();
      }
    })();

    // data.statuses.forEach(element => {
    //   let id = {
    //     id: element.id_str,
    //   }
    //   client.post('statuses/retweet', id, function(err, data, response) {
    //     console.log(id.id)
    //     if (!err) {
    //       console.log(`Retweeted https://api.twitter.com/1.1/statuses/retweet/${id.id}.json`)
    //     } else {
    //       console.log(err);
    //     }
    //   });
    // });

  } else {
    console.log(err);
  }
});