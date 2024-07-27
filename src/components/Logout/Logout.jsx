import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const Logout = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
