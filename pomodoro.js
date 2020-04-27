//Elememts
const timer = document.querySelector('#timer');
const menu = document.querySelector('#menu');
const burger = document.querySelector('#burger');
const resetBtn = document.querySelector('#reset-btn');
const closeBtn = document.querySelector('#close-btn');
const modal = document.querySelector('.modal');
const modalBox = document.querySelector('.modal-box');
const taskInput = document.querySelector('#task-input');
const submitTask = document.querySelector('#submit-task');
const taskTitle = document.querySelector('#menu-task-name');
const audio = document.querySelector('#audio');
const checkboxAudio = document.querySelector('#checkbox-audio');

const checkboxes = document.querySelectorAll('.menu-checkbox');

//Event Listeners

    //menu
burger.addEventListener('click', () => {
    menu.classList.toggle('open')
})
resetBtn.addEventListener('click', () => {
    reset();
})
checkboxes.forEach(box => {
    box.addEventListener('click', () => {
        checkboxAudio.play();
    })
})
// submitTask.addEventListener('submit', () => {
//     console.log('you have submitted a task')
// })

    //modal
closeBtn.addEventListener('click', () => {
    modal.classList.toggle('closed')
})

//this triggers on submit
taskInput.addEventListener('change', (e) => {
    // console.log(e.target.value, 'this is the value')
    task = e.target.value;
    taskTitle.innerText = task; 
    e.target.value = '';
    modal.classList.toggle('closed')
    startTimer();
})


window.addEventListener('click', (e) => {
    if(openModal && e.target === modal) {
        console.log('you clicked on the modal! GOOD JOB!')
        modal.classList.toggle('closed')
        openModal = false;
    }
    // if(e.target === modal) {
    //     console.log(e.target, 'this is the modal!')
    // }
})

document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOM content loaded!')
    timer.innerText = formatTime();
})

//start timer on click
timer.addEventListener('click', startTimer);

//State Variables
const timeElapsed = {
    hours: 0,
    minutes: 24,
    seconds: 55
}

let running = false;
let interval = null;
let openModal = true;
let task;

function checkTime() {
    if(timeElapsed.minutes >= 25 && timeElapsed.seconds === 0) {

        timesUp();

    }
        
}
function timesUp() {
        stopTimer(timeElapsed)
        audio.play();
        menu.classList.toggle('open')
}

function incrementMinutes() {
    timeElapsed.minutes++
    checkTime();    
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