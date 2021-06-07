import React from 'react'

export default function Footer() {
    return (
        <div className='w-full'>
            <div className='flex flex-col w-full'>
                <div className='flex flex-row w-full'>
                    <div className='flex flex-row w-1/2 justify-start'>
                        <div className='text-black text-base font-heads'>
                            Made with 💜 by <a href="https://www.instagram.com/th3_1ucif3r/" className='hover:text-violet-500 hover:underline'>Hritik </a>&<a href="https://www.instagram.com/thearijit016/" className='hover:text-violet-500 hover:underline'> Arijit</a>
                        </div>
                    </div>
                    <div className='flex flex-row w-1/2 justify-end'>
                        <div className='text-gray-400 font-heads text-base'>
                            <a href="https://github.com/coWIN-Status/coWIN-Status.github.io/blob/main/LICENSE" target='_blank'>MIT License</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}