import React, { useEffect, useState } from "react";
import { Table, Button, Collapse } from "react-bootstrap";
import Loading from "../spinner/Loading";
import './ticket.css'
import { Link } from "react-router-dom";

const TableTicket = () => {
  const [loading, setLoading] = useState(true);
  const [openRow, setOpenRow] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  // const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Simulamos un proceso asíncrono para cargar datos
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simula una carga de 2 segundos
  }, []);

  const tickets = [
    {
      id: 1,
      items: [
        { quantity: 2, name: "Producto 1", price: 1200 },
        { quantity: 1, name: "Producto 2", price: 1500 },
        { quantity: 3, name: "Producto 3", price: 3000 },
      ],
      total: 5700,
    },
    {
      id: 2,
      items: [
        { quantity: 1, name: "Producto A", price: 800 },
        { quantity: 2, name: "Producto B", price: 1200 },
      ],
      total: 3200,
    },
  ];

  const handlePrint = (event, ticket) => {
    event.stopPropagation();
    setOpenRow(null);
    // Implementa la lógica para imprimir aquí, puedes usar ticket para obtener los detalles del ticket
    console.log("🚀 PRINT", ticket);
  };

  const handleDelete = (event, ticket) => {
    event.stopPropagation();
    setOpenRow(null);
    // Implementa la lógica para eliminar aquí, puedes usar ticket para obtener los detalles del ticket
    console.log("🚀 DELETE", ticket);
  };

  const toggleRow = (index, ticket) => {
    if (openRow === index) {
      setOpenRow(null);
    } else {
      setOpenRow(index);
      setSelectedTicket(ticket);
    }
  };

  return (
    loading ? (
      <Loading />
    ) : (
      <>
            <Button className='btn btn-warning'><Link className="button-link" to="/ticket/form">Nuevo</Link></Button>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th className="column-width-id">ID</th>
            <th className="column-width-total">Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <React.Fragment key={ticket.id}>
              <tr onClick={() => toggleRow(index, ticket)}>
                <td className="column-width-id">{ticket.id}</td>
                <td className="column-width-total">{ticket.total}</td>
                <td className="text-center">
                  <Button
                    onClick={(e) => handlePrint(e, ticket)}
                  >
                    <i className="fa-solid fa-print"></i>
                  </Button>
                  <Button
                    onClick={(e) => handleDelete(e, ticket)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <Collapse in={openRow === index}>
                    <div>
                      <table className="table-details">
                        <thead>
                          <tr>
                            <th>Cantidad</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Monto</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedTicket && selectedTicket.id === ticket.id &&
                            ticket.items.map((item, itemIndex) => (
                              <tr key={itemIndex}>
                                <td>{item.quantity}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity * item.price}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </Collapse>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      </>

    )
  );
};

export default TableTicket;
