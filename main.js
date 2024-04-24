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

const personalityTypes = [
  {
    MBTI: "INTJ",
    name: "Obsidian",
    description:
      "Like the strategic and resilient volcanic glass, Obsidian personalities are imaginative and have a plan for everything.",
    compatibleWith: ["Plasma", "Zephyr", "Ether", "Aurora"],
    hexColor: "#4A4E69",
  },
  {
    MBTI: "INTP",
    name: "Ether",
    description:
      "Ether personalities are like the unbounded expanse of the sky, innovative and with an unquenchable thirst for knowledge.",
    compatibleWith: ["Meteorite", "Ironwood", "Aurora", "Obsidian"],
    hexColor: "#3C6E71",
  },
  {
    MBTI: "ENTJ",
    name: "Meteorite",
    description:
      "Meteorite personalities are bold and strong-willed leaders, always finding a way or making one, much like a meteorite dominating the sky.",
    compatibleWith: ["Ether", "Alloy", "Plasma", "Zephyr"],
    hexColor: "#D7263D",
  },
  {
    MBTI: "ENTP",
    name: "Plasma",
    description:
      "Plasma personalities are dynamic and innovative, reflecting the free-flowing and electrically charged state of plasma.",
    compatibleWith: ["Obsidian", "Aurora", "Sunstone", "Meteorite"],
    hexColor: "#F46036",
  },
  {
    MBTI: "INFJ",
    name: "Aurora",
    description:
      "Aurora personalities are quiet and mystical yet inspiring, much like the mesmerizing aurora lights in the sky.",
    compatibleWith: ["Zephyr", "Ether", "Prism", "Obsidian"],
    hexColor: "#9C89B8",
  },
  {
    MBTI: "INFP",
    name: "Prism",
    description:
      "Prism personalities are poetic and kind, reflecting a spectrum of ideas and emotions, always eager to help a good cause.",
    compatibleWith: ["Sunstone", "Aurora", "Zephyr", "Obsidian"],
    hexColor: "#F4ACB7",
  },
  {
    MBTI: "ENFJ",
    name: "Sunstone",
    description:
      "Sunstone personalities are charismatic leaders, able to mesmerize their listeners like the radiant light of a sunstone.",
    compatibleWith: ["Prism", "Aurora", "Zephyr", "Willow"],
    hexColor: "#FFD972",
  },
  {
    MBTI: "ENFP",
    name: "Zephyr",
    description:
      "Zephyr personalities are enthusiastic and sociable free spirits, who can always find a reason to smile, like a refreshing breeze.",
    compatibleWith: ["Aurora", "Obsidian", "Sunstone", "Prism"],
    hexColor: "#9ED2C6",
  },
  {
    MBTI: "ISTJ",
    name: "Granite",
    description:
      "Granite personalities are practical and reliable, much like the strong and enduring granite stone.",
    compatibleWith: ["Ironwood", "Oasis", "Hearthstone", "Alloy"],
    hexColor: "#5C5D67",
  },
  {
    MBTI: "ISFJ",
    name: "Oasis",
    description:
      "Oasis personalities are warm protectors, always ready to provide comfort and care like a nourishing oasis.",
    compatibleWith: ["Hearthstone", "Ironwood", "Granite", "Willow"],
    hexColor: "#88AB75",
  },
  {
    MBTI: "ESTJ",
    name: "Ironwood",
    description:
      "Ironwood personalities are excellent administrators, strong and dependable like the ironwood tree.",
    compatibleWith: ["Granite", "Oasis", "Hearthstone", "Meteorite"],
    hexColor: "#C84B31",
  },
  {
    MBTI: "ESFJ",
    name: "Hearthstone",
    description:
      "Hearthstone personalities are extraordinarily caring and social, providing warmth and comfort like a hearthstone.",
    compatibleWith: ["Oasis", "Granite", "Ironwood", "Willow"],
    hexColor: "#F9C22E",
  },
  {
    MBTI: "ISTP",
    name: "Alloy",
    description:
      "Alloy personalities are bold and practical experimenters, masters of all kinds of tools, much like a strong, mixed metal alloy.",
    compatibleWith: ["Quicksilver", "Meteorite", "Ironwood", "Firework"],
    hexColor: "#7C7C7C",
  },
  {
    MBTI: "ISFP",
    name: "Willow",
    description:
      "Willow personalities are flexible and charming artists, ready to explore and experience new things, much like the adaptable willow tree.",
    compatibleWith: ["Firework", "Quicksilver", "Zephyr", "Oasis"],
    hexColor: "#D3AB9E",
  },
  {
    MBTI: "ESTP",
    name: "Quicksilver",
    description:
      "Quicksilver personalities are smart, energetic and perceptive, enjoying life on the edge like the fast-moving liquid metal.",
    compatibleWith: ["Alloy", "Firework", "Meteorite", "Ironwood"],
    hexColor: "#F18F01",
  },
  {
    MBTI: "ESFP",
    name: "Firework",
    description:
      "Firework personalities are spontaneous, energetic and enthusiastic, ensuring life is never boring around them, much like a dazzling firework display.",
    compatibleWith: ["Willow", "Quicksilver", "Hearthstone", "Zephyr"],
    hexColor: "#E84855",
  },
];

