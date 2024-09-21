import Cookies from 'js-cookie';

const apiUrl = import.meta.env.VITE_API_URL; // Ensure this environment variable is correctly set

if (!apiUrl) {
  throw new Error('API URL is not defined. Please set VITE_API_URL in your environment.');
}

// Fetch Products
export const getProducts = async () => {
  try {
    const token = Cookies.get('authToken');
    console.log('Auth token:', token);

    const response = await fetch(`${apiUrl}/products`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '', // Include token if available
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }

    const data = await response.json();
    console.log('Products data fetched from API:', data);

    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.products)) {
      return data.products;
    } else {
      console.error('Unexpected data structure:', data);
      return [];
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

// Register User
export const registerUser = async (userData) => {
  try {
      console.log('API URL:', apiUrl);
      console.log('Sending registration data:', userData);

      const response = await fetch(`${apiUrl}/users/register`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
      });

      if (!response.ok) {
          const errorText = await response.text();
          console.error(`Error: ${errorText}`);
          throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      return data;
  } catch (error) {
      console.error('Failed to register user:', error);
      throw error;
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${apiUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }

    const data = await response.json();
    Cookies.set('authToken', data.token, { expires: 7 }); // Save token in cookies for 7 days
    return data;
  } catch (error) {
    console.error('Failed to login user:', error);
    throw error;
  }
};

// Fetch User Profile
export const getUserProfile = async () => {
  try {
    const token = Cookies.get('authToken');

    const response = await fetch(`${apiUrl}/users/profile`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '', // Include token if available
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
};
