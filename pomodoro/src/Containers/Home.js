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
        countDown: null,
        counter: 0,
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
        // console.log('this is the event target value: ', e.target.value, '\n setTask was called')

        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
        }, 
            () => console.log(this.state.task)
        );

    };

    decrementSeconds() {
        console.log('decrement Seconds called!')
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
    // RIGHT NOW I AM TRYING TO START A COUNTER THAT INCREMENTS EVERY SECOND ON BUTTON PRESS
    // AM GETTING OBJECT IS NOT EXTENSIBLE ERROR

    tick() {
        console.log('tick! tock!')

        this.setState({
            counter: this.state.counter + 1,
        })
    }

    startTimer() {
        console.log('AND THEY ARE OFF!');
        this.timerID = setInterval(() => {return this.tick()}, 1000)
        
    };

    stopTimer() {
        console.log('timer stopping!')
        clearInterval(this.timerID)
        
    };

    
    resetClock(e) {

        console.log(`%cRESETTING!`)

         e.preventDefault()

         this.setState({
            ...this.state,
            timeLeft: {
                hours: 0,
                minutes: 25,
                seconds: 0,
            }
         })
         
    }
    

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
                <h1 onClick={(e) => this.tick(e)} style={{ margin: `0 auto`, color: `tomato`,}}>Counter: {this.state.counter}</h1>
                
                <Tomato></Tomato>
                <Timer
                    startTimer={(e) => this.startTimer(e)}
                    stopTimer={this.stopTimer}
                    interval={this.state.interval}
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

    
            </div>
        )
    }
    

}

export default Home