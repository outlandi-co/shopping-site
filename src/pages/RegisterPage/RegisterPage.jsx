// import React, { useState } from 'react';
// import { registerUser } from '../../services/api';
// import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';

// const RegisterPage = () => {
//   const [userData, setUserData] = useState({ username: '', email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await registerUser(userData);
//       console.log('User registered successfully:', response);
//       Cookies.set('authToken', response.token);
//       navigate('/profile'); // Redirect to the profile page
//     } catch (error) {
//       console.error('Registration failed:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           value={userData.username}
//           onChange={handleChange}
//           placeholder="Username"
//         />
//         <input
//           type="email"
//           name="email"
//           value={userData.email}
//           onChange={handleChange}
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           name="password"
//           value={userData.password}
//           onChange={handleChange}
//           placeholder="Password"
//         />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default RegisterPage;


import React, { useState } from 'react';
import { registerUser } from '../../services/api'; // Correct import

const RegisterPage = () => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(userData);
      console.log('User registered successfully:', response);
      // Redirect to login or profile after registration
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
