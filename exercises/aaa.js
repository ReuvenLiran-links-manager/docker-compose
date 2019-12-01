var Twitter = require('twitter');
var config = require('./config.js');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var myTwitter = new Twitter(config);
var textParser = bodyParser.text();
const tweetCount = 5; // change it to optimize paging. max value=200

// Tweet a message
app.post('/tweet', textParser, function (req, res) {
        myTwitter.post('statuses/update',{status: req.body}, function (err, tweet, response) {
            if (err) {
                console.error(err);
                throw err;
            }
            console.log(tweet);
            res.end(JSON.stringify(response));
        });
});

async function getStatus(allTweets, id, maxId) {
  try {
    const list = await myTwitter.get('statuses/user_timeline', {
        user_id: id,
        count: tweetCount,
        max_id: maxId
    });
    if (Array.isArray(list) && list.length > 0) {
        const newMaxId = parseInt(list[list.length - 1].id_str).toString();
        list.pop();
        // tweetList = [...tweetList, ...list];
        const tweetsList = [...allTweets, ...list];
        console.log('run', tweetsList);
        return await getStatus(tweetsList, id, newMaxId);
        // return tweetList.concat(await loop());
    }
    else {
      console.log('end', allTweets)
        return allTweets;
    }
  } catch (err) {
      console.error(err);
      throw err;
  }
}

app.get('/list', async (req, res) => {
  console.log('list');
  const userResponse = await myTwitter.get('account/verify_credentials', {skip_status: true});
  const {id_str: id} = userResponse;
  let tweetList = await myTwitter.get('statuses/user_timeline', {user_id: id});
  const maxId = parseInt(tweetList[tweetList.length - 1].id_str).toString();
  if (Array.isArray(tweetList) && tweetList.length > 0) {
    tweetList = await getStatus(tweetList, id, maxId);
  }
  console.log(tweetList);
  return tweetList;
});


// Get list of tweets
// app.get('/list', function(req, res) {
//     var tweetList = [];
//     myTwitter.get('account/verify_credentials', {skip_status: true}, function (userError, userResponse) {
//         if (userError) {
//             console.error(userError);
//             throw userError;
//         }
//         var id = userResponse.id_str;
//         //var maxId;
//         myTwitter.get('statuses/user_timeline', {user_id: id}, function (err, response) {
//             if (err) {
//                 console.error(err);
//                 throw err;
//             }
//             if (Array.isArray(response) && response.length > 0) {
//                // const sinceId = response[0].id_str;
//                 tweetList = response;
//                 maxId = parseInt(response[response.length - 1].id_str).toString();
//                 async function loop() {
//                     try {
//                         const list = await myTwitter.get('statuses/user_timeline', {
//                             user_id: id,
//                             count: tweetCount,
//                             max_id: maxId
//                         });
//                         if (Array.isArray(list) && list.length > 0) {
//                             maxId = parseInt(list[list.length - 1].id_str).toString();
//                             list.pop();
//                             tweetList = tweetList.concat(list);
//                             return tweetList.concat(await loop());
//                         }
//                         else {
//                             return list;
//                         }
//                     } catch (err) {
//                         console.error(err);
//                         throw err;
//                     }
//                 }
//                 loop().then(res.end(JSON.stringify(tweetList)));
//             }
//             //console.log(JSON.stringify(tweetList));
//             //res.end(JSON.stringify(tweetList));
//         });
//     });
// });

// Init server
app.listen(config.port, function () {
    console.log("server listening at http://%s:%s", config.host, config.port);
});