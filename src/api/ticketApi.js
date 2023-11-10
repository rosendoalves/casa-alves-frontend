import Swal from "sweetalert2";
import useToken from "../hooks/useToken";

const useTicketApi = () => {
  const { token, setToken } = useToken();
  console.log("🚀 ~ file: ticketApi.js:6 ~ useTicketApi ~ token:", token)

  const getTickets = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/tickets/getUserTickets`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.payload && data.payload.length > 0) {
        data.payload.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateA - dateB;
        });
        return data;
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        localStorage.removeItem("token");
        setToken();
      }
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Sin tickets",
        showConfirmButton: false,
        timer: 1500,
      });
      throw error;
    }
  };

  const createTicket = async (form) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/tickets/saveTicket`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();
      if (data.status !== 200) {
        throw new Error("El servidor respondió con un estado no exitoso.");
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Ticket creado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        return data;
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        localStorage.removeItem("token");
        setToken();
      }
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ticket no creado",
        showConfirmButton: false,
        timer: 1500,
      });
      return error;
    }
  };

  const deleteTicket = async (_id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/tickets/deleteTicket/${_id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status !== 200) {
        throw new Error("No se pudo eliminar el ticket.");
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Ticket eliminado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });

        return response;
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        localStorage.removeItem("token");
        setToken();
      }
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ticket no eliminado",
        showConfirmButton: false,
        timer: 1500,
      });
      return error;
    }
  };

  const printTicket = async (ticket) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/tickets/printTicket`,
        {
          method: "POST",
          body: ticket,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status !== 200) {
        throw new Error("No se pudo conectar la impresora.");
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Ticket impreso correctamente",
          showConfirmButton: false,
          timer: 1500,
        });

        return response;
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        localStorage.removeItem("token");
        setToken();
      }
      Swal.fire({
        position: "center",
        icon: "error",
        title: "No se pudo conectar con la impresora",
        showConfirmButton: false,
        timer: 1500,
      });
      return error;
    }
  };
  return {
    getTickets,
    createTicket,
    deleteTicket,
    printTicket,
  };
};

export default useTicketApi;
