import {
  isRightHandRaised,
  isLeftHandRaised,
  areBothHandsRaised,
  countPeople,
  personOnSide,
} from "./func.js";

var host = "cpsc484-04.stdusr.yale.internal:8888";

const QUESTIONS = [
  {
    questionTitle: "You've been invited to a big party. How do you feel?",
    option1: {
      text: "Excited to meet new people and energized by the crowd.",
      type: "E",
    },
    option2: {
      text: "Hesitant and would prefer a quiet night with close friends.",
      type: "I",
    },
  },
  {
    questionTitle: "When traveling, you prefer to:",
    option1: {
      text: "Have a detailed itinerary with planned activities.",
      type: "J",
    },
    option2: {
      text: "Go with the flow and decide activities spontaneously.",
      type: "P",
    },
  },
  {
    questionTitle: "Faced with a problem, you:",
    option1: {
      text: "Brainstorm and think of innovative solutions.",
      type: "N",
    },
    option2: {
      text: "Use practical solutions based on what has worked before.",
      type: "S",
    },
  },
  {
    questionTitle: "You've decided to learn a new hobby, you:",
    option1: { text: "Join a class and enjoy the social aspect.", type: "E" },
    option2: {
      text: "Learn it yourself through books or videos at your own pace.",
      type: "I",
    },
  },
  {
    questionTitle: "When making decisions, you:",
    option1: { text: "Focus on logic and consistency.", type: "T" },
    option2: {
      text: "Consider people's feelings and the impact on relationships.",
      type: "F",
    },
  },
  {
    questionTitle: "Learning something new, you prefer:",
    option1: { text: "Facts and real-life applications.", type: "S" },
    option2: { text: "Concepts and theoretical possibilities.", type: "N" },
  },
  {
    questionTitle: "At a party, you are more likely to:",
    option1: { text: "Meet new people and mingle.", type: "E" },
    option2: { text: "Stick with the people you know.", type: "I" },
  },
  {
    questionTitle: "Organizing an event, you:",
    option1: { text: "Plan everything to the last detail.", type: "J" },
    option2: {
      text: "Keep options open to accommodate last-minute changes.",
      type: "P",
    },
  },
  {
    questionTitle: "In a disagreement, you:",
    option1: { text: "Stand firm by your logical point of view.", type: "T" },
    option2: {
      text: "Try to understand the other person's feelings.",
      type: "F",
    },
  },
  {
    questionTitle: "Choosing a movie, you prefer films that are:",
    option1: { text: "Realistic and factual.", type: "S" },
    option2: { text: "Innovative and imaginative.", type: "N" },
  },
];

function calculateMBTI(choices) {
  let dimensions = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  choices.forEach((choice) => {
    dimensions[choice.type]++;
  });

  const personalityType = [
    dimensions["E"] > dimensions["I"] ? "E" : "I",
    dimensions["S"] > dimensions["N"] ? "S" : "N",
    dimensions["T"] > dimensions["F"] ? "T" : "F",
    dimensions["J"] > dimensions["P"] ? "J" : "P",
  ].join("");

  return personalityType;
}

// Example usage:
// const userChoices = ["A", "B", "A", "B", "A", "B", "A", "B", "A", "B"]; // User selects an option for each question
// const userSelections = userChoices.map(
//   (choice, index) => questions[index][choice]
// );
// const resultType = calculateMBTI(userSelections);
// console.log("Your MBTI type might be:", resultType);

var appState = "welcome";
var questionIndex = -1;
var choices = [];

const nextQuestion = function () {
  if (questionIndex >= QUESTIONS.length - 1) {
    appState = "end";
    console.log(choices);

    const resultType = calculateMBTI(choices);
    console.log("Your MBTI type might be:", resultType);
    document.getElementById(
      "personalityResult"
    ).innerHTML = `Your MBTI type might be: ${resultType}`;
    window.scrollTo({
      top: window.innerHeight * 2,
      behavior: "smooth",
    });
    return;
  }

  questionIndex += 1;
  document.getElementById("question_no").innerHTML = `Question ${
    questionIndex + 1
  } of ${QUESTIONS.length}`;
  document.getElementById("questionText").innerHTML =
    QUESTIONS[questionIndex].questionTitle;
  document.getElementById("c1Text").innerHTML =
    QUESTIONS[questionIndex].option1.text;
  document.getElementById("c2Text").innerHTML =
    QUESTIONS[questionIndex].option2.text;
};

$(document).ready(function () {
  frames.start();

  const goToQuestionsButton = document.getElementById("goToQuestions");
  console.log("nice");
  goToQuestionsButton.onclick = function () {
    questionIndex = -1;
    appState = "questions";
    // console.log("hi");
    nextQuestion();
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  const leftButton = document.getElementById("leftButton");
  console.log("clicked left");
  leftButton.onclick = function () {
    choices.push(QUESTIONS[questionIndex].option1.type);
    nextQuestion();
  };
  const rightButton = document.getElementById("rightButton");
  console.log("clicked right");
  rightButton.onclick = function () {
    choices.push(QUESTIONS[questionIndex].option2.type);
    nextQuestion();
  };
});

var frames = {
  socket: null,

  start: function () {
    console.log("nice");
    var url = "ws://" + host + "/frames";
    frames.socket = new WebSocket(url);
    frames.socket.onmessage = function (event) {
      frames.show(JSON.parse(event.data));
    };
  },

  show: function (frame) {
    let peopleInFrame = countPeople(frame);
    if (peopleInFrame == 0) {
      // console.log("hello")
      return;
    } else if (peopleInFrame > 1) {
      console.log("One person at a time please.");
    } else {
      const person = frame["people"][0];
      if (areBothHandsRaised(person)) {
        console.log("Both hands raised");
      } else if (isLeftHandRaised(person)) {
        console.log("Left hand raised");
      } else if (isRightHandRaised(person)) {
        console.log("Right hand raised");
      }
      // console.log(frame["people"][0]["x_pos"])
      const side = personOnSide(person);

      if (side == -1) {
        console.log("Person on left side of screen");
      } else if (side == 1) {
        console.log("Person on right side of screen");
      }
    }
  },
};
