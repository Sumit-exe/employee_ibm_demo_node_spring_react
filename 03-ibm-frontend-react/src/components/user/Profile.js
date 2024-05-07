import React, { useState } from "react";
import { useSelector } from "react-redux";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
    const userData = useSelector((state) => state.user.loggedInUser);
    const [updateState, setUpdateState] = useState(false);
    return (
        <>
            <h1 className="text-center">User Profile</h1>

            {userData && (
                <div className="d-flex gap-4 mb-5 mt-5 align-items-center ms-5 fs-4">
                    {userData.avatar && <img width={'300px'} src={userData.avatar} alt="Avatar" className="rounded m-5" />}
                    <div >
                        <p className="fo-xl">Username: {userData.username}</p>
                        <p>Fist name: {userData.firstName}</p>
                        <p>Last Name: {userData.lastName}</p>
                        <p>Phone: {userData.phone}</p>
                        <p>Email: {userData.email}</p>
                        <div>
                            <button className="btn border border-2 p-2 rounded" onClick={()=>setUpdateState(!updateState)}>{!updateState ? "Update" : "Close"}</button>
                            {/* <button onClick={()=>setUpdateState(false)}>Save</button> */}
                        </div>
                    </div>
                </div>
            )}

        {updateState && <UpdateProfile />}
        </>
    );
};

export default Profile;
