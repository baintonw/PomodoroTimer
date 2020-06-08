import React from 'react';
import tomato from '../assets/tomato.svg';

//Components
import Tomato from '../Components/Tomato'
import Timer from '../Components/Timer'
import Reset from '../Components/Reset'

//Containers
import Sidebar from '../Containers/Sidebar'



//styles
import './home.scss'

const Home = () => {
    return(
        <div className="home-page">
            <Sidebar></Sidebar>
            <Tomato></Tomato>
            <Timer></Timer>
            <Reset></Reset>

        </div>
    )

}

export default Home