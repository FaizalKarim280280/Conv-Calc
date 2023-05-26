import React, { useEffect } from 'react';


const MathJaxWrapper = ({ mathExpression }) => {
    useEffect(() => {
        window.MathJax.typesetPromise();
    }, [mathExpression]);

    return <div>{mathExpression}</div>;
};

export default MathJaxWrapper;
