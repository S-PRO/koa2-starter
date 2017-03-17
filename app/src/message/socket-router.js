/**
 * Created by andrew on 22.02.17.
 */

import db from './../../models/index';

export default function (socket) {

    socket.on('message:create', message => {
        let time = (new Date).toLocaleTimeString();

        //push message to DB
        console.log("message",message)

        let messageData = {
            owner_id:message.user_id,
            receiver_id:message.recipient,
            message:message.message,
            delivered:false,
            is_read:false,
        };

        db.message.create(messageData);

        // Уведомляем клиента, что его сообщение успешно дошло до сервера
        socket.json.send({'event': 'messageSent',  'text': message, 'time': time});
        // Отсылаем сообщение остальным участникам чата
        socket.broadcast.json.send({'event': 'messageReceived', 'text': message, 'time': time})
    });

    /**
     * TODO
     */
    socket.on('message:delete', message => {});

    /**
     *
     */
    socket.on('message:get_history', data =>{
        console.log("data", data)
        db.sequelize.query("SELECT message,id FROM messages WHERE owner_id = "+data.user_id+" AND receiver_id= "+data.recipient+" ;")
            .then((ss)=>{socket.json.send({'event': 'messagesReceived', 'messages': ss[0]})})
            .catch((err)=>{console.log('err>>>>',err)})
    })

    /**
     *
     */
    socket.on('message:mark_as_read', data =>{
        console.log("data", data)
        db.sequelize.query("UPDATE messages SET is_read = true WHERE id = "+data.message_id+";")
            .then((ss)=>{
            console.log("ss",ss)
            //socket.json.send({'event': 'messagesIsReaded', 'messages': ss[0]})
        })
            .catch((err)=>{console.log('err>>>>',err)})
    })
}