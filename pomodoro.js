//Elememts
const timer = document.querySelector('#timer');
const menu = document.querySelector('#menu');
const burger = document.querySelector('#burger');
const resetBtn = document.querySelector('#reset-btn');
const closeBtn = document.querySelector('#close-btn');
const modal = document.querySelector('.modal');
const modalBox = document.querySelector('.modal-box')

//Event Listeners
burger.addEventListener('click', () => {
    menu.classList.toggle('open')
})
resetBtn.addEventListener('click', () => {
    reset();

})
closeBtn.addEventListener('click', () => {
    modal.classList.toggle('closed')
})
window.addEventListener('click', (e) => {
    if(openModal && e.target !== modalBox) {
        console.log('you clicked on the modal! GOOD JOB!')
        modal.classList.toggle('closed')
        openModal = false;
    }
})

document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOM content loaded!')
    timer.innerText = formatTime();
})

//start timer on click
timer.addEventListener('click', startTimer)

//State Variables
const timeElapsed = {
    hours: 0,
    minutes: 0,
    seconds: 0
}

let running = false;
let interval = null;
let openModal = true;

function incrementMinutes() {
    timeElapsed.minutes++
    if(timeElapsed.minutes >= 25 && timeElapsed.seconds === 0) {
        alert('It has been 25 minutes, please take a 5 minute break.')
        stopTimer(timeElapsed)
    }
}


function incrementSeconds() {
    timeElapsed.seconds++;
    if(timeElapsed.seconds === 60) {
        timeElapsed.seconds = 0;
        incrementMinutes(timeElapsed)
    }

    console.log(`${timeElapsed.minutes}: ${timeElapsed.seconds}`)
}

function resetClock() {
    for(let key in timeElapsed) {
        timeElapsed[key] = 0;
    }
    console.log(timeElapsed)
}

function formatTime() {
    //should take time elapsed timeElapsed and format it as a string
    //mm:ss

    let minutes = ''
    let seconds = ''

    minutes = timeElapsed.minutes + ''
    seconds = timeElapsed.seconds + ''
    
    if(minutes.length < 2) {
        minutes = '0' + minutes
    }
    if(seconds.length < 2) {
        seconds = '0' + seconds
    }

    return minutes + ':' + seconds

    
}


function displayTime() {
    if(interval) {
        incrementSeconds();
    }
    timer.innerText = formatTime();

}

function startTimer() {

    if(!interval) {
        interval = setInterval(displayTime, 1000); 
    } else {
        stopTimer()
    }
}

function stopTimer() {
    // resetClock(timeElapsed)

    clearInterval(interval);
    interval = null;
}

function reset() {
    stopTimer();
    resetClock();
    displayTime();
}