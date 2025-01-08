let timer;
let timeLeft;
let isWorkPhase = true;
let isPaused = false;
const WORK_TIME = 45;
const BREAK_TIME = 15;
let totalSeconds = 0;
let elapsedTimer;

function startTimer() {
    if (isPaused) {
        isPaused = false;
        document.getElementById('startBtn').textContent = 'Start';
        document.getElementById('pauseBtn').textContent = 'Pause';
    } else {
        timeLeft = isWorkPhase ? WORK_TIME : BREAK_TIME;
        totalSeconds = 0;
    }
    
    document.getElementById('startBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;
    document.getElementById('resetBtn').disabled = false;
    
    updateDisplay();
    
    elapsedTimer = setInterval(() => {
        if (!isPaused) {
            totalSeconds++;
            updateElapsedDisplay();
        }
    }, 1000);
    
    timer = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            
            if (timeLeft < 0) {
                isWorkPhase = !isWorkPhase;
                timeLeft = isWorkPhase ? WORK_TIME : BREAK_TIME;
                updateActiveTimer();
            }
            
            updateDisplay();
        }
    }, 1000);
}

function updateActiveTimer() {
    const workTimer = document.getElementById('workTimer');
    const breakTimer = document.getElementById('breakTimer');
    
    if (isWorkPhase) {
        workTimer.classList.add('active');
        breakTimer.classList.remove('active');
    } else {
        workTimer.classList.remove('active');
        breakTimer.classList.add('active');
    }
}

function pauseTimer() {
    if (!isPaused) {
        isPaused = true;
        document.getElementById('startBtn').disabled = false;
        document.getElementById('startBtn').textContent = 'Resume';
        document.getElementById('pauseBtn').textContent = 'Paused';
    }
}

function resetTimer() {
    clearInterval(timer);
    clearInterval(elapsedTimer);
    
    isPaused = false;
    isWorkPhase = true;
    timeLeft = WORK_TIME;
    totalSeconds = 0;
    
    document.getElementById('startBtn').disabled = false;
    document.getElementById('startBtn').textContent = 'Start';
    document.getElementById('pauseBtn').textContent = 'Pause';
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('resetBtn').disabled = true;
    
    document.getElementById('workDisplay').textContent = WORK_TIME;
    document.getElementById('breakDisplay').textContent = BREAK_TIME;
    updateElapsedDisplay();
    updateActiveTimer();
}

function updateDisplay() {
    if (isWorkPhase) {
        document.getElementById('workDisplay').textContent = timeLeft;
        document.getElementById('breakDisplay').textContent = BREAK_TIME;
    } else {
        document.getElementById('workDisplay').textContent = WORK_TIME;
        document.getElementById('breakDisplay').textContent = timeLeft;
    }
}

function updateElapsedDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('elapsedDisplay').textContent = formattedTime;
}

// Initialize button states
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('resetBtn').disabled = true;
    updateElapsedDisplay();
    updateActiveTimer();
}); 