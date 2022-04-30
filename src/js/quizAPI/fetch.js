import { API_TOKEN, API_URL } from "./constants";

const availableCategories = [
  "BASH",
  "DevOps",
  "HTML",
  "JavaScript",
  "Docker",
  "MySQL",
  "PHP",
  "WordPress",
];

//https://quizapi.io/api/v1/questions?apiKey=YOUR_API_KEY&category=code&difficulty=Easy&limit=10&tags=JavaScript

const getQuiz = (category, successCallback) => {
  fetch(
    `${API_URL}?apiKey=${API_TOKEN}&difficulty=Easy&limit=10&tags=${category}`
  )
    .then((r) => r.json())
    .then((data) => {
      if (data && typeof successCallback === "function") {
        successCallback(data);
      }
    })
    .catch((err) => console.log(err));
};

export { availableCategories, getQuiz };
