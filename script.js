let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let timerInterval;
let running = false;

// Select elements
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const startPauseBtn = document.getElementById('start-pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

// Start or Pause the timer
startPauseBtn.addEventListener('click', () => {
    if (!running) {
        startTimer();
    } else {
        pauseTimer();
    }
});

// Reset the timer
resetBtn.addEventListener('click', resetTimer);

// Record a lap time
lapBtn.addEventListener('click', recordLap);

// Timer logic
function startTimer() {
    running = true;
    startPauseBtn.textContent = 'Pause';
    startPauseBtn.classList.add('pause');
    timerInterval = setInterval(() => {
        milliseconds += 10;
        if (milliseconds === 1000) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        updateTimeDisplay();
    }, 10);
}

function pauseTimer() {
    running = false;
    startPauseBtn.textContent = 'Start';
    startPauseBtn.classList.remove('pause');
    clearInterval(timerInterval);
}

function resetTimer() {
    running = false;
    clearInterval(timerInterval);
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateTimeDisplay();
    startPauseBtn.textContent = 'Start';
    startPauseBtn.classList.remove('pause');
    lapsContainer.innerHTML = '';
}

function recordLap() {
    if (running) {
        const lapTime = `${pad(minutes)}:${pad(seconds)}:${pad(Math.floor(milliseconds / 10))}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap: ${lapTime}`;
        lapsContainer.appendChild(lapItem);
    }
}

// Update the timer display
function updateTimeDisplay() {
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
    millisecondsEl.textContent = pad(Math.floor(milliseconds / 10));
}

// Utility function to pad numbers with leading zeros
function pad(number) {
    return number.toString().padStart(2, '0');
}