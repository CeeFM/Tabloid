import React, { useEffect, useState } from "react";
import { UserProfile } from "./UserProfile";
import { getallprofiles } from "../../Managers/UserProfileManager";

export const UserProfileList = () => {
    const [profiles, setProfiles] = useState([]);

    const getuserprofiles = () => {
        getallprofiles().then((theseprofiles) => setProfiles(theseprofiles));
    }

    useEffect(() => {
        getuserprofiles();
        }, []);

    return (
        <div className="container">
          <h2 className="row justify-content-center">User Profiles</h2>
        <div className="row justify-content-center">
          <div className="cards-column">
            {console.log(profiles)}
            {profiles.map((profile) => (
              <UserProfile key={profile.id} profile={profile} />
            ))}
          </div>
        </div>
      </div>
    )
};

export default UserProfileList