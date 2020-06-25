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
        timeElapsed: {
            hours: 0,
            minutes: 0,
            seconds: 0,
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
    
    //  resetClock() {
    //     timeElapsed = {
    //         hours: 0,
    //         minutes: 0,
    //         seconds: 0,
    //     }
    //     // for(let key in timeElapsed) {
    //     //     timeElapsed[key] = 0;
    //     // }
    //     console.log(timeElapsed)
    // }
    
    //  formatTime() {
    //     //should take time elapsed timeElapsed and format it as a string
    //     //mm:ss
    
    //     let minutes = ''
    //     let seconds = ''
    
    //     minutes = timeElapsed.minutes + ''
    //     seconds = timeElapsed.seconds + ''
        
    //     if(minutes.length < 2) {
    //         minutes = '0' + minutes
    //     }
    //     if(seconds.length < 2) {
    //         seconds = '0' + seconds
    //     }
    
    //     return minutes + ':' + seconds
    
        
    // }
    
    
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
                <img onClick={(e) => this.handleMenuToggle(e)} className={this.state.menuIsOpen ? "toggle-btn open" : "toggle-btn"} src={CancelCircle}></img>
                <Sidebar 
                    menuIsOpen={this.state.menuIsOpen}
                    task={this.state.task}
                >

                </Sidebar>
                <Tomato></Tomato>
                <Timer></Timer>
                <Reset></Reset>
                <Modal 
                    setTask={(e) => this.setTask(e)}
                    handleTaskSubmit={(e) => this.handleTaskSubmit(e)}
                    handleModalToggle={(e) => this.handleModalToggle(e)} 
                    modalIsOpen={this.state.modalIsOpen}>

                </Modal>

    
            </div>
        )
    }
    

}

export default Home