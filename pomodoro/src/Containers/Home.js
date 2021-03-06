import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import tomato from '../assets/tomato.svg'

import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

//Components
import Tomato from '../Components/Tomato'
import Timer from '../Components/Timer'
import Reset from '../Components/Reset'
import Audio from '../Components/Audio'
import Timesheet from '../Components/Timesheet'
import Set from '../Components/Set'

import CheckboxPrompt from '../Components/CheckboxPrompt'

import WelcomeModalContent from '../Components/WelcomeModalContent'

//Containers
import Sidebar from '../Containers/Sidebar'
import Modal from '../Containers/Modal'


//Audio
import doorbell from '../assets/audio/doorbell.mp3'


//styles
import './home.scss'


//svgs
import CancelCircle from '../assets/cancel-circle.svg'



class Home extends Component {

    state = {
        user: 'Will',
        task: '',
        allTasks: [],
        session: {
            user: 'Will',
            //I need a first set hard-coded for now
            sets: [
                {
                    number: 1,
                    intervals: [
                        
                    ]
                },
            ]
        },
        clockedIn: false,
        workDay: {
            clockIn: null,
            clockOut: null,
        },
        pickATask: true,
        menuIsOpen: false,
        modalIsOpen: true,
        
        timeLeft: {
            hours: 0,
            minutes: 0,
            seconds: 1,
        },
        set: 0,
        intervals: 0,
        totalIntervals: 0,
        checks: 0,
        checkboxPrompt: false,
        changeTaskPrompt: false,
        countDown: null,
        break: false,
        longBreak: false,
        audio: {
            playing: false,
        },
    };

    //Lifecycle Functions
    componentDidMount() {
        console.clear();
    }

    /*  Handling functions  */

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

    //handle submission to all  s
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
    
    //Clear all checkboxes
    clearChecks() {
        const checkboxes = document.querySelectorAll('.checkbox-container__checkbox');
        checkboxes.forEach(checkbox => {
            if(checkbox.checked) {
                checkbox.checked = false
            }
        })
    }

    //set single task in state
    setTask(e) {
        e.preventDefault();
        if(!this.state.workDay.clockIn) {
            this.clockIn();
        }
        this.setState({
            [e.target.name]: e.currentTarget.value,
        }, ()=> {console.log('Task is set, here is state: ', this.state)});
    };

    /* CLOCK FUNCTIONS */

    //Decrease clock by minutes or seconds depending on state
    count() {
        let { hours, minutes, seconds } = this.state.timeLeft;
        if(minutes === 0 && seconds === 0) {
            this.timesUp();
            return
        } else if(seconds > 0) {
            this.decrementSeconds();
            return
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
     
    //Decreases seconds in state by one
    decrementSeconds() {
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
            
            timeLeft: {
                ...this.state.timeLeft,
                minutes: --this.state.timeLeft.minutes,  
            }
        })
    };

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

