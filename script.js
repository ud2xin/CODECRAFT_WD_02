let timerDisplay = document.querySelector('.timer-display');
let startBtn = document.getElementById('start-timer');
let pauseBtn = document.getElementById('pause-timer');
let resetBtn = document.getElementById('reset-timer');
let lapBtn = document.getElementById('lap-timer');
let lapList = document.getElementById('lap-list');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

function formatTime(ms) {
    let milliseconds = ms % 1000;
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor(ms / (1000 * 60 * 60));
    return (
        (hours < 10 ? "0" : "") + hours + " : " +
        (minutes < 10 ? "0" : "") + minutes + " : " +
        (seconds < 10 ? "0" : "") + seconds + " : " +
        (milliseconds < 100 ? (milliseconds < 10 ? "00" : "0") : "") + milliseconds
    );
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(elapsedTime);
}

function startTimer() {
    if (!running) {
        running = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
    }
}

function pauseTimer() {
    if (running) {
        running = false;
        clearInterval(timerInterval);
    }
}

function resetTimer() {
    running = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    lapList.innerHTML = "";
}

function addLap() {
    if (elapsedTime === 0) return;
    const li = document.createElement('li');
    li.textContent = formatTime(elapsedTime);
    lapList.appendChild(li);
    lapList.scrollTop = lapList.scrollHeight;
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);

updateDisplay();