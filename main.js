import { isRightHandRaised, isLeftHandRaised, areBothHandsRaised, countPeople, personOnSide } from "./func.js";

var host = "cpsc484-04.stdusr.yale.internal:8888";

$(document).ready(function () {
    frames.start();
});

var frames = {
    socket: null,

    start: function () {
        var url = "ws://" + host + "/frames";
        frames.socket = new WebSocket(url);
        frames.socket.onmessage = function (event) {
            frames.show(JSON.parse(event.data));
        }
    },

    show: function (frame) {
        let peopleInFrame = countPeople(frame)
        if (peopleInFrame == 0)
        {
            // console.log("hello")
            return
        } 
        else if (peopleInFrame > 1)
        {
            console.log("One person at a time please.")
        } 
        else 
        {
            const person = frame["people"][0]
            if (areBothHandsRaised(person))
            {
                console.log("Both hands raised")
            }
            else if (isLeftHandRaised(person))
            {
                console.log("Left hand raised")
            }
            else if (isRightHandRaised(person))
            {
                console.log("Right hand raised")
            }
            // console.log(frame["people"][0]["x_pos"])
            const side = personOnSide(person)

            if (side == -1)
            {
                console.log("Person on left side of screen")
            }
            else if (side == 1)
            {
                console.log("Person on right side of screen")
            }
        }
    }
};