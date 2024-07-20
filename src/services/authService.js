const authService = {
  register: async (credentials) => {
    console.log('Sending registration credentials to server:', credentials);
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

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
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

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
