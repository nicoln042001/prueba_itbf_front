const API_URL = 'http://localhost:8000/habitaciones'; // Cambia el puerto si tu backend usa otro

export async function getHabitaciones() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener habitaciones');
  return await res.json();
}

export async function createHabitacion(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear habitación');
  return await res.json();
}

export async function updateHabitacion(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al actualizar habitación');
  return await res.json();
}

export async function deleteHabitacion(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar habitación');
  return await res.json();
}

export async function getAcomodaciones() {
  const res = await fetch('http://localhost:8000/acomodaciones');
  if (!res.ok) throw new Error('Error al obtener acomodaciones');
  return await res.json();
}

export async function getTipoHabitaciones() {
  const res = await fetch('http://localhost:8000/tipoHabitaciones');
  if (!res.ok) throw new Error('Error al obtener tipos de habitación');
  return await res.json();
} 