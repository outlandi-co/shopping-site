import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/MembershipTiers.css';

const getBorderColor = (tier) => {
  switch (tier) {
    case 'platinum': return '#e5e4e2';
    case 'gold': return '#ffd700';
    case 'silver': return '#c0c0c0';
    default: return '#ccc';
  }
};

const MembershipTiers = () => {
  const tiers = [
    {
      name: 'Platinum',
      price: '$299',
      features: [
        'Free 5-hour photo post-editing',
        '3 graphic design mockups',
        'Free 6 shirts (with purchase of 6 more)',
        'Priority support',
      ],
      color: 'platinum',
    },
    {
      name: 'Gold',
      price: '$199',
      features: [
        'Free 2-hour photo post-editing',
        '1 graphic design mockup',
        '20% off shirt printing (12 shirt minimum)',
      ],
      color: 'gold',
    },
    {
      name: 'Silver',
      price: '$99',
      features: [
        'Free 1-hour photo post-editing',
        '10% off shirt printing (12 shirt minimum)',
      ],
      color: 'silver',
    },
  ];

  return (
    <div className="membership-container">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={`membership-card ${tier.color}`}
          style={{ borderTop: `6px solid ${getBorderColor(tier.color)}` }}
        >
          <h2>{tier.name}</h2>
          <p className="membership-price">{tier.price}</p>
          <ul className="membership-features">
            {tier.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
          <Link to={`/checkout?tier=${tier.name.toLowerCase()}`}>
            <button className="membership-button">Choose {tier.name}</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MembershipTiers;
