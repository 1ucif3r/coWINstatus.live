import React, { useState, useEffect } from 'react'

import LocationSvg from '../assets/icons/location'
import VacSvg from '../assets/icons/vac'
import CashSvg from '../assets/icons/cash'
import AgeSvg from '../assets/icons/age'
import EyeSvg from '../assets/icons/eye'
import LocateSvg from '../assets/icons/locate'
import RedirectSvg from '../assets/icons/redirect'

const axios = require('axios').default;
const optionsData = require('../data/data.js')

async function getSessionDataByDistrict(districtId, date) {
    try {
        const response = await axios.get(
            `${optionsData.defaultParams.baseUrl}${optionsData.defaultParams.appointmentBase}`, {
                params: {
                    district_id: districtId,
                    date: date,
                }
            }
        )
        const districtSessionData = response.data.sessions;
        return districtSessionData;
    } catch (error) {
        return error.response;
    }
}

export default function GetSessionData({ state, district, date }) {

    const queryParams = {
        param_district: district.value,
    }

    const [district_data, set_district_data] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(undefined);

    useEffect(() => {

        setIsMobile(window.innerWidth <= 768);
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        }

        getSessionDataByDistrict(district.value, date).then((res) => {
            set_district_data(res);
            setIsLoading(false);
        })

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
        
    }, [queryParams.param_district, date])

    function titleCase(str) {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
        }
        return str.join(' ');
    }

    if(isLoading) {
        return <div className='font-heads text-2xl lg:text-4xl font-semibold py-10'>Loading Data...</div>
    }

    function renderCenterCardList() {
        return (
            <div className='w-full lg:w-3/5'>
                {
                    'status' in district_data ? (
                        <div>{`Error: ${district_data.status}`}</div>
                    ) : (
                        <div>
                            <div className='font-heads text-2xl lg:text-4xl font-semibold'>{`Centers in ${district.label}, ${state.label}`}</div>
                            {district_data.length === 0 ? <div className='font-heads text-black text-lg mt-5'>Oops, no results found.</div> : null}
                            <div className={`grid grid-cols-1 grid-rows-${Math.floor(district_data.length / 5)} gap-5 mt-7`}>
                            {
                                district_data.map(obj => {
                                    const mapsLink = obj.address.replace(" ", "+");
                                    return (
                                        <div className='w-full border bg-white shadow-xl rounded-lg h-full flex flex-col p-4'>
                                            <div className='grid grid-cols-5'>
                                                <div className='col-span-full lg:col-span-3 flex flex-col h-full lg:border-r lg:border-gray-300 pr-3'>
                                                    <div className='flex flex-row items-center h-full'>
                                                        <div className='ml-2 font-heads text-xl font-semibold opacity-80'>{titleCase(obj.name)}</div>
                                                    </div>
                                                    <div className='flex flex-row items-center h-full mt-3'>
                                                        <div className='flex flex-col items-center h-full' style={{ minWidth: "10%" }}>
                                                            <LocationSvg/>
                                                        </div>
                                                        <div className='ml-2 font-heads text-sm opacity-80'>{obj.address}</div>
                                                    </div>
                                                    <div className='flex flex-row items-center h-full mt-3'>
                                                        <div className='flex flex-col items-center h-full' style={{ minWidth: "10%" }}>
                                                            <VacSvg/>
                                                        </div>
                                                        <div className='ml-2 text-green-500 font-semibold font-heads text-sm opacity-80'>{obj.vaccine}</div>
                                                    </div>
                                                    <div className='flex flex-row items-center h-full mt-3'>
                                                        <div className='flex flex-col items-center h-full' style={{ minWidth: "10%" }}>
                                                            <CashSvg/>
                                                        </div>
                                                        <div className='ml-2 font-heads text-sm opacity-80'>{`${obj.fee === '0' ? 'Free' : `Rs. ${obj.fee}`}`}</div>
                                                    </div>
                                                    <div className='flex flex-row items-center h-full mt-3'>
                                                        <div className='flex flex-col items-center h-full' style={{ minWidth: "10%" }}>
                                                            <AgeSvg/>
                                                        </div>
                                                        <div className='ml-2 font-heads text-red-600 font-semibold text-sm opacity-80'>{`${obj.min_age_limit}+`}</div>
                                                    </div>
                                                </div>
                                                { obj.slots.length !== 0 ? (
                                                    <div className='hidden lg:flex lg:flex-col lg:col-span-2 max-h-full'>
                                                        <div>
                                                            <div className='flex flex-row items-center h-max'>
                                                                <div className='ml-2 font-heads font-semibold text-lg opacity-80 w-full text-center'>Time Slots</div>
                                                            </div>
                                                            <div className='grid grid-cols-2 w-full mt-4'>
                                                                <div className='text-base font-heads opacity-80 font-semibold w-full text-center'>From</div>
                                                                <div className='text-base font-heads opacity-80 font-semibold w-full text-center'>To</div>
                                                                {
                                                                    obj.slots.map(slot => {
                                                                        const splitSlot = slot.split('-');
                                                                        return (
                                                                            <div>
                                                                                <div className='w-full text-center'>{splitSlot[0]}</div>
                                                                                <div className='w-full text-center'>{splitSlot[1]}</div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    ) : (
                                                        <div className='hidden lg:col-span-2 lg:flex lg:flex-col max-h-full items-center justify-center'>
                                                            <div className={`px-2 py-1 text-lg rounded-md ${obj.available_capacity !== 0 ? 'bg-green-300' : 'bg-red-300'}`}>
                                                                {obj.available_capacity !== 0 ? <span className='text-back opacity-80'>Available</span> : <span className='text-back opacity-80'>Booked</span>}
                                                            </div>
                                                            <a href="https://selfregistration.cowin.gov.in/" target="_blank" rel='noreferrer' className={`px-2 py-1 rounded-md bg-gray-200 flex flex-row items-center mt-6 ${obj.available_capacity === 0 ? 'opacity-60 pointer-events-none' : ''}`}>
                                                                <div className='ml-1 font-heads text-black font-semibold text-lg'>Register</div>
                                                            </a>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className='grid grid-cols-5 mt-6 w-full'>
                                                <div className='col-span-3 lg:border-r lg:border-gray-300'>
                                                    <div className='flex flex-row w-full items-center pr-3'>
                                                        <div className='flex flex-row w-full'>
                                                            <button className='px-2 py-1 rounded-md bg-gray-200 flex flex-row items-center'>
                                                                { !isMobile ? <EyeSvg /> : null}
                                                                <div className='ml-1 font-heads text-black font-semibold text-sm'>Watch</div>
                                                            </button>
                                                            <div className='px-2 py-1 rounded-md bg-gray-200 flex flex-row items-center ml-3'>
                                                            { !isMobile ? <LocateSvg /> : null}
                                                                <a href={`https://maps.google.com/maps?q=${mapsLink}`} target="_blank" rel="noreferrer" className='ml-1 font-heads text-black font-semibold text-sm'>Locate</a>
                                                            </div>
                                                            {
                                                                isMobile ? (
                                                                    <div className='flex flex-row items-center'>
                                                                        <div className={`px-2 py-1 ml-3 text-sm rounded-md ${obj.available_capacity !== 0 ? 'bg-green-300' : 'bg-red-300'}`}>
                                                                            {obj.available_capacity !== 0 ? <span className='text-back opacity-80'>Available</span> : <span className='text-back opacity-80'>Booked</span>}
                                                                        </div>
                                                                        {
                                                                            obj.available_capacity !== 0 ? (
                                                                                <div className='ml-5 -mt-1'>
                                                                                    <RedirectSvg/>
                                                                                </div>
                                                                            ) : (
                                                                                null
                                                                            )
                                                                        }
                                                                    </div>
                                                                ) : (
                                                                    null
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                { obj.slots.length !== 0 ? (
                                                        <div className='hidden lg:block lg:col-span-2'>
                                                            <div className='flex flex-row w-full items-center'>
                                                                <div className='flex flex-row w-full items-center justify-start ml-3'>
                                                                    <a href="https://selfregistration.cowin.gov.in/" target="_blank" rel='noreferrer' className={`px-2 py-1 rounded-md bg-gray-200 flex flex-row items-center ml-1 mr-3 ${obj.available_capacity === 0 ? 'opacity-60 pointer-events-none' : ''}`}>
                                                                        <div className='ml-1 font-heads text-black font-semibold text-sm'>Register</div>
                                                                    </a>
                                                                    <div className={`px-2 py-1 text-sm rounded-md ${obj.available_capacity !== 0 ? 'bg-green-300' : 'bg-red-300'}`}>
                                                                        {obj.available_capacity !== 0 ? <span className='text-back opacity-80'>Available</span> : <span className='text-back opacity-80'>Booked</span>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (null)
                                                }
                                            </div>
                                        </div>      
                                    )
                                })
                            }
                            </div>
                        </div>
                    )
                }    
            </div>
        )
    }

    return (
        <div classNam='w-full mb-20'>
            {renderCenterCardList()}
        </div>
    )
}