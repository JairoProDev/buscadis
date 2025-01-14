const API_URL = (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

export async function fetchClasificados() {
  const response = await fetch(`${API_URL}/api/clasificados`);
  if (!response.ok) {
    throw new Error('Error al cargar los clasificados');
  }
  return response.json();
}

export async function createClasificado(formData: FormData) {
  const response = await fetch(`${API_URL}/api/clasificados`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Error al crear el clasificado');
  }
  
  return response.json();
} 