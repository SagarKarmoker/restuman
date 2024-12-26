import React from 'react'
import BannerSection from '../components/Home/Banner'
import TopFoodsSection from '../components/Home/TopFood'
import ExtraSections from '../components/Home/ExtraSections'

export default function Home() {
    return (
        <div className='container mx-auto px-5 mt-10'>
            <BannerSection />
            <TopFoodsSection />
            <ExtraSections />
        </div>
    )
}
