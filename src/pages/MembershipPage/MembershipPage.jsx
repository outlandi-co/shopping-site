import React from 'react';
import MembershipTiers from '../../components/membershipCards/MembershipTiers';
import '../../styles/MembershipTiers.css'; // ✅ correct path and syntax


const MembershipPage = () => {
  return (
    <div className="membership-page" style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Membership Plans</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Choose the best plan for your needs and unlock exclusive services.
      </p>
      <MembershipTiers />
    </div>
  );
};

export default MembershipPage;
