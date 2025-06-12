const API_URL = 'http://localhost:8000/hoteles'; // Cambia el puerto si tu backend usa otro

export async function getHoteles() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener hoteles');
  return await res.json();
}

export async function createHotel(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear hotel');
  return await res.json();
}

export async function updateHotel(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al actualizar hotel');
  return await res.json();
}

export async function deleteHotel(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar hotel');
  return await res.json();
} 