import React, { useEffect, useState } from "react";
import { Table, Button, Collapse } from "react-bootstrap";
import Loading from "../spinner/Loading";
import "./ticket.css";
import { Link } from "react-router-dom";
import { deleteTicket, getTickets, printTicket } from "../../api/ticketApi";
import useToken from "../../hooks/useToken";
import { formatTime, formatDateShow, formatNumberWithCommas } from "../../utils/format";

const TableTicket = () => {
  const [loading, setLoading] = useState(true);
  const [openRow, setOpenRow] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const { token } = useToken();

  useEffect(() => {
    getTickets(token).then((res) => {
      res.payload.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
    });
      setTickets(res);
      setLoading(false);
    });
  }, [loading]);

  const handlePrint = (event, ticket) => {
    event.stopPropagation();
    setOpenRow(null);
    printTicket(ticket, token);
  };

  const handleDelete = (event, ticket) => {
    event.stopPropagation();
    setOpenRow(null);
    deleteTicket(ticket._id, token);
    setLoading(true);
  };

  const toggleRow = (index, ticket) => {
    if (openRow === index) {
      setOpenRow(null);
    } else {
      setOpenRow(index);
      setSelectedTicket(ticket);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <Button className="btn btn-warning">
        <Link className="button-link" to="/ticket/form">
          Nuevo
        </Link>
      </Button>

      <Table striped bordered hover size="sm">
        <thead>
          <tr className="text-center">
            <th className="column-width-id">Fecha</th>
            <th className="column-width-id">Hora</th>
            <th className="column-width-id">Usuario</th>
            {/* <th className="column-width-id">ID</th> */}
            <th className="column-width-total">Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tickets.payload.map((ticket, index) => (
            <React.Fragment key={ticket.id}>
              <tr className="text-center" onClick={() => toggleRow(index, ticket)}>
                <td className="column-width-id">{formatDateShow(ticket.createdAt)}</td>
                <td className="column-width-id">{formatTime(ticket.createdAt)}</td>
                <td className="column-width-id">{ticket.createdByDisplayValue}</td>
                {/* <td className="column-width-id">{ticket.id}</td> */}
                <td className="ccolumn-width-id">$ {formatNumberWithCommas(ticket.total)}</td>
                <td className="d-flex text-center justify-content-around">
                  <Button onClick={(e) => handlePrint(e, ticket)}>
                    <i className="fa-solid fa-print"></i>
                  </Button>
                  <Button onClick={(e) => handleDelete(e, ticket)}>
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
                          {selectedTicket &&
                            selectedTicket.id === ticket.id &&
                            ticket.items.map((item, itemIndex) => (
                              <tr key={itemIndex}>
                                <td>{item.quantity}</td>
                                <td>{item.name}</td>
                                <td>$ {formatNumberWithCommas(item.price)}</td>
                                <td>$ {formatNumberWithCommas(item.quantity * item.price)}</td>
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
  );
};

export default TableTicket;
