import React from 'react';
import ReactDOM from 'react-dom';
import tomato from '../assets/tomato.svg';

//Components
import Tomato from '../Components/Tomato'
import Timer from '../Components/Timer'
import Reset from '../Components/Reset'
import Audio from '../Components/Audio'

import CheckboxPrompt from '../Components/CheckboxPrompt.js'

//Containers
import Sidebar from '../Containers/Sidebar'
import Modal from '../Containers/Modal'


//Audio
import doorbell from '../assets/audio/doorbell.mp3'


//styles
import './home.scss'


//svgs
import CancelCircle from '../assets/cancel-circle.svg'



class Home extends React.Component {

    state = {
        user: 'Will',
        pickATask: true,
        menuIsOpen: false,
        modalIsOpen: true,
        task: '',
        allTasks: [],
        timeLeft: {
            hours: 0,
            minutes: 0,
            seconds: 1,
        },
        set: 0,
        intervals: 4,
        totalIntervals: 0,
        checks: 3,
        checkboxPrompt: false,
        countDown: null,
        break: false,
        longBreak: false,
        audio: {
            playing: false,
        },
    };

    //Handling functions

    //Toggles menu open or closed
    handleMenuToggle(e) {
        this.setState({
            menuIsOpen: !this.state.menuIsOpen,
        })
    };

