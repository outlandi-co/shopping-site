import authService from '../services/authService';
import Logout from './Logout';

const Profile = () => {
  const currentUser = authService.getCurrentUser();

  return (
    <div>
      {currentUser ? (
        <div>
          <h1>Profile</h1>
          <p><strong>Username:</strong> {currentUser.username}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <Logout />
        </div>
      ) : (
        <div>
          <h1>You are not logged in.</h1>
        </div>
      )}
    </div>
  );
};

export default Profile;

