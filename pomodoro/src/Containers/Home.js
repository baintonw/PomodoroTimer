import React from 'react';
import tomato from '../assets/tomato.svg';

//Components
import Tomato from '../Components/Tomato'

//styles
import './home.scss'

const Home = () => {
    return(
        <div className="home-page">
            <Tomato></Tomato>

        </div>
    )

}

export default Home