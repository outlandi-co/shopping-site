import Cookies from 'js-cookie';

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error('API URL is not defined. Please set VITE_API_URL in your environment.');
}

// ✅ Fetch Products
export const getProducts = async () => {
  try {
    const token = Cookies.get('authToken');

    const response = await fetch(`${apiUrl}/api/products`, {
      method: 'GET',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Fetch failed: ${errorText}`);
    }

    const data = await response.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.products)) return data.products;

    console.warn('Unexpected product response structure:', data);
    return [];
  } catch (error) {
    console.error('getProducts error:', error.message);
    throw error;
  }
};

// ✅ Register User and Store Token
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${apiUrl}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Registration failed: ${errorText}`);
    }

    const data = await response.json();

    if (data.token) {
      Cookies.set('authToken', data.token, { expires: 7 });
    }

    return data;
  } catch (error) {
    console.error('registerUser error:', error.message);
    throw error;
  }
};

// ✅ Login User
export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${apiUrl}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Login failed: ${errorText}`);
    }

    const data = await response.json();

    if (data.token) {
      Cookies.set('authToken', data.token, { expires: 7 });
    } else {
      throw new Error('Login did not return a token.');
    }

    return data;
  } catch (error) {
    console.error('loginUser error:', error.message);
    throw error;
  }
};

// ✅ Fetch User Profile
export const getUserProfile = async () => {
  try {
    const token = Cookies.get('authToken');

    const response = await fetch(`${apiUrl}/api/users/profile`, {
      method: 'GET',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Profile fetch failed: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('getUserProfile error:', error.message);
    throw error;
  }
};
