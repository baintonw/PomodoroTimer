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
        task: '',
        timeLeft: {
            hours: 0,
            minutes: 25,
            seconds: 5,
        },
        running: false,
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

    count() {
        let { hours, minutes, seconds } = this.state.timeLeft;
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

    
            </div>
        )
    }
    

}

export default Home