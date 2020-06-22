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
    };

    handleMenuToggle(e) {
        console.log('handle menu toggle has been clicked!')
        this.setState({
            menuIsOpen: !this.state.menuIsOpen,
        })
    };


    render() {
        return(
            <div className="home-page">
                <img onClick={(e) => this.handleMenuToggle(e)} className={this.state.menuIsOpen ? "toggle-btn open" : "toggle-btn"} src={CancelCircle}></img>
                <Sidebar menuIsOpen={this.state.menuIsOpen}></Sidebar>
                <Tomato></Tomato>
                <Timer></Timer>
                <Reset></Reset>
                <Modal></Modal>

    
            </div>
        )
    }
    

}

export default Home