import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

function socketConnect(callback) {
    let tag_query_ = window.location.pathname.substring(1, 32);
    socket.emit('_tw_start_', {tag: tag_query_});

    socket.on('tw_', function(data) {
        callback(data);
    });
}

export {socketConnect}
