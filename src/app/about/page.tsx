import React from 'react'
import AboutHero from '@/components/AboutHero'
import CoreServices from '@/components/CoreServices'
import Footer from '@/components/Footer'
import AboutBlueYard from '@/components/AboutBlueYard'
import GetInTouch from '@/components/GetInTouch'

const AboutPage = () => {
  return (
    <div>
        <AboutHero />
        <CoreServices />
        <AboutBlueYard />
        <GetInTouch />
        <Footer />
    </div>
  )
}

export default AboutPage