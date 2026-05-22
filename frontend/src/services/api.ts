const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Custom error class to hold API-specific errors.
 */
export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Helper to fetch with automatically loaded headers.
 */
async function request(path: string, options: RequestInit = {}): Promise<any> {
  const url = `${API_BASE_URL}${path}`;

  // Build headers
  const headers = new Headers(options.headers || {});
  
  // Set JSON headers by default if request has a body
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Inject JWT from localStorage if available
  const token = localStorage.getItem('token');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  // Handle non-2xx responses
  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData && errorData.error) {
        errorMessage = errorData.error;
      }
    } catch {
      // JSON parsing failed, keep fallback message
    }
    throw new ApiError(errorMessage, response.status);
  }

  // Handle empty responses
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  get: (path: string, options?: RequestInit) => request(path, { ...options, method: 'GET' }),
  
  post: (path: string, body: any, options?: RequestInit) => request(path, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body)
  }),
  
  put: (path: string, body: any, options?: RequestInit) => request(path, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(body)
  }),
  
  patch: (path: string, body: any, options?: RequestInit) => request(path, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(body)
  }),
  
  delete: (path: string, options?: RequestInit) => request(path, { ...options, method: 'DELETE' })
};
