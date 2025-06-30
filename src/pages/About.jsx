import React from 'react'
import AboutHeroSection from '../components/about/AboutHeroSection';
import OurStory from '../components/about/OurStory';
import WhatWeOffer from '../components/about/WhatWeOffer';
import Mission from '../components/about/Mission';
import Teams from '../components/about/Teams';
import Milestones from '../components/about/Milestones';
import Video from '../components/about/Video';

const About = () => {
    return (
        <>
            <div className='px-0 sm:px-12'>
                <AboutHeroSection />
                <OurStory />
                <WhatWeOffer />
                <Mission />
                <Teams />
                <Milestones />
                <Video />
            </div>
        </>
    )
}

export default About;