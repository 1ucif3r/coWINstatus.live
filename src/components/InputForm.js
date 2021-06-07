import React, { useState, useEffect } from 'react'
import AsyncSelect from 'react-select/async'
import Select from 'react-select'

const axios = require('axios').default
const optionsData = require('../data/data.js')

async function getStateData() {
    try {
        const response = await axios.get(
            `${optionsData.defaultParams.baseUrl}${optionsData.defaultParams.metadataBase}states`
        );
        const stateData = response.data.states;
        const responseArray = stateData.map(obj => ({ label: obj.state_name, value: obj.state_id }))
        return responseArray;
    } catch (error) {
        return error.response;
    }
}

async function getDistrictData(stateSelection) {
    try {
        const response = await axios.get(
            `${optionsData.defaultParams.baseUrl}${optionsData.defaultParams.metadataBase}${optionsData.defaultParams.metaDistrictBase}${stateSelection}`
        )
        const districtData = response.data.districts;
        const responseArray = districtData.map(obj => ({ label: obj.district_name, value: obj.district_id }))
        return responseArray
    } catch (error) {
        return error.response
    }
}

export default function InputForm({ getFormState }) {


    const [isLoadingState, setIsLoadingState] = useState(true)
    const [isLoadingDist, setIsLoadingDist] = useState(true)

    const [defaultStateData, setDefaultStates] = useState([]);
    const [selectedState, setSelectedState] = useState(false);

    const [defaultDistrictData, setDefaultDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(false);

    const [submitState, setSubmitState] = useState(false);
    
    const [selectedDate, setSelectedDate] = useState(null);
    const [resetState, setResetState] = useState(false);

    useEffect(() => {

        getStateData().then((res) => {
            setDefaultStates(res);
            setIsLoadingState(false);
        })

        if(selectedState !== false) {
            getDistrictData(selectedState.value).then((res) => {
                setDefaultDistricts(res);
                setIsLoadingDist(false);
            })
        }

        if(resetState) {
            setSelectedState(false);
            setSelectedDistrict(false);
            setSelectedDate(null);
            setSubmitState(false);
            setResetState(false);
        }

    }, [selectedState, resetState])

    return (
        <div className='w-full'>
            <div className='bg-white shadow-xl rounded-lg w-full lg:w-4/5 p-5'>
                <div className='font-head text-2xl text-black font-semibold mb-5'>
                    Enter region details
                </div>
                <div className=''>
                    <AsyncSelect
                        placeholder="Select a state"
                        value={resetState ? null : selectedState}
                        defaultOptions={defaultStateData}
                        isSearchable={false}
                        // loadOptions={loadStateCallback}
                        isLoading={isLoadingState}
                        className='w-full'
                        onChange={(value) => {setSelectedState(value)}}
                        isDisabled={submitState}
                    />
                    <AsyncSelect 
                        placeholder="Select a district"
                        value={resetState ? null : selectedDistrict}
                        defaultOptions={defaultDistrictData}
                        isSearchable={false}
                        // loadOptions={loadDistrictCallback}
                        isLoading={isLoadingDist && selectedState !== false}
                        className='w-full mt-5'
                        isDisabled={!selectedState || submitState}
                        onChange={(value) => {setSelectedDistrict(value)}}
                    />
                </div>
                <div className='font-head text-lg text-black font-semibold mt-5 flex flex-row items-center'>
                    <div>View status for</div>
                </div>
                <div className='mt-2'>
                    <Select
                        placeholder="Day"
                        options={optionsData.dateOptions}
                        isDisabled={selectedDate !== null}
                        onChange={(value) => {setSelectedDate(value.value)}}
                        className='w-1/2'
                        value={selectedDate === null ? null : undefined}
                    />
                    <button onClick={() => {setSelectedDate(null)}} className='font-heads text-xs focus:outline-none text-gray-400 '>
                        clear day
                    </button>
                </div>
                <div className='mt-4 flex flex-row w-full'>
                    <div className='flex flex-row w-full'>
                        <button
                            isDisabled={submitState || !selectedState || !selectedDistrict || !selectedDate} 
                            onClick={() => {getFormState(selectedState, selectedDistrict, `${selectedDate}`, true, setSubmitState(true))}}
                            className={`px-1 lg:px-3 py-2 focus:outline-none border border-gray-300 hover:bg-violet-200 group rounded-md shadow-md font-heads font-semibold w-1/2 lg:w-1/3
                                ${submitState || !selectedState || !selectedDistrict || !selectedDate ? 'opacity-70 pointer-events-none' : ''}`}
                        >
                            <div className='text-opacity-70 text-xs md:text-sm 2xl:text-base group-hover:text-violet-500 text-black'>Get status</div>
                        </button>
                        <button
                            isDisabled={submitState !== null} 
                            onClick={() => {getFormState(false, false, null, false, false, setResetState(true))}}
                            className={`px-3 py-2 focus:outline-none border border-gray-300 hover:bg-violet-200 group rounded-md shadow-md font-heads font-semibold w-1/2 lg:w-1/3 ml-1 md:ml-3
                                ${!submitState ? 'opacity-70 pointer-events-none' : ''}`}
                        >
                            <div className='text-opacity-70 text-xs md:text-sm 2xl:text-base group-hover:text-violet-500 text-black'>Reset form</div>
                        </button>
                    </div>
                    <div className='w-1/4 hidden lg:flex lg:flex-row justify-end items-center'>
                        <span className="flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-3 w-3 bg-purple-400 opacity-75" style={{ borderRadius: '50%' }}></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                        </span>
                        <div className='font-head text-base opacity-80 ml-2 font-semibold'>Live</div>
                    </div>
                </div>
            </div>
        </div>
    )
}