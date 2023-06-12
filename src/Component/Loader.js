import React from 'react'
import loader from "../assets/images/loader.gif"
const Loader = ({ isLoading }) => {
    return (
        <div>
            {isLoading && <img src={loader} alt="Loading..."></img>}
        </div>
    )
}

export default Loader