import Cookies from 'js-cookie';

const apiUrl = process.env.REACT_APP_API_URL; // or VITE_API_URL if you are using Vite

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${apiUrl}/api/users/register`, {
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

    return await response.json();
  } catch (error) {
    console.error('Failed to register user:', error);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${apiUrl}/api/users/login`, {
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
    Cookies.set('authToken', data.token, { expires: 7 });
    return data;
  } catch (error) {
    console.error('Failed to login user:', error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const token = Cookies.get('authToken');
    console.log('Auth token:', token);

    const response = await fetch(`${apiUrl}/api/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }

    const data = await response.json();
    console.log('Products data fetched from API:', data); // Log the fetched data

    if (Array.isArray(data)) {
      return data; // Return directly if it's an array of products
    } else if (data && Array.isArray(data.products)) {
      return data.products; // Return data.products if the products are nested
    } else {
      console.error('Unexpected data structure:', data);
      return []; // Return an empty array if the data structure is unexpected
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const token = Cookies.get('authToken');

    const response = await fetch(`${apiUrl}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
