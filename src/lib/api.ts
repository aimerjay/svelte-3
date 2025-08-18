// src/lib/api.ts

const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

// Example usage:
// import { apiFetch } from '$lib/api';
// const data = await apiFetch('/your-endpoint');
