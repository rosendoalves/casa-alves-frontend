
export const getTickets = async () => {


    try {
        const response = await fetch(`http://localhost:8000/api/tickets/getTickets`);

        if (!response.ok) {
            throw new Error(`Error al obtener los tickets. Código de estado: ${response.status}`);
        }

        const data = await response.json();
        console.log('Tickets obtenidos:', data);
        return data;
    } catch (error) {
        console.error('Error al obtener los tickets:', error);
        throw error;
    }
}
