import { useState, useEffect } from 'react'
import HotelForm from './components/HotelForm.jsx'
import HotelList from './components/HotelList.jsx'
import HabitacionForm from './components/HabitacionForm.jsx'
import HabitacionList from './components/HabitacionList.jsx'
import { getHoteles, createHotel } from './services/hotelService'
import { getHabitaciones, createHabitacion } from './services/habitacionService'
import './App.css'

function App() {
  const [hoteles, setHoteles] = useState([])
  const [hotelSeleccionado, setHotelSeleccionado] = useState(null)
  // habitacionesPorHotel: { [index]: [ {tipo, acomodacion, cantidad} ] }
  const [habitacionesPorHotel, setHabitacionesPorHotel] = useState({})

  // Cargar hoteles al iniciar
  useEffect(() => {
    getHoteles().then(setHoteles).catch(() => alert('Error al cargar hoteles'))
  }, [])

  // Cargar habitaciones al seleccionar hotel
  useEffect(() => {
    if (hotelSeleccionado !== null) {
      getHabitaciones().then(habs => {
        const habsHotel = habs.filter(h => h.hotel_id === hoteles[hotelSeleccionado]?.id)
        setHabitacionesPorHotel(prev => ({ ...prev, [hotelSeleccionado]: habsHotel }))
      }).catch(() => alert('Error al cargar habitaciones'))
    }
  }, [hotelSeleccionado, hoteles])

  const handleAddHotel = async (nuevoHotel) => {
    try {
      const data = { ...nuevoHotel, estado: true, numero_habitaciones: nuevoHotel.numeroHabitaciones }
      const res = await createHotel(data)
      setHoteles(hs => [...hs, res.hotel])
    } catch (e) {
      alert(e.message)
    }
  }

  const handleSelectHotel = (idx) => {
    setHotelSeleccionado(idx)
  }

  const handleAddHabitacion = async (habitacion) => {
    try {
      const hotel = hoteles[hotelSeleccionado]
      // Debes mapear tipo y acomodacion a sus IDs reales según tu modelo
      // Aquí se asume que tienes los IDs disponibles o debes consultarlos
      // Por simplicidad, se envía el nombre, pero deberías adaptar esto
      const data = {
        hotel_id: hotel.id,
        tipo_habitacion_id: habitacion.tipo, // Debes mapear a ID real
        acomodacion_id: habitacion.acomodacion, // Debes mapear a ID real
        cantidad: habitacion.cantidad,
        estado: 1
      }
      const res = await createHabitacion(data)
      setHabitacionesPorHotel(prev => ({
        ...prev,
        [hotelSeleccionado]: [...(prev[hotelSeleccionado] || []), res]
      }))
    } catch (e) {
      alert(e.message)
    }
  }

  const habitacionesHotel = hotelSeleccionado !== null ? (habitacionesPorHotel[hotelSeleccionado] || []) : []
  const maxHabitaciones = hotelSeleccionado !== null ? parseInt(hoteles[hotelSeleccionado]?.numero_habitaciones || 0) : 0

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-4">
        <h1 className="display-5 text-center mb-4">Gestión de Hoteles Decameron</h1>
        <HotelForm onAddHotel={handleAddHotel} />
        <HotelList hoteles={hoteles} onSelectHotel={handleSelectHotel} hotelSeleccionado={hotelSeleccionado} />
        {hotelSeleccionado !== null && (
          <div className="mt-5">
            <h2 className="h4 text-center mb-4">Habitaciones para: {hoteles[hotelSeleccionado].nombre}</h2>
            <HabitacionForm
              habitaciones={habitacionesHotel}
              maxHabitaciones={maxHabitaciones}
              onAddHabitacion={handleAddHabitacion}
            />
            <HabitacionList habitaciones={habitacionesHotel} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
