const API_URL = import.meta.env.VITE_API_BASE_URL;

const authService = {
  register: async (credentials) => {
    console.log('Sending registration credentials to server:', credentials);
    console.log('API URL:', `${API_URL}/auth/register`);
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    console.log('Response status:', response.status);
    if (!response.ok) {
      const error = await response.json();
      console.error('Error response from server:', error);
      throw new Error('Registration failed: ' + error.message);
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
  },

  login: async (credentials) => {
    console.log('Sending login credentials to server:', credentials);
    console.log('API URL:', `${API_URL}/auth/login`);
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    console.log('Response status:', response.status);
    if (!response.ok) {
      const error = await response.json();
      console.error('Error response from server:', error);
      throw new Error('Login failed: ' + error.message);
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};

export default authService;
