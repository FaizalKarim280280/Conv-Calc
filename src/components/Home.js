import React from 'react'
import Workspace from './Workspace'

export default function Home() {
    return (
        <>
            <div className="container container-fluid">

                <h2 className='display-4 mt-5 fw-bold'>Convolution Shape Calculator</h2>
                <h5 className='fw-normal'>Making Sense of Shape Chaos</h5>
                <hr/>

                <Workspace/>

            </div>

        </>
    )
}
