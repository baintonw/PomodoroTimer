import React from 'react';
import tomato from '../assets/tomato.svg';

//Components
import Tomato from '../Components/Tomato'
import Timer from '../Components/Timer'
import Reset from '../Components/Reset'

//Containers
import Sidebar from '../Containers/Sidebar'
import Modal from '../Containers/Modal'



//styles
import './home.scss'


//svgs
import CancelCircle from '../assets/cancel-circle.svg'



class Home extends React.Component {

    state = {
        menuIsOpen: false,
        modalIsOpen: true,
        task: null,
        timeLeft: {
            hours: 0,
            minutes: 25,
            seconds: 5,
        },
    };

    //Handling functions
    handleMenuToggle(e) {
        console.log('handle menu toggle has been clicked!')
        this.setState({
            menuIsOpen: !this.state.menuIsOpen,
        })
    };

    handleModalToggle(e) {
        console.log('modal is closing!')
        this.setState({
            modalIsOpen: !this.state.modalIsOpen,
        })
    };



    //handle change for task
    handleTaskSubmit(e) {
        e.preventDefault();
        this.setState({
            modalIsOpen: false,
        }, () => console.log(this.state));
    };

    //set task in state
    setTask(e) {
        // console.log('this is the event target value: ', e.target.value, '\n setTask was called')

        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
        }, 
            () => console.log(this.state.task)
        );

    };



    ///////////////////////////////
    //Timing functions

    //  checkTime() {
    //     if(timeElapsed.minutes >= 25 && timeElapsed.seconds === 0) {
    //         timesUp();
    //     }       
    // }
    
    //  checkInterval() {
    //     if(period === 3) {
    //         period = 0;
    //         // alert('big break time!');
    //         modalBox.style.display = 'none'
    //         longBreakModalBox.style.display = 'block'
    
    //         modal.classList.toggle('closed')
    //     }
    //     ++period;
    //     return period;
    // }
    
    //  timesUp() {
    //         stopTimer(timeElapsed)
    //         checkInterval();
    //         audio.play();
    //         menu.classList.toggle('open')
    
    //         //next have a modal drop down that provides instructions
    // }
    
    //  incrementMinutes() {
    //     timeElapsed.minutes++
    //     checkTime();    
    // }
    
    
    //  incrementSeconds() {
    //     timeElapsed.seconds++;
    //     if(timeElapsed.seconds === 60) {
    //         timeElapsed.seconds = 0;
    //         incrementMinutes(timeElapsed)
    //     }
    
    //     console.log(`${timeElapsed.minutes}: ${timeElapsed.seconds}`)
    // }

        decrementSeconds() {
            let { timeLeft } = this.state
            let { seconds, minutes } = timeLeft;
            console.log('timeLeft: ', timeLeft, 'seconds, minutes: ', seconds, minutes)

            if(seconds > 0) {

                this.setState({
                    // ...this.state,
                    timeLeft: {
                        ...this.state.timeLeft,
                        seconds: --seconds,
                    }

                }, () => console.log(this.state.timeLeft))

            } else if(seconds === 0) {
                this.decrementMinutes();

                this.setState({
                    timeLeft: {
                        ...this.state.timeLeft,
                        seconds: 59,
                    }

                });
            };
            
        };

        decrementMinutes() {
            console.log('decrementing minutes!')
            let { timeLeft } = this.state;

            this.setState({
                ...this.state,

                timeLeft: {
                    minutes: --this.state.timeLeft.minutes,  
                }

            }, () => console.log('timeLeft: ', timeLeft, 'minutes: ', this.state.timeLeft.minutes))
            
        };
    
     resetClock() {
        this.state.timeLeft = {
            hours: 0,
            minutes: 25,
            seconds: 0,
        }
        for(let key in this.state.timeLeft) {
            this.state.timeLeft[key] = 0;
        }
        console.log(this.state.timeLeft)
    }
    
    //  displayTime() {
    //     if(interval) {
    //         incrementSeconds();
    //     }
    //     timer.innerText = formatTime();
    
    // }
    
    //  startTimer() {
    
    //     if(!interval) {
    //         interval = setInterval(displayTime, 1000); 
    //     } else {
    //         stopTimer()
    //     }
    // }
    
    //  stopTimer() {
    //     // resetClock(timeElapsed)
    
    //     clearInterval(interval);
    //     interval = null;
    // }
    
    //  reset() {
    //     stopTimer();
    //     resetClock();
    //     displayTime();
    // }

    

    testFunc() {
        console.log('this is a test function')
    };
    


    render() {
        return(
            <div className="home-page">
                <button onClick={() => this.decrementSeconds()}>This button is a test button for functions</button>
                <img onClick={(e) => this.handleMenuToggle(e)} className={this.state.menuIsOpen ? "toggle-btn open" : "toggle-btn"} src={CancelCircle}></img>
                <Sidebar 
                    menuIsOpen={this.state.menuIsOpen}
                    task={this.state.task}
                >

                </Sidebar>
                <Tomato></Tomato>
                <Timer
                    timeLeft={this.state.timeLeft}
                ></Timer>
                <Reset></Reset>
                <Modal 

                    setTask={(e) => this.setTask(e)}
                    handleTaskSubmit={(e) => this.handleTaskSubmit(e)}
                    handleMenuToggle={(e) => this.handleMenuToggle(e)}
                    handleModalToggle={(e) => this.handleModalToggle(e)} 
                    modalIsOpen={this.state.modalIsOpen}>

                </Modal>

    
            </div>
        )
    }
    

}

export default Home