    //This triggers when clock reaches 0 (hours, minutes, and seconds)
    timesUp() {
        this.playSound();
        this.promptCheck();
        this.stopTimer();
        this.incrementIntervals();
        // This is new
        this.addCompletedInterval();

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
                minutes: 0,
                seconds: 1,
            }
         })
         
    };

    /* Media */
    
    //Audio
    playSound() {
        this.setState({
            audio: {
                src: doorbell,
                playing: !this.state.audio.playing
            }
        })
    };

    resetSound() {
        this.setState({
            audio: {
                playing: false,
            }
        })
    }

    //Increments totalIntervals in state
    incrementTotalIntervals() {
        this.setState({
            totalIntervals: ++this.state.totalIntervals
        })
    }

    //render/unmount the 'please check a box!' prompt 
    promptCheck() {
        this.setState({
            checkboxPrompt: !this.state.checkboxPrompt,
        })
    };

    /* TimeSHEET functions */

    formatHour(hour) {
        if(hour > 12) {
            return hour - 12
        } else {
            return hour
        }
    }

    amOrPMString(hour) {
        if(hour >= 12 && hour < 24) {
            return ' AM'
        } else {
            return ' PM'
        }
    }

    formatDateToString(time) {
        const month = (time.getMonth() < 11) ? time.getMonth() + 1 : 12
        const date = time.getDate()
        const hour = this.formatHour(time.getHours())
        const minutes = time.getMinutes()

        const clockInTimeString = `${hour}:${minutes}${this.amOrPMString(hour)}`
        return clockInTimeString
    }

    //Clock In
    clockIn(e) {
        //Desired format --> HH:MM - MM/DD 
        //Therefore I need formatted hours, formatted minutes, months, and the date
        const now = new Date()
        const clockInDateObj = new Date(now.getFullYear(), (now.getMonth() - 1), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds())
        const clockInString = this.formatDateToString(now)
                
        if(!this.state.clockedIn) {
            this.setState({
                clockedIn: true,
                workDay: {
                    ...this.state.workDay,
                    clockIn: clockInDateObj, 
                }
            })
        } else {
            this.setState({
                clockedIn: false,
                workDay: {
                    ...this.state.workDay,
                    clockOut: clockInDateObj, 
                }
            })
        }
    }

    /* Interval and set functions */

    //set timeout for modal to close after set amount of time
    //this function is called in toggleBreak, if break is set to true in state
    startBreak() {
        console.log('starting break!')
        //if break is true, toggle in off in x amount of time, this is the break interval
        const oneSecond = 1000
        //start a five minute break
        const shortBreak = 300000
        //start a twenty five minute break
        const longBreak = 1500000
        // const longBreak = 5000
        if(this.state.break) {
            debugger
            console.log('%cShort break is hitting! Here is state: ', this.state)
            setTimeout(() => this.toggleBreak('short'), oneSecond);
            setTimeout(() => this.startTimer(), oneSecond);

            this.incrementTotalIntervals()
        }
        //this handles most of the transition from an old set into a new set
        if(this.state.longBreak) {
            console.log('%cThis is where we are at LONG BREAK: ', this.state)
            
            debugger           
            setTimeout(() => this.toggleBreak('long'), longBreak);
            this.newSet();
            this.addCompletedSet();
            this.incrementTotalIntervals();

        }
        
    };

    //toggle the 'pick a task' prompt
    toggleTask() {
        this.setState({
            pickATask: !this.state.pickATask
        })
    };

    //increments interval
    // increment the interval COUNTS
    incrementIntervals() {
        if(this.state.intervals > 3) {
            this.setState({
                intervals: 1,
            })
        } else {
            this.setState({
                intervals: ++this.state.intervals,
            })
        }
    }

    //Increment the number of sets, reset the count of intervals and checks for this set
    newSet() {
        this.clearChecks()
        this.setState({
            set: ++this.state.set,
            intervals: 0,
            checks: 0,
        })
    }
        
    //Adds a completed set to completedSets in state
    addCompletedSet() {
        console.log('Now adding completed set...')
        //define the set to be added (currently hard-coded)
        const newSet = {
            user: 'Will',
            intervals: [{
                number: 2,
                start: new Date(),
                end: new Date(),
                task: 'Add a new set'
            }],
        };
        //add that new set to state
        this.setState({
            ...this.state,
            session: {
                ...this.state.session,
                sets: [...this.state.session.sets, newSet],
            }
        }, () => console.log('Current sets: \n', this.state.session.sets))
    }

    //Add completed interval to completedIntervals in state
    addCompletedInterval() {
        console.log('Now adding completed interval...')
        console.log('Current sets: \n', this.state.session.sets)

        //define the new interval to be added
        const newInterval = {
          number: 99,
          task: 'I AM NEW'
        };

        console.log('Completed Interval')


        if (this.state.session.sets[this.state.session.sets.length - 1].intervals.length > 3) {
            console.log('%cAll full up!', 'color: salmon;font-size:30px')
            this.addCompletedSet()
            return
        }


        //copy sets array
        //all sets minus the last set (the current one)
        let setsMinusLastCopy 
        setsMinusLastCopy = this.state.session.sets.slice(0, this.state.session.sets.length - 1);
        
        //create copy of last set in state
        let lastSetCopy; 
        lastSetCopy = this.state.session.sets.slice(-1)[0]

       
        // push newly created interval to intervals array onto the last set
        lastSetCopy.intervals.push(newInterval)

        //add the copy of the last set, with the new interval, to the the other sets
        setsMinusLastCopy.push(lastSetCopy)
        
        //the new set is all of the sets with the new interval
        const newSet = setsMinusLastCopy

        console.log('newLastSet: ', lastSetCopy)

        //add the last set copy back to the (copied) sets array
        this.setState({
            ...this.state,
            session: {
                sets: newSet
                
            }
        }, () => console.log('this.state.session.sets: ', this.state.session.sets))
        
    }



    //handle checkbox checking - triggers break after box is checked
    handleCheck(e) {
        //since the checkbox registers as checked BEFORE the event is passed, checking 
        //if the box has been checked is counter-intuitive
        if(e.currentTarget.checked) {
            this.setState({
                checks: ++this.state.checks,
            }, ()=> console.log('this is how many checks: ', this.state.checks, '\nthis is how many intervals: ', this.state.intervals))
        } else {
            this.setState({
                checks: --this.state.checks,
            }, ()=> console.log('this is how many checks: ', this.state.checks))
        }   
        
        //If the checkbox prompt is out and a box is checked
        if(this.state.checkboxPrompt) {
            debugger
            //reset the clock
            this.resetClock()
            //turn off the prompt
            this.promptCheck()
            //turn on the modal
            this.handleModalToggle()
            //toggle break in state
            if(this.state.intervals === 4 && this.state.checks === 4) {
                debugger
                this.toggleBreak('long')
            } else {
                debugger
                this.toggleBreak('short')
            }
        }
    };

    //set break to true/false and turn the modal on or off
    toggleBreak(length) {
        //long break
        if(length === 'long') {
            debugger
            this.setState({
                longBreak: !this.state.longBreak,
                modalIsOpen: !this.state.modalIsOpen,
            }, () => {
                if(this.state.longBreak) {
                    this.startBreak()
                }
            })
        //short break
        } else if(length === 'short') {
            debugger
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

    /* Rendering functions */

    //Checkbox render
    renderCheckboxPrompt() {
        if(this.state.checkboxPrompt) {
            return <CheckboxPrompt
                        promptCheck={this.promptCheck}
                        handleModalToggle={this.handleModalToggle}
                   >
                   </CheckboxPrompt>
        } 
    };


    //'Would you like to change your task?' render
    renderChangeTaskPrompt() {
            console.clear();
            return (
                <WelcomeModalContent 
                    changeTaskPrompt={this.state.changeTaskPrompt}
                    handleModalToggle={this.handleModalToggle}
                    setTask={this.setTask}
                    handleTaskSubmit={this.handleTaskSubmit}
                    handleMenuToggle={this.handleMenuToggle}               
                >
                </WelcomeModalContent>  
            )
    };

    render() {
        console.log('this.clockIn: ', this.clockIn)

        return(
            <div className="home-page">
                <img onClick={(e) => this.handleMenuToggle(e)} className={this.state.menuIsOpen ? "toggle-btn open" : "toggle-btn"} src={CancelCircle}></img>
                <Sidebar
                    user={this.state.user}
                    formatDateToString={(e) => this.formatDateToString(e)}
                    clockInTime={this.state.workDay.clockIn}
                    clockedIn={this.state.clockedIn}
                    clockIn={(e) => this.clockIn(e)}
                    handleCheck={(e) => this.handleCheck(e)}
                    menuIsOpen={this.state.menuIsOpen}
                    task={this.state.task}
                    set={this.state.set}
                    intervals={this.state.intervals}
                >
                </Sidebar>         
                {this.state.checkboxPrompt ? this.renderCheckboxPrompt() : null} 
                {this.state.changeTaskPrompt ? this.renderChangeTaskPrompt() : null}
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
                >
                </Reset>
                <button onClick={() => this.addCompletedSet()}>Add completed set</button>
                <button onClick={() => this.addCompletedInterval()}>Add completed interval</button>

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
                <audio  onEnded={(e) => this.resetSound(e)} src={this.state.audio.playing ? this.state.audio.src : null} 
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