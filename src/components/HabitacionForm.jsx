import React, { useState, useEffect } from 'react';
import { getAcomodaciones, getTipoHabitaciones } from '../services/habitacionService';

const HabitacionForm = ({ habitaciones, maxHabitaciones, onAddHabitacion }) => {
  const [tiposHabitacion, setTiposHabitacion] = useState([]);
  const [acomodaciones, setAcomodaciones] = useState([]);
  const [tipo, setTipo] = useState('');
  const [acomodacion, setAcomodacion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [error, setError] = useState('');

  // Cargar datos al montar el componente
  useEffect(() => {
    async function fetchData() {
      try {
        const tipos = await getTipoHabitaciones();
        setTiposHabitacion(tipos);
        setTipo(tipos[0]?.id || '');

        const acoms = await getAcomodaciones();
        setAcomodaciones(acoms);
        setAcomodacion(acoms[0]?.id || '');
      } catch (e) {
        setError('Error al cargar datos');
      }
    }
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cantidad || isNaN(cantidad) || parseInt(cantidad) <= 0) {
      setError('La cantidad debe ser un número positivo');
      return;
    }
    const existe = habitaciones.some(h => h.tipo === tipo && h.acomodacion === acomodacion);
    if (existe) {
      setError('Ya existe una configuración con ese tipo y acomodación');
      return;
    }
    const total = habitaciones.reduce((acc, h) => acc + parseInt(h.cantidad), 0) + parseInt(cantidad);
    if (total > maxHabitaciones) {
      setError('La suma de habitaciones supera el máximo permitido para el hotel');
      return;
    }
    setError('');
    onAddHabitacion({ tipo, acomodacion, cantidad: parseInt(cantidad), estado: 1 });
    setCantidad('');
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 mb-4 mx-auto" style={{maxWidth: 500}}>
      <h4 className="card-title mb-3">Agregar Habitación</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label className="form-label">Tipo de habitación</label>
        <select value={tipo} onChange={e => setTipo(e.target.value)} className="form-select">
          {tiposHabitacion.map(t => (
            <option key={t.id} value={t.id}>{t.nombre}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Acomodación</label>
        <select value={acomodacion} onChange={e => setAcomodacion(e.target.value)} className="form-select">
          {acomodaciones.map(a => (
            <option key={a.id} value={a.id}>{a.nombre}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Cantidad</label>
        <input type="number" value={cantidad} onChange={e => setCantidad(e.target.value)} className="form-control" />
      </div>
      <button type="submit" className="btn btn-success w-100">Agregar</button>
    </form>
  );
};

export default HabitacionForm; 