    //Toggles modal open or closed
    handleModalToggle(e) {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen,
        })
    };

    //handle submission to all tasks
    handleTaskSubmit(e) {
        e.preventDefault();
        const taskObj = {
            user: this.state.user,
            name: this.state.task,
            timeStart: new Date(),
            timeEnd: null,
            inProgress: true,
        };
        this.setState({
            pickATask: false,
            allTasks: [...this.state.allTasks, taskObj],
            modalIsOpen: false,
        });
    };

    //set single task in state
    setTask(e) {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.currentTarget.value,
        });
    };
     
    //Decreases seconds in state by one
    decrementSeconds() {
        // console.log('decrement Seconds called!')
            let { timeLeft } = this.state
            let { seconds, minutes } = timeLeft;
            this.setState({
                timeLeft: {
                    ...this.state.timeLeft,
                    seconds: this.state.timeLeft.seconds - 1,
                }
            }, () => console.log(this.state.timeLeft.seconds))
            
    };
    //Decrements minutes by one
    decrementMinutes() {
        let { timeLeft } = this.state;
        this.setState({
            ...this.state,
            timeLeft: {
                minutes: --this.state.timeLeft.minutes,  
            }
        })
    };

    //This triggers when clock reaches 0 (hours, minutes, and seconds)
    timesUp() {
        this.promptCheck();
        this.playSound();
        this.stopTimer();

    };

    //Decrease clock by minutes or seconds depending on state
    count() {
        let { hours, minutes, seconds } = this.state.timeLeft;
        if(hours === 0 && minutes === 0 && seconds === 0) {
            this.timesUp();
            return
        };
        if(seconds > 0) {
            this.decrementSeconds();
        } else if(seconds === 0) {
            this.decrementMinutes();
            this.setState({
                timeLeft: {
                    ...this.state.timeLeft,
                    seconds: 59,
                }
            });
        };
    }
    
    //Start an interval, calling count function every second (1000ms)
    startTimer() {
        this.timerID = setInterval(() => {this.count()}, 1000)
        this.setState({
            running: true,
        })
        
    };
    //Clear counting interval
    stopTimer() {
        clearInterval(this.timerID)        
        this.setState({
            running: false,
        })
    };

    //Reset clock in state to default
    resetClock(e) {
         if(e) {
            e.preventDefault();
         }
            this.stopTimer();
         
         this.setState({
            ...this.state,
            timeLeft: {
                hours: 0,
                minutes: 25,
                seconds: 0,
            }
         })
         
    };

    //Audio
    playSound() {
        this.setState({
            audio: {
                src: doorbell,
                playing: !this.state.audio.playing
            }
        })
    };

    //Increments totalIntervals in state
    incrementTotalIntervals() {
        this.setState({
            totalIntervals: ++this.state.totalIntervals
        }, () => {console.log('%ctotalIntervals in state: ', 'color: MediumAquamarine; font-size: 20px', this.state.totalIntervals)})
    }

    //render/unmount the 'please check a box!' prompt 
    promptCheck() {
        this.setState({
            checkboxPrompt: !this.state.checkboxPrompt,
        })
    };

    //set timeout for modal to close after set amount of time
    //this function is called in toggleBreak, if break is set to true in state
    startBreak() {

        console.log('starting break!')
        //if break is true, toggle in off in x amount of time, this is the break interval
        //start a five minute break
        const shortBreak = 300000;
        //start a twenty five minute break
        // const longBreak = 1500000;
        const longBreak = 5000
        if(this.state.break) {
            setTimeout(() => this.toggleBreak(), 1000);
            setTimeout(() => this.startTimer(), 1000);
            this.incrementTotalIntervals()
        }
        //this handles most of the transition from an old set into a new set
        if(this.state.longBreak) {
            const longBreakInterval = setInterval(() => this.count(), 1000) 
            setTimeout(() => clearInterval(longBreakInterval), longBreak);
            setTimeout(() => this.toggleBreak(), longBreak);
            setTimeout(() => this.resetClock(), longBreak);
            setTimeout(() => this.newSet(), longBreak);
            this.incrementTotalIntervals()

        }
        
    };

    //toggle the 'pick a task' prompt
    toggleTask() {
        this.setState({
            pickATask: !this.state.pickATask
        })
    };

    //handle checkbox checking - triggers break after box is checked
    handleCheck(e) {
        console.log('handleCheck -> this.state.break: ', this.state.break)
        //since the checkbox registers as checked BEFORE the event is passed, checking 
        //if the box has been checked is counter-intuitive
        if(e.currentTarget.checked) {
            this.setState({
                checks: ++this.state.checks,
            }, ()=> console.log('this is how many checks: ', this.state.checks, '\nthis is how many intervals: ', this.state.intervals))
        } else {
            this.setState({
                checks: --this.state.checks,
            })
        }   
        
        //If the checkbox prompt is out and a box is checked
        if(this.state.checkboxPrompt) {
            this.resetClock()
            //turn off the prompt
            this.promptCheck()
            //turn on the modal
            this.handleModalToggle()
            //toggle break in state
            this.toggleBreak()

            console.log('this is the state of break in checkboxprompt: ', this.state.break)
        }
        
    };

    //set break to true/false and turn the modal on or off
    toggleBreak() {

        //we hit this
        if(this.state.intervals === 4 && this.state.checks === 4) {
            this.setState({
                longBreak: !this.state.longBreak,
                modalIsOpen: !this.state.modalIsOpen,
            }, () => {
                if(this.state.longBreak) {
                    //set the modal to toggle off in 5 minutes
                    this.startBreak()
                }
            })
        } else {
            //set 'break' to true in state
            this.setState({
                break: !this.state.break,
                modalIsOpen: !this.state.modalIsOpen,
            }, () => {
                if(this.state.break) {
                    //set the modal to toggle off in 5 minutes
                    this.startBreak()
                }
            })
            } 
        
        
    };

    //Rendering functions
    renderCheckboxPrompt() {
        if(this.state.checkboxPrompt) {
            return <CheckboxPrompt
                        promptCheck={this.promptCheck}
                        handleModalToggle={this.handleModalToggle}
                   ></CheckboxPrompt>
        } 
    };

    //Increment the number of sets, reset the count of intervals and checks for this set
    newSet() {
        console.log('%cThis is a new set!', 'color: DeepSkyBlue; font-size: 20px')
        this.setState({
            set: ++this.state.set,
            intervals: 0,
            checks: 0,
        }, () => {console.log('here we have it, state when a new set begins: ', this.state)})

    }
    

    render() {
        return(
            <div className="home-page">
                <img onClick={(e) => this.handleMenuToggle(e)} className={this.state.menuIsOpen ? "toggle-btn open" : "toggle-btn"} src={CancelCircle}></img>
                <Sidebar 
                    handleCheck={(e) => this.handleCheck(e)}
                    menuIsOpen={this.state.menuIsOpen}
                    task={this.state.task}
                >
                </Sidebar>         
                {this.state.checkboxPrompt ? this.renderCheckboxPrompt() : null}       
                <Tomato></Tomato>
                <Timer

                    interval={this.timerID}
                    running={this.state.running}
                    startTimer={(e) => this.startTimer(e)}
                    stopTimer={(e) => this.stopTimer(e)}
                    timeLeft={this.state.timeLeft}
                ></Timer>
                <Reset
                    
                    resetClock={(e) => this.resetClock(e)}
                ></Reset>
                <Modal
                    timeLeft={this.state.timeLeft}
                    checkboxPrompt={this.state.checkboxPrompt}
                    break={this.state.break}
                    longBreak={this.state.longBreak}
                    toggleTask={this.state.toggleTask}
                    pickATask={this.state.pickATask}
                    task={this.state.task} 
                    setTask={(e) => this.setTask(e)}
                    handleTaskSubmit={(e) => this.handleTaskSubmit(e)}
                    handleMenuToggle={(e) => this.handleMenuToggle(e)}
                    handleModalToggle={(e) => this.handleModalToggle(e)} 
                    modalIsOpen={this.state.modalIsOpen}>
                </Modal>
                <audio  src={this.state.audio.playing ? this.state.audio.src : null} 
                        type="audio/mp3" 
                        controls 
                        autoPlay
                        style={{
                            display: `none`,
                        }}
                >
                </audio>
            </div>
        )
    }
    

}

export default Home