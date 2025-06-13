import React from 'react';

const HotelList = ({ hoteles, onSelectHotel, hotelSeleccionado }) => {
  if (hoteles.length === 0) {
    return <div className="text-center mt-4">No hay hoteles registrados.</div>;
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Hoteles Registrados</h3>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Ciudad</th>
            <th>NIT</th>
            <th># Habitaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {hoteles.map((hotel, idx) => (
            <tr key={idx} className={hotelSeleccionado === idx ? "table-primary" : ""}>
              <td>{hotel.nombre}</td>
              <td>{hotel.direccion}</td>
              <td>{hotel.ciudad}</td>
              <td>{hotel.nit}</td>
              <td className="text-center">{hotel.numero_habitaciones}</td>
              <td className="text-center">
                <button onClick={() => onSelectHotel(idx)} className="btn btn-sm btn-info">
                  Gestionar habitaciones
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotelList; 