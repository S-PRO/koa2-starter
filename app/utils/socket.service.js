/**
 * Created by andrew on 27.02.17.
 */

import MessageRouter from './../src/message/socket-router';

import axios from 'axios';

import {SERVER} from './../config/app.config'

export default function (socket, io) {
    socket.on('auth', authData => {
        console.log("token",authData.token)
        if (authData.token) {
            /**
             * Send request on Zend to verify access token
             * if token valid connect ... TODO
             * else ... TODO
             */
            axios.get( SERVER.API_URL + 'thor/user-account', {
                headers:{Authorization: 'Bearer ' + authData.token}

            })
                .then(function (response) {
                    console.log(response);
                    MessageRouter(socket);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    });


    socket.on('disconnect', function() {
        let time = (new Date).toLocaleTimeString();
        io.sockets.json.send({'event': 'userSplit', 'time': time});
    });

    return socket;
}