function calculateMBTI(choices) {
  let dimensions = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  choices.forEach((choice) => {
    dimensions[choice]++;
  });

  const personalityType = [
    dimensions["E"] > dimensions["I"] ? "E" : "I",
    dimensions["S"] > dimensions["N"] ? "S" : "N",
    dimensions["T"] > dimensions["F"] ? "T" : "F",
    dimensions["J"] > dimensions["P"] ? "J" : "P",
  ].join("");

  return personalityType;
}

var appState = "welcome";
var questionIndex = -1;
var choices = [];
var cooldown = false;

const nextQuestion = function () {
  if (questionIndex >= QUESTIONS.length - 1) {
    appState = "end";
    console.log(choices);
    const resultType = calculateMBTI(choices);
    const result = personalityTypes.find((type) => type.MBTI === resultType);
    document.getElementById(
      "personalityMatch"
    ).innerHTML = `You are: ${result.name}`;
    document.getElementById("personalityWave").style.fill = result.hexColor;
    document.getElementById(
      "personalityResult"
    ).innerHTML = `${result.description}`;
    document.getElementById("badge1Name").innerHTML = result.compatibleWith[0];
    document.getElementById("badge2Name").innerHTML = result.compatibleWith[1];
    document.getElementById("badge3Name").innerHTML = result.compatibleWith[2];
    document.getElementById("badge4Name").innerHTML = result.compatibleWith[3];
    document.getElementById("badge1").style.color = personalityTypes.find(
      (type) => type.name == result.compatibleWith[0]
    ).hexColor;
    document.getElementById("badge2").style.color = personalityTypes.find(
      (type) => type.name == result.compatibleWith[1]
    ).hexColor;
    document.getElementById("badge3").style.color = personalityTypes.find(
      (type) => type.name == result.compatibleWith[2]
    ).hexColor;
    document.getElementById("badge4").style.color = personalityTypes.find(
      (type) => type.name == result.compatibleWith[3]
    ).hexColor;

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
});

const setCooldown = function () {
  cooldown = true;
  setTimeout(() => {
    cooldown = false;
  }, 1500);
};

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
      return;
    } else if (peopleInFrame > 1) {
      console.log("One person at a time please.");
    } else {
      if (cooldown) {
        return;
      }
      const person = frame["people"][0];
      if (areBothHandsRaised(person)) {
        console.log("Both hands raised");
        if (appState == "questions") {
          // UNDO
          choices.pop();
          questionIndex -= 2;
          nextQuestion();
        } else if (appState == "end") {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          appState = "welcome";
          questionIndex = -1;
        }
      } else if (isLeftHandRaised(person)) {
        console.log("Left hand raised");
        if (appState == "questions") {
          choices.push(QUESTIONS[questionIndex].option1.type);
          nextQuestion();
        }
      } else if (isRightHandRaised(person)) {
        console.log("Right hand raised");
        console.log(appState);
        if (appState == "questions") {
          choices.push(QUESTIONS[questionIndex].option2.type);
          nextQuestion();
        } else if (appState == "welcome") {
          questionIndex = -1;
          appState = "questions";
          nextQuestion();
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }
      }
      const side = personOnSide(person);

      if (side == -1) {
        console.log("Person on left side of screen");
      } else if (side == 1) {
        console.log("Person on right side of screen");
      }
      setCooldown();
    }
  },
};
