import React, { useEffect, useState } from "react";
import { getallprofiles } from "../Managers/UserProfileManager";

export default function UserProfileList() {
    const [profiles, setProfiles] = useState([]);

    const getuserprofiles = () => {
        getallprofiles().then((theseprofiles) => setProfiles(theseprofiles));
    }

    useEffect(() => {
        getuserprofiles();
        }, []);

    return (
        <div className="container">
        <div className="row justify-content-center">
          <div className="cards-column">
            {profiles.map((profile) => (
              <UserProfile key={profile.id} profile={profile} />
            ))}
          </div>
        </div>
      </div>
    )
}