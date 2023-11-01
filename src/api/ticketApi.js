import Swal from 'sweetalert2'

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNjNThhNmU2OGRjMzVlZGUyYjEwMzYiLCJ1c2VyaWQiOiJyb3NuZWRvYWx2ZXMxIiwicm9sZSI6WyJhZG1pbiJdLCJpYXQiOjE2OTg0NTQwOTMsImV4cCI6MTY5ODUyNjA5M30.I3FE2DnHo3QPKcPQHG3oTtCND3HA81GYOr73pHBCLz0"

export const getTickets = async (token) => {


    try {
        const response = await fetch(`http://localhost:8000/api/tickets/getTickets`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });
        const data = await response.json();
         if (data.payload && data.payload.length > 0) {
            data.payload.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateA - dateB;
            });
        }
        return data;
    } catch (error) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Sin tickets',
            showConfirmButton: false,
            timer: 1500
          })
        throw error;
    }
}


export const createTicket = async (data, token) => {
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
        if(data.status !== 200)  {
            throw new Error('El servidor respondió con un estado no exitoso.');
        } else {

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Ticket creado correctamente',
                showConfirmButton: false,
                timer: 1500
            })
            return data;
        }
    } catch (error) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ticket no creado',
            showConfirmButton: false,
            timer: 1500
          })
        return error;
    }
}

export const deleteTicket = async (_id, token) => {
    try {
        const response = await fetch(`http://localhost:8000/api/tickets/deleteTicket/${_id}`, {
            method: 'DELETE',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(response.status !== 200)  {
            throw new Error('No se pudo eliminar el ticket.');
        } else {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ticket eliminado correctamente',
            showConfirmButton: false,
            timer: 1500,
        });

        return response
    }
    } catch (error) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ticket no eliminado',
            showConfirmButton: false,
            timer: 1500
          })
        return error;
    }
}

export const printTicket = async (ticket, token) => {
    try {
        const response = await fetch(`http://localhost:8000/api/tickets/printTicket`, {
            method: 'POST',
            body: ticket,
            headers: {Authorization: `Bearer ${token}`}
        });
        if(response.status !== 200)  {
            throw new Error('No se pudo conectar la impresora.');
        } else {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ticket impreso correctamente',
            showConfirmButton: false,
            timer: 1500,
        });

        return response; 
    }
    } catch (error) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No se pudo conectar con la impresora',
            showConfirmButton: false,
            timer: 1500
          })
        return error;
    }
}

