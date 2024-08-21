import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../../services/api';

const ProfilePage = ({ token }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getUserProfile(token);
        setProfile(profileData);
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      {profile && (
        <div>
          <p>Name: {profile.username}</p> {/* Make sure this matches your user model */}
          <p>Email: {profile.email}</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
