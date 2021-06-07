import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Layout from './components/layout/Layout'
import InputForm from './components/InputForm'
import GetSessionData from './components/SessionList'
import Footer from './components/Footer'

import './styles/index.css';
import Hero from './assets/hero'


export default function IndexPage() {

    const [district, setDistrict] = useState(undefined);
    const [date, setDate] = useState(undefined);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSmall, setIsSmall] = useState(undefined);
    const [state, setState] = useState(undefined);

    useEffect(() => {
        setIsSmall(window.innerWidth < 1000);
        const handleResize = () => {
            setIsSmall(window.innerWidth < 1000);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })


    return (
        <div className='bg-violet-50 min-h-screen h-full'>
            <Layout>
                <div className='font-head flex flex-row items-center'>
                    <div className='text-4xl w-1/2'>
                        <span className='font-bold' >coWIN</span><span className='italic'>status</span>
                    </div>
                    <div className='flex flex-row justify-end w-full h-full items-center'>
                        <div className='font-head opacity-80 text-lg'> coWINstatus.live </div>
                    </div>
                </div>
                <div className='mt-10 lg:mt-15 2xl:mt-20 font-heads text-black text-4xl font-bold w-full lg:w-2/3'>
                   Check and get the latest <span className='text-green-400'>appointment</span> data for <span className='text-violet-400'>vaccination</span> centers near you.
                </div>
                <div className='flex flex-col items-center justify-center max-w-full h-2/3'>
                    <div className={`mt-10 flex flex-col md:flex-row items-start justify-start w-full ${!isSubmitted ? 'lg:mb-15' : ''} 2xl:mb-0`}>
                        <div className={`${!isSmall ? 'w-2/3' : 'w-full'}`}>
                            <InputForm getFormState = {(state, district, date, isSubmitted, setData, setReset) => {
                                setState(state)
                                setDistrict(district)
                                setDate(date)
                                setIsSubmitted(isSubmitted)
                            }}/>
                        </div>
                        {!isSmall ? <Hero /> : null}
                    </div>
                </div>
                <div className='mt-8 lg:mt-12 xl:mt-16'>
                    {
                        isSubmitted ? (
                            <GetSessionData state={state} district={district} date={`${date}`}/>
                        ) : (
                            null
                        )
                    }
                </div>
                <div className='h-full items-end py-10'>
                    <Footer />
                </div>
            </Layout>
        </div>
    )
}

ReactDOM.render(<IndexPage />, document.getElementById('root'));

