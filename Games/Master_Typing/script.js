const keys = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

const timestamps = [];

//Declear the variables for counting total entry and correct entry
let totalEntry = 0;
let correctEntry = 0;

timestamps.unshift(getTimestamp());

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomKey() {
  return keys[getRandomNumber(0, keys.length - 1)];
}

function targetRandomKey() {
  const key = document.getElementById(getRandomKey());
  key.classList.add("selected");
  let start = Date.now();
}

function getTimestamp() {
  return Math.floor(Date.now() / 1000);
}

document.addEventListener("keyup", (event) => {
  const keyPressed = String.fromCharCode(event.keyCode);
  const keyElement = document.getElementById(keyPressed);
  const highlightedKey = document.querySelector(".selected");

  //counting the total entry
  totalEntry++;

   // Add sound
    const audio = new Audio("assets/Right_Press.mp3");
    audio.play();

  keyElement.classList.add("hit");
  keyElement.addEventListener("animationend", () => {
    keyElement.classList.remove("hit");
  });

  if (keyPressed === highlightedKey.innerHTML) {
    //counting the correct entry
    correctEntry++;

    // // Add right sound
    // const audio = new Audio("assets/Right_Press.mp3");
    // audio.play();

    timestamps.unshift(getTimestamp());
    const elapsedTime = timestamps[0] - timestamps[1];

    console.log(`Character per minute ${60 / elapsedTime}`);
    console.log(`Press count: ${totalEntry}`); //for debugging
    console.log(`Press count: ${correctEntry}`); //for debugging

    highlightedKey.classList.remove("selected");
    targetRandomKey();
  }
  //  else {
  //   // Add wrong sound
  //   const audio = new Audio("assets/Wrong_Press.wav");
  //   audio.play();
  // }
});

targetRandomKey();

// ---------------------For the Timer--------------------------------

var timerElement = document.getElementById("timer");
var intervalId;
var secondsLeft = 60;

function startTimer() {
  // Disable the start button
  document.querySelector("button:nth-of-type(1)").disabled = true;

  // Reset the counts entries
  totalEntry = 0;
  correctEntry = 0;

  // Update the timer every second
  intervalId = setInterval(function () {
    secondsLeft--;
    if (secondsLeft < 0) {
      //call assessment function for review result
      assessment();
      clearInterval(intervalId);
      return;
    }
    var minutes = Math.floor(secondsLeft / 60);
    var seconds = secondsLeft % 60;
    timerElement.textContent = padNumber(minutes) + ":" + padNumber(seconds);
  }, 1000);
}

function restartTimer() {
  clearInterval(intervalId);
  secondsLeft = 60;
  timerElement.textContent = "00:00";

  // Enable the start button
  document.querySelector("button:nth-of-type(1)").disabled = false;
}

function padNumber(number) {
  return number.toString().padStart(2, "0");
}

function assessment() {
  const accuracy = (correctEntry / totalEntry) * 100;
  const acc = accuracy.toFixed(2);

  // Get the popup overlay and content elements
  const popupOverlay = document.getElementById("popupOverlay");
  const popupContent = document.getElementById("popupContent");

  // Create the content of the popup
  const popupHTML = `
    <h2>Typing Result</h2>
    <p>You typed with a speed of <stong> ${correctEntry} CPM </strong>.<br>Your accuracy was <strong> ${acc}% </strong>.</p>
  `;

  // Set the content of the popup
  popupContent.innerHTML = popupHTML;

  // Show the popup by removing the "hidden" class
  popupOverlay.classList.remove("hidden");

  // Hide the popup after a timeout
  setTimeout(function () {
    popupOverlay.classList.add("hidden");
  }, 4000); // Change the timeout duration (in milliseconds) as needed

  // Update the timerElement with the result content
  timerElement.innerHTML = "00:00";
}

document.addEventListener("DOMContentLoaded", () => {
  const ratingPrompt = document.getElementById("ratingPrompt");
  const stars = document.querySelectorAll(".star");
  let selectedRating = 0;

  // Function to show the rating prompt
  function showRatingPrompt() {
    ratingPrompt.style.display = "flex";
  }

  // Function to hide the rating prompt
  function hideRatingPrompt() {
    ratingPrompt.style.display = "none";
  }

  // Event listeners for stars
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      selectedRating = star.getAttribute("data-value");
      stars.forEach((s, index) => {
        if (index < selectedRating) {
          s.classList.add("selected");
        } else {
          s.classList.remove("selected");
        }
      });
    });
  });

  // Event listener for submit button
  document.getElementById("submitRating").addEventListener("click", () => {
    if (selectedRating > 0) {
      alert(`Thank you for rating the game ${selectedRating} stars!`);
      hideRatingPrompt();
    } else {
      alert("Please select a rating.");
    }
  });

  // Event listener for cancel button
  document
    .getElementById("cancelRating")
    .addEventListener("click", hideRatingPrompt);

  // Event listener for feedback link
  feedbackLink.addEventListener("click", (event) => {
    event.preventDefault();
    feedbackContainer.style.display = "flex";
    hideRatingPrompt();
  });

  // Event listener for close feedback button
  closeFeedback.addEventListener("click", () => {
    feedbackContainer.style.display = "none";
  });

  // Event listener for feedback form submission
  feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const feedback = feedbackForm.feedback.value;
    if (feedback) {
      alert("Thank you for your feedback!");
      feedbackContainer.style.display = "none";
    } else {
      alert("Please write your feedback before submitting.");
    }
  });

  // Function to call when the game is completed
  function onGameCompleted() {
    showRatingPrompt();
  }

  // Set timeout for game completion after 60 seconds
  setTimeout(onGameCompleted, 67000);
});
