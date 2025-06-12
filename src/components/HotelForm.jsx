import React, { useState } from 'react';

const HotelForm = ({ onAddHotel }) => {
  const [form, setForm] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    nit: '',
    numeroHabitaciones: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.direccion || !form.ciudad || !form.nit || !form.numeroHabitaciones) {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (isNaN(form.numeroHabitaciones) || parseInt(form.numeroHabitaciones) <= 0) {
      setError('El número de habitaciones debe ser un número positivo');
      return;
    }
    setError('');
    onAddHotel(form);
    setForm({ nombre: '', direccion: '', ciudad: '', nit: '', numeroHabitaciones: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 mb-4 mx-auto" style={{maxWidth: 500}}>
      <h3 className="card-title mb-3">Registrar Hotel</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <input type="text" name="nombre" placeholder="Nombre del hotel" value={form.nombre} onChange={handleChange} className="form-control" />
      </div>
      <div className="mb-3">
        <input type="text" name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} className="form-control" />
      </div>
      <div className="mb-3">
        <input type="text" name="ciudad" placeholder="Ciudad" value={form.ciudad} onChange={handleChange} className="form-control" />
      </div>
      <div className="mb-3">
        <input type="text" name="nit" placeholder="NIT" value={form.nit} onChange={handleChange} className="form-control" />
      </div>
      <div className="mb-3">
        <input type="number" name="numeroHabitaciones" placeholder="Número de habitaciones" value={form.numeroHabitaciones} onChange={handleChange} className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary w-100">Registrar</button>
    </form>
  );
};

export default HotelForm; 