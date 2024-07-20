// src/components/Profile/Profile.jsx
import authService from '../../services/authService';

const Profile = () => {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <div>You need to login to access this page.</div>;
  }

  return (
    <div className="profile">
      <h1>Profile Page</h1>
      <p>Welcome to your profile!</p>
    </div>
  );
};

export default Profile;
