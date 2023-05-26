import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField'
import { useState } from 'react';
import { MathComponent } from "mathjax-react";
import { Slider, Typography } from '@mui/material';

export default function Workspace() {

    const [inputShape, setInputShape] = useState({ 'channels': 3, 'height': 224, 'width': 224 });
    const [kernelShape, setKernelShape] = useState({ 'height': 3, 'width': 3 });
    const [outputShape, setOuputShape] = useState({ 'channels': 128, 'height': 224, 'width': 224 });
    const [parameters, setParameters] = useState({
        'stride': 2, 'padding': 0, 'dilation': 1
    })

    const handleOutputChannelOnChange = (event) => {
        const { name, value } = event.target;
        setOuputShape(prev => ({ ...prev, [name]: value }));

    }

    const handleParametersOnChange = (event) => {
        const { name, value } = event.target;
        setParameters(prev => ({ ...prev, [name]: value }));
    }

    const handleInputOnChange = (event) => {
        const { name, value } = event.target;
        setInputShape(prev => ({ ...prev, [name]: value }));

    }

    const handleKernelOnChange = (event) => {
        const { name, value } = event.target;
        if (name === "height") {
            setKernelShape({ "height": value, "width": value })
        } else {
            setKernelShape(prev => ({ ...prev, [name]: value }));
        }
    }

    const formula1 = 'H_{out} = \\text{floor}\\left(\\frac{{H_{in} + 2 \\times \\text{padding}[0] - \\text{dilation}[0] \\times (\\text{kernel}[0] - 1) - 1}}{{\\text{stride}[0]}} + 1\\right)';

    const formula2 = 'H_{out} = \\text{floor}\\left(\\frac{{H_{in} + 2 \\times \\text{padding}[1] - \\text{dilation}[1] \\times (\\text{kernel}[1] - 1) - 1}}{{\\text{stride}[1]}} + 1\\right)';



    useEffect(() => {

        console.log(inputShape);

        const height = Math.floor(((+inputShape['height'] + 2 * parameters['padding'] - parameters['dilation'] * (kernelShape['height'] - 1) - 1) / parameters['stride']) + 1);

        const width = Math.floor(((+inputShape['width'] + 2 * parameters['padding'] - parameters['dilation'] * (kernelShape['width'] - 1) - 1) / parameters['stride']) + 1);

        setOuputShape({
            'channels': outputShape['channels'],
            'height': height,
            'width': width
        })


    }, [parameters, inputShape, kernelShape])



    return (

        <>

            <div className='row gx-5 p-4 mt-5'>

                <div className="col-md-2">

                    <Typography gutterBottom>Stride : {parameters['stride']}</Typography>
                    <Slider value={parameters['stride']} aria-label="Default" valueLabelDisplay="auto" min={1} max={10} name="stride" onChange={handleParametersOnChange} />
                </div>


                <div className="col-md-2 ms-3">

                    <Typography gutterBottom>Padding : {parameters['padding']}</Typography>
                    <Slider value={parameters['padding']} aria-label="Default" valueLabelDisplay="auto" min={0} max={10} onChange={handleParametersOnChange} name="padding" />
                </div>


                <div className="col-md-2 ms-3">

                    <Typography gutterBottom>Dilation : {parameters['dilation']}</Typography>
                    <Slider value={parameters['dilation']} aria-label="Default" valueLabelDisplay="auto" min={1} max={5} onChange={handleParametersOnChange} name="dilation" />
                </div>


                <div className="col-md-3 ms-3">

                    <Typography gutterBottom>Out Channels : <span className='red-text'>{outputShape['channels']}</span></Typography>
                    <Slider value={outputShape['channels']} aria-label="Default" valueLabelDisplay="auto" min={1} max={1024} onChange={handleOutputChannelOnChange} name="channels" />
                </div>

            </div>

            <hr />


            <div className='d-flex justify-content-between'>

                <div style={{ "width": "20%" }}>

                    <div className="border rounded-4 mt-5 border-success">

                        <div className='d-flex flex-column p-3'>

                            <h6 className='bg-success py-2 px-3 rounded-4 text-light'>Input Shape</h6>
                            {/* <hr className='mt-0' /> */}

                            <div>

                                <TextField className='my-3' id="outlined-basic" label="Channels" variant="outlined" size="small" type='number' style={{ "width": "60%" }} onChange={handleInputOnChange} name="channels" value={inputShape['channels']} />


                                <TextField className='my-3' id="outlined-basic" label="Height" variant="outlined" size="small" type='number' style={{ "width": "60%" }} onChange={handleInputOnChange} name="height" value={inputShape['height']} min="1" />


                                <TextField className='my-3' id="outlined-basic" label="Width" variant="outlined" size="small" type='number'
                                    style={{ "width": "60%" }} onChange={handleInputOnChange} name="width" value={inputShape['width']} />
                            </div>

                        </div>

                    </div>

                    <p className='text-center mt-2 fs-5 fw-bold'>
                        <span className='red-text'> {+inputShape['channels']} </span> x
                        <span className='violet-text'> {+inputShape['height']}</span> x
                        <span className='orange-text'> {+inputShape['width']}</span> </p>

                </div>

                <div className='d-flex align-items-center' style={{ "width": "1%" }}>

                    <p className='display-6 fw-bold'>
                        <i className="fa-sharp fa-solid fa-star-of-life fa-sm"></i>
                    </p>

                </div>



                <div style={{ "width": "15%" }}>
                    <div className='bordered border rounded-4 mt-5 border-danger'>

                        <div className='d-flex flex-column p-3'>

                            <h6 className='px-2 py-2 text-light rounded-4' style={{ "background": "#F06292" }}>Kernel Shape</h6>

                            <TextField className='my-3' id="outlined-basic" label="Height" variant="outlined" size="small" type='number' style={{ "width": "60%" }} onChange={handleKernelOnChange} name="height" value={kernelShape['height']} />


                            <TextField className='my-3' id="outlined-basic" label="Width" variant="outlined" size="small" type='number'
                                style={{ "width": "60%" }} onChange={handleKernelOnChange} name="width" value={kernelShape['width']} />

                        </div>

                    </div>
                    <p className='text-center mt-2 fs-5'>{kernelShape['height']} x {kernelShape['width']}</p>

                </div>


                <div className='d-flex align-items-center' style={{ "width": "1%" }}>

                    <p className='display-5 fw-bold'>
                        <i className="fa-solid fa-equals"></i>
                    </p>
                </div>


                <div style={{ "width": "20%" }}>


                    <div className='d-flex align-items-center flex-column border border-primary rounded-4 mt-5'>


                        <div className='d-flex flex-column p-3'>

                            <h6 className='px-2 py-2 text-light rounded-4' style={{ "background": "#AB47BC" }}>Output Shape</h6>

                            <TextField className='my-3' id="outlined-basic" label="Channels" variant="outlined" size="small" type='number' style={{ "width": "60%" }} name="channels" value={outputShape['channels']} onChange={handleOutputChannelOnChange} />


                            <TextField className='my-3' id="outlined-basic" label="Height" variant="outlined" size="small" type='number' style={{ "width": "60%" }} name="height" value={outputShape['height']} />


                            <TextField className='my-3' id="outlined-basic" label="Width" variant="outlined" size="small" type='number'
                                style={{ "width": "60%" }} name="width" value={outputShape['width']} />

                        </div>

                    </div>

                    <p className='text-center mt-2 fs-5 fw-bold'>
                        <span className='red-text'>{outputShape['channels']}</span> x
                        <span className='violet-text'> {outputShape['height']} </span>x
                        <span className='orange-text'> {outputShape['width']}</span></p>

                </div>

            </div >

            <hr />

            <div className='my-5'>
                <p>Calculated using the formula</p>
                <MathComponent tex={formula1} />
                <MathComponent tex={formula2} />

            </div>

        </>
    )
}
