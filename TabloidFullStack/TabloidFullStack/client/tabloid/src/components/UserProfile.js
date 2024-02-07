import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";


export const UserProfile = ({ profile }) => {

  return (
    <Card>
      {/* <CardImg top src={profile.imageLocation} alt={profile.displayName} /> */}
      <br />
        <p className="row justify-content-center">
          User Full Name: <strong className="row justify-content-center">{profile.firstName} {profile.lastName}</strong>
        </p>
        <p className="row justify-content-center">User Display Name: <p className="row justify-content-center">{profile.displayName}</p></p>
        <div className="row justify-content-center">
           User Type: <strong className="row justify-content-center">{profile?.userType?.name}</strong>
        </div>
        <div className="text-center">
        <Link to={`/users/${profile.id}`}><button className="btn btn-primary">View Details</button></Link>
        </div>
        <br />
      </Card>
  );
};

export default UserProfile;