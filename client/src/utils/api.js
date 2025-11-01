// API utility for making HTTP requests
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

class ApiError extends Error {
  constructor(message, status, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.name = 'ApiError';
  }
}

const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new ApiError(
      data.message || 'An error occurred',
      response.status,
      data.errors || []
    );
  }
  
  return data;
};

export const api = {
  // Submit contact form
  submitContactForm: async (formData) => {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    return handleResponse(response);
  },

  // Subscribe to newsletter
  subscribeNewsletter: async (email) => {
    const response = await fetch(`${API_URL}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    return handleResponse(response);
  },

  // Health check
  healthCheck: async () => {
    const response = await fetch(`${API_URL}/health`);
    return handleResponse(response);
  },
};

export { ApiError };
