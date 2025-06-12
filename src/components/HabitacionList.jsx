import React from 'react';

const HabitacionList = ({ habitaciones }) => {
  if (!habitaciones || habitaciones.length === 0) {
    return <div className="text-center mt-4">No hay habitaciones configuradas para este hotel.</div>;
  }

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Habitaciones Configuradas</h4>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Tipo</th>
            <th>Acomodación</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {habitaciones.map((h, idx) => (
            <tr key={idx}>
              <td>{h?.tipo_habitacion?.nombre}</td>
              <td>{h?.acomodacion?.nombre}</td>
              <td className="text-center">{h.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HabitacionList; 