import React, { useEffect, useState } from "react";
import { UserProfile } from "./UserProfile";
import { getallprofiles, getprofilebyid } from "../Managers/UserProfileManager";
import { Link, useParams } from "react-router-dom";
import { Card, CardImg } from "reactstrap";

export const UserProfileDetails = () => {
    const [profile, setProfile] = useState([]);
    const { id } = useParams();

    const getuserprofile = () => {
        getprofilebyid(id).then((thisprofile) => setProfile(thisprofile));
    }

    useEffect(() => {
        getuserprofile();
        }, []);

    return (
      <>
      <Card>
      <Link to={`/users/`}><button className="btn btn-primary">Back to User Profile List</button></Link>  
      <div className="row justify-content-center">
      <CardImg className="image" top src={profile.imageLocation} alt={profile.displayName} />
      </div>
      <br />
        <p className="row justify-content-center">
          User Full Name: <strong className="row justify-content-center">{profile.firstName} {profile.lastName}</strong>
        </p>
        <p className="row justify-content-center">User Display Name: <i className="row justify-content-center">{profile.displayName}</i></p>
        <div className="row justify-content-center">
           User Type: <strong className="row justify-content-center">{profile?.userType?.name}</strong>
        </div>
        <br />
        <div className="row justify-content-center">
          Email:<i className="row justify-content-center">{profile.email}</i>
        </div>
        <br />
        <div className="row justify-content-center">
           User Created On <strong className="row justify-content-center">{profile.createDateTime}</strong>
        </div>
        <br />
      </Card>
      </>
    )
};

export default UserProfileDetails