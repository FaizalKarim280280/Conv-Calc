import React from 'react'
import Conv2d from './Conv2d'
import { Tabs, Tab } from '@mui/material'
import ConvTranspose2d from './ConvTranspose2d';
import Conv1d from './Conv1d';
import ConvTranspose1d from './ConvTranspose1d';

export default function Home() {

    const [value, setValue] = React.useState("conv2d");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div style={{ "backgroundColor": "#f8f8f8" }}>

                <div className="container container-fluid rounded-4 px-5 py-2 shadow-3 bg-light">

                    <h2 className='display-4 mt-5 fw-bold'>Convolution Shape Calculator</h2>
                    <h5 className='fw-normal'>Making Sense of Shape Chaos</h5>
                    <hr />

                    <div className='py-1 rounded-4 gradient-1 shadow-5'>

                        <Tabs value={value} onChange={handleChange} centered>
                            <Tab label="Conv 1d" value={"conv1d"} sx={{ mx: 1}} />
                            <Tab label="Conv Transpose 1d" value={"convTranspose1d"} sx={{ mx: 1 }} />
                            <Tab label="Conv 2d" value={"conv2d"} sx={{ mx: 1 }} />
                            <Tab label="Conv Transpose 2d" value={"convTranspose2d"} sx={{ mx: 1 }} />

                        </Tabs>
                    </div>

                    {value === "conv2d" && <Conv2d />}
                    {value === "convTranspose2d" && <ConvTranspose2d />}

                    {value === "conv1d" && <Conv1d/>}
                    {value === "convTranspose1d" && <ConvTranspose1d/>}


                </div>
            </div>

        </>
    )
}
