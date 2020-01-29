// imports always go first - if we're importing anything

import ChatMessage from "./modules/ChatMessage.js";


const socket = io();


//this is data destructuring. Go look it up on MDN
function setUserId({sID}) {
    console.log(sID);
    vm.socketID = sID; 
}

function showDisconneectMessage() {
    console.log('a user disconnected');
}


function appendMessage(message) {
    vm.messages.push(message);

}

const vm = new Vue({
    data: {
        socketID: "",
        message: "", 
        nickname: "",
        messages: [
            
        ]
    },

    methods: {
        dispatchMessage() {

            console.log('handle email message');

            socket.emit('chat_message', {
                content: this.message,
                name: this.nickname || "anonymous"
            })

            this.message = "";

        }
    }, 

    mounted: function() {
        console.log('vue is done mounting');
    }, 

    components: {
        newmessage: ChatMessage
    }
}).$mount("#app");

socket.addEventListener('connected', setUserId);
socket.addEventListener('disconnect', showDisconneectMessage);
socket.addEventListener('new_message', appendMessage);