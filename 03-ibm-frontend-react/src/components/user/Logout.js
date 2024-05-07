import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { userLogout } from '../../redux/UserSlice';
import { useState } from "react";

const Logout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [afterLogout, setAfterLogout] = useState('');

    const logoutSubmit = () => {
        console.log('logoutSubmit');
        setAfterLogout(`You've logged out successfully!`);
        setTimeout(() => {
            dispatch(userLogout());
            navigate('/login');
        }, 2000);

    };

    return (
        <div className="w-100 d-flex flex-column align-items-center gap-5">
            <h1 className="text-center">Logout</h1>
            <button className="btn border border-2 border-danger text-danger mx-auto" onClick={logoutSubmit} >Logout</button>
            {afterLogout && <p>{afterLogout}</p>}
        </ div>
    );
};

export default Logout;


