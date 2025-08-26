// src/lib/api.ts

const API_BASE = import.meta.env.VITE_API_BASE;

// Generic fetch
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE}${endpoint}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

// CRUD operations for graduates (contents)
export async function getGraduates() {
  return apiFetch('/contents');
}

export async function getGraduate(id: string) {
  return apiFetch(`/contents/${id}`);
}

export async function createGraduate(data: object) {
  return apiFetch('/contents', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function updateGraduate(id: string, data: object) {
  return apiFetch(`/contents/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function deleteGraduate(id: string) {
  return apiFetch(`/contents/${id}`, {
    method: 'DELETE'
  });
}

// Example usage:
// import { apiFetch } from '$lib/api';
// const data = await apiFetch('/your-endpoint');
