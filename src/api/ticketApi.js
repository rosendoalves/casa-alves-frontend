import Swal from 'sweetalert2'

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNjNThhNmU2OGRjMzVlZGUyYjEwMzYiLCJ1c2VyaWQiOiJyb3NuZWRvYWx2ZXMxIiwicm9sZSI6WyJhZG1pbiJdLCJpYXQiOjE2OTg0NTQwOTMsImV4cCI6MTY5ODUyNjA5M30.I3FE2DnHo3QPKcPQHG3oTtCND3HA81GYOr73pHBCLz0"

export const getTickets = async () => {


    try {
        const response = await fetch(`http://localhost:8000/api/tickets/getTickets`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });

        if (!response.ok) {
            throw new Error(`Error al obtener los tickets. Código de estado: ${response.status}`);
        }

        const data = await response.json();
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
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(url, params);
        const data = await response.json();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ticket creado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        return data;
    } catch (error) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ticket no creado',
            showConfirmButton: false,
            timer: 1500
          })
        throw error;
    }
}

export const deleteTicket = async (_id) => {
    try {
        const response = await fetch(`http://localhost:8000/api/tickets/deleteTicket?_id=${_id}`, {
            method: 'DELETE',
            headers: {Authorization: `Bearer ${token}`}
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar el ticket. Código de estado: ${response.status}`);
        }

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ticket eliminado correctamente',
            showConfirmButton: false,
            timer: 1500,
        });

        return true; // Puedes retornar un indicador de éxito si lo deseas
    } catch (error) {
        console.error('Error al eliminar el ticket:', error);
        throw error;
    }
}

export const printTicket = async (ticket) => {
    try {
        const response = await fetch(`http://localhost:8000/api/tickets/printTicket`, {
            method: 'POST',
            body: ticket,
            headers: {Authorization: `Bearer ${token}`}
        });

        if (!response.ok) {
            throw new Error(`Error al reimprimir el ticket. Código de estado: ${response.status}`);
        }

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ticket impreso correctamente',
            showConfirmButton: false,
            timer: 1500,
        });

        return true; 
    } catch (error) {
        console.error('Error al reimprimir el ticket:', error);
        throw error;
    }
}

