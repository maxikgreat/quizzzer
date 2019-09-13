import React from 'react'
import classes from './OverError.scss'


const OverError = ({code, message}) => {
    return(
        <div id = "err" className = {classes.OverError}>
            <h3>Error! Code: {code}</h3>
            <hr />
            <span>Something went wrong</span>
            <br />
            <hr />
            <span>Message: {message}</span>
        </div>
    )
}

export default OverError