var config = require ('./config');

const io = require('socket.io')();
const Twitter = require('node-tweet-stream');


const tClient = new Twitter({
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_secret ,
    token: config.twitter.token,
    token_secret: config.twitter.token_secret
});



io.on('connection', (client) => {
    client.on('_tw_start_', (data) => {
        tClient.untrackAll();
        tClient.track(data.tag);
        console.warn('Changing hashtag to (' + data.tag + ')')
    });

    tClient.on('tweet', function(tweet) {
        client.emit('tw_', {message: tweet.text});
    });
});

io.listen(8000);
console.log('Server is listening...')
