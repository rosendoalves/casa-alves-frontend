import React, { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import Loading from "../spinner/Loading";
import "./ticket.css";
// import { Link } from "react-router-dom";
import useTicketApi from "../../api/ticketApi";
import {
  formatTime,
  formatDateShow,
  formatNumberWithCommas,
} from "../../utils/format";

const TableTicket = () => {
  const [loading, setLoading] = useState(true);
  const [openRow, setOpenRow] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const {getTickets, printTicket, deleteTicket} = useTicketApi()

  useEffect(() => {
    getTickets().then((res) => {
      res.payload.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
      setTickets(res.payload);
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, [loading]);

  const handlePrint = (event, ticket) => {
    event.stopPropagation();
    setOpenRow(null);
    printTicket(ticket);
  };

  const handleDelete = (event, ticket) => {
    event.stopPropagation();
    setOpenRow(null);
    deleteTicket(ticket._id);
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
    <div className="table-container">
      <div className="header-table">
        <h1>Ticket Realizados</h1>
      {/* <button className="">
        <Link  className="button-link" to="/ticket/form">
          Nuevo
        </Link>
      </button> */}
      </div>
      {tickets.length > 0 ? (
        <table className="table-expandable" >
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
            {tickets.map((ticket, index) => (
              <React.Fragment key={ticket.id}>
                <tr
                  className={`text-center ${openRow === index ? 'active' : ''}`}
                  onClick={() => toggleRow(index, ticket)}
                >
                  <td className="column-width-id">
                    {formatDateShow(ticket.createdAt)}
                  </td>
                  <td className="column-width-id">
                    {formatTime(ticket.createdAt)}
                  </td>
                  <td className="column-width-id">
                    {ticket.createdByDisplayValue}
                  </td>
                  {/* <td className="column-width-id">{ticket.id}</td> */}
                  <td className="ccolumn-width-id">
                    $ {formatNumberWithCommas(ticket.total)}
                  </td>
                  <td className="d-flex text-center justify-content-around">
                    <button onClick={(e) => handlePrint(e, ticket)}>
                      <i className="fa-solid fa-print"></i>
                    </button>
                    <button onClick={(e) => handleDelete(e, ticket)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colSpan="3">
                    <Collapse in={openRow === index}>
                      <div className={`table-collapsed ${openRow === index ? 'expanded' : ''}`}>
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
                                  <td>
                                    $ {formatNumberWithCommas(item.price)}
                                  </td>
                                  <td>
                                    ${" "}
                                    {formatNumberWithCommas(
                                      item.quantity * item.price
                                    )}
                                  </td>
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
        </table>
      ) : (
        <p>Sin tickets para mostrar</p>
      )}
    </div>
  );
};

export default TableTicket;
