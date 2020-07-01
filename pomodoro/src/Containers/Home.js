import React from 'react';
import ReactDOM from 'react-dom';
import tomato from '../assets/tomato.svg';

//Components
import Tomato from '../Components/Tomato'
import Timer from '../Components/Timer'
import Reset from '../Components/Reset'
import Audio from '../Components/Audio'

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
        menuIsOpen: false,
        modalIsOpen: true,
        task: '',
        timeLeft: {
            hours: 0,
            minutes: 0,
            seconds: 5,
        },
        running: false,
        countDown: null,
        counter: 0,
        audio: {
            playing: false,
        },

    };

    //LIFECYCLE METHODS

    componentDidMount() {
        console.log('the component has mounted!')
        
    };

    componentWillUnmount() {
        console.log('THE COMPONENT HAS UNMOUNTED')
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
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
        }, 
            () => console.log(this.state.task)
        );
    };
     
    //Decreases seconds in state by one
    decrementSeconds() {
        console.log('decrement Seconds called!')
            let { timeLeft } = this.state
            let { seconds, minutes } = timeLeft;
            this.setState({
                timeLeft: {
                    ...this.state.timeLeft,
                    seconds: this.state.timeLeft.seconds - 1,
                }
            }, () => console.log(this.state.timeLeft.seconds))
            
    };

    decrementMinutes() {
        let { timeLeft } = this.state;
        this.setState({
            ...this.state,
            timeLeft: {
                minutes: --this.state.timeLeft.minutes,  
            }
        }, () => console.log('timeLeft: ', timeLeft, 'minutes: ', this.state.timeLeft.minutes))
    };

    newTask() {
        let newTask = prompt('What are you working on next?', this.state.task);

    };

    timesUp() {
        this.playSound();
        this.stopTimer();

        

    
        // this.setState({
        //     task: 'newTask'
        // }, () => {console.log('this is the new task in state: ', this.state.task)})
    };

    count() {
        let { hours, minutes, seconds } = this.state.timeLeft;
        if(hours === 0 && minutes === 0 && seconds === 0) {
            // this.playSound();
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
    

    startTimer() {
        this.timerID = setInterval(() => {this.count()}, 1000)
        console.log('timerID!', this.timerID)

        this.setState({
            running: true,
        })
        
    };

    stopTimer() {
        clearInterval(this.timerID)        
        this.setState({
            running: false,
        })
    };

    
    resetClock(e) {
         e.preventDefault()
         this.stopTimer();

         this.setState({
            ...this.state,
            timeLeft: {
                hours: 0,
                minutes: 25,
                seconds: 0,
            }
         })
         
    }

    //Audio
    playSound() {
        // e.preventDefault();
        this.setState({
            audio: {
                src: doorbell,
                playing: !this.state.audio.playing
            }
        }, () => {console.log('playing changed in state: ', this.state.audio)})
    }

    testFunc() {
        console.log('this is a test function')
    };
    

    render() {
        console.log(this.state)
        return(
            <div className="home-page">
                <img onClick={(e) => this.handleMenuToggle(e)} className={this.state.menuIsOpen ? "toggle-btn open" : "toggle-btn"} src={CancelCircle}></img>
                <Sidebar 
                    menuIsOpen={this.state.menuIsOpen}
                    task={this.state.task}
                >
                </Sidebar>                
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
                    setTask={(e) => this.setTask(e)}
                    handleTaskSubmit={(e) => this.handleTaskSubmit(e)}
                    handleMenuToggle={(e) => this.handleMenuToggle(e)}
                    handleModalToggle={(e) => this.handleModalToggle(e)} 
                    modalIsOpen={this.state.modalIsOpen}>
                </Modal>
                {/* <div id="audio-div">
                    {this.handleAudio(doorbell)}
                </div> */}
                {/* <Audio playing={true} src={doorbell}></Audio> */}
                <button onClick={() => this.playSound()}>Testing audio!</button>
                <audio src={this.state.audio.playing ? this.state.audio.src : null} type="audio/mp3" controls autoPlay>
                </audio>
            </div>
        )
    }
    

}

export default Home