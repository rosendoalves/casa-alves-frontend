// ES6 Modules or TypeScript
import { redirect } from 'react-router-dom';
import Swal from 'sweetalert2'

export const getTickets = async () => {


    try {
        const response = await fetch(`http://localhost:8000/api/tickets/getTickets`);

        if (!response.ok) {
            throw new Error(`Error al obtener los tickets. Código de estado: ${response.status}`);
        }

        const data = await response.json();
        // console.log('Tickets obtenidos:', data);
        console.log("RESPUESTA", response)
        console.log("RESPUESTA STATUS", response.status)
        return data;
    } catch (error) {
        console.error('Error al obtener los tickets:', error);
        throw error;
    }
}


export const createTicket = async (data) => {
    const url = "http://localhost:8000/api/tickets/saveTicket";
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Establece el tipo de contenido del cuerpo como JSON
        },
        body: JSON.stringify(data), // Convierte el objeto a JSON y lo envía en el cuerpo
    };

    try {
        const response = await fetch(url, params);
        

        if (!response.ok) {
            throw new Error(`Error al crear el ticket. Código de estado: ${response.status}`);
        }

        const data = await response.json();
        console.log('Ticket creado:', data);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ticket creado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          redirect('/ticket')
        return data;
    } catch (error) {
        console.error('Error al crear el ticket:', error);
        throw error;
    }
}
