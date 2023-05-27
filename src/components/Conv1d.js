import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField'
import { useState } from 'react';
import { MathComponent } from "mathjax-react";
import { Slider, Typography, Checkbox, FormControlLabel, Box, Link} from '@mui/material';

export default function Conv1d() {
    const [inputShape, setInputShape] = useState({ 'channels': 3, 'length': 224});
    const [kernelShape, setKernelShape] = useState({ 'length': 3});
    const [outputShape, setOuputShape] = useState({ 'channels': 128, 'length': 224});
    const [parameters, setParameters] = useState({
        'stride': 2, 'padding': 0, 'dilation': 1
    })

    const [totalParameters, setTotalParameters] = useState(0);
    const [bias, setBias] = useState(true);

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
        setKernelShape(prev => ({ ...prev, [name]: value }));
        
    }

    const handleBiasOnChange = () => {
        setBias(!bias);
    }

    const formula1 = 'L_{out} = \\text{floor}\\left(\\frac{{L_{in} + 2 \\times \\text{padding} - \\text{dilation} \\times (\\text{kernel} - 1) - 1}}{{\\text{stride}}} + 1\\right)';


    useEffect(() => {

        const length = Math.floor(((+inputShape['length'] + 2 * parameters['padding'] - parameters['dilation'] * (kernelShape['length'] - 1) - 1) / parameters['stride']) + 1);

        setOuputShape({
            'channels': outputShape['channels'],
            'length': length,
        })

        const p = +(kernelShape['length']  * inputShape['channels'] * outputShape['channels'])
            + (bias ? +outputShape['channels'] : 0);

        setTotalParameters(p);


    }, [parameters, inputShape, kernelShape, outputShape, bias])



    return (

        <>

            <div className='p-4 mt-3'>
                <h2 className='display-6'>Conv 1D</h2>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'evenly',
                        typography: 'body1',
                        '& > :not(style) + :not(style)': {
                            ml: 2,
                        },
                    }}>

                    <Link href="https://pytorch.org/docs/stable/generated/torch.nn.Conv1d.html" underline="hover" target='_blank_'>[PyTorch]</Link>

                    <Link href="https://www.tensorflow.org/api_docs/python/tf/keras/layers/Conv1D" underline="hover" target='_blank_'>[TensorFlow]</Link>
                </Box>

            </div>

            <div className='row gx-5 p-4 mt-3'>

                {/* <p className='fw-bold'>Parameters</p> */}
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


                                <TextField className='my-3' id="outlined-basic" label="Length" variant="outlined" size="small" type='number' style={{ "width": "60%" }} onChange={handleInputOnChange} name="length" value={inputShape['length']} min="1" />


                            </div>

                        </div>

                    </div>

                    <p className='text-center mt-2 fs-5 fw-bold'>
                        <span className='red-text'> {+inputShape['channels']} </span> x
                        <span className='violet-text'> {+inputShape['length']}</span> </p>

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

                            <TextField className='my-3' id="outlined-basic" label="Length" variant="outlined" size="small" type='number' style={{ "width": "60%" }} onChange={handleKernelOnChange} name="length" value={kernelShape['length']} />

                        </div>

                    </div>
                    <p className='text-center mt-2 fs-5'>{kernelShape['length']}</p>

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


                            <TextField className='my-3' id="outlined-basic" label="Length" variant="outlined" size="small" type='number' style={{ "width": "60%" }} name="length" value={outputShape['length']} disabled />

                        </div>

                    </div>

                    <p className='text-center mt-2 fs-5 fw-bold'>
                        <span className='red-text'>{outputShape['channels']}</span> x
                        <span className='violet-text'> {outputShape['length']} </span></p>

                </div>

            </div >

            <div className='mt-4'>
                No of Parameters: <span className='badge badge-primary rounded-4 fs-5'>{totalParameters}</span>
                <FormControlLabel className="ms-3" control={<Checkbox checked={bias} onChange={handleBiasOnChange} />} label="Include Bias?" />
            </div>

            <hr />

            <div className='my-5'>
                <p>Calculated using the formula</p>
                <MathComponent tex={formula1} />

            </div>

        </>
    )
}
