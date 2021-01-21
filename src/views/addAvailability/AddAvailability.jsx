import React from 'react'
import {useSelector} from "react-redux";
import Unauthorized from '../Unauthorized/Unauthorized';
function AddAvailability() {
    const auth = useSelector(state => state.auth)
    return (
        <div>
            {auth.idToken?
            <h1>Blah</h1>
            :
            <Unauthorized/>
            }
        </div>
    )
}

export default AddAvailability
