import React from 'react';
import {useHistory} from 'react-router-dom'

const Logout = () => {
    const history = useHistory()
    return (
        <div>
       { localStorage.clear(),
        history.push("/")
        }

        {/* {console.log("Hi")} */}
        </div>
    );
}

export default Logout;
