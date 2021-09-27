let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const form = document.querySelector('#custom');
// console.log(form);

function timer(seconds) {
  // clear
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  //   console.log({ now, then });

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it
    if (secondsLeft <= 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    // console.log(secondsLeft);
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;
  //   console.log({ minutes, remainderSeconds });
  //   console.log(seconds);

  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();

  endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${
    minutes < 10 ? '0' : ''
  }${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

function minSubmit(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
}

buttons.forEach((button) => button.addEventListener('click', startTimer));

form.addEventListener('submit', minSubmit);

// document.customForm.addEventListener('submit', function (e) {
//   e.preventDefault();
//   const mins = this.minutes.value;
//   console.log(mins);
//   timer(mins * 60);
//   this.reset();
// });
