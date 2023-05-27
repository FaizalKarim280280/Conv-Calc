import React from 'react'
import Workspace from './Workspace'

export default function Home() {
    return (
        <>
            <div style={{"backgroundColor" : "#f8f8f8"}}>

                <div className="container container-fluid rounded-4 px-5 py-2 shadow-3 bg-light">

                    <h2 className='display-4 mt-5 fw-bold'>Convolution Shape Calculator</h2>
                    <h5 className='fw-normal'>Making Sense of Shape Chaos</h5>
                    <hr />

                    <Workspace />

                </div>
            </div>

        </>
    )
}
