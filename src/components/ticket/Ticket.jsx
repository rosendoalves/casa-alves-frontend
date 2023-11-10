import React from "react";
import "./ticket.css";
import useTicket from "./useTicket";
import { Form, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatNumberWithCommas } from "../../utils/format";

const Ticket = () => {
  const {
    formData,
    total,
    handleSubmit,
    handleInputChange,
    addLine,
    removeLine,
  } = useTicket();

  return (
    <div className="form-tickets text-center">
      <Form className="form-ticket" onSubmit={handleSubmit}>
        {formData.map((line, index) => (
          <Row className="mb-3" key={line.id}>
            <Form.Group as={Col} sm={2} controlId={`quantity${line.id}`}>
              {index === 0 && <Form.Label>Cantidad</Form.Label>}
              <Form.Control
                type="number"
                name={`quantity${line.id}`}
                value={formData[index].quantity}
                onChange={(event) => handleInputChange(index, event)}
              />
            </Form.Group>
            <Form.Group as={Col} sm={6} controlId={`name${line.id}`}>
              {index === 0 && <Form.Label>Producto</Form.Label>}
              <Form.Control
                type="text"
                name={`name${line.id}`}
                value={formData[index].name}
                onChange={(event) => handleInputChange(index, event)}
                placeholder="Ingrese un producto"
              />
            </Form.Group>
            <Form.Group as={Col} sm={2} controlId={`price${line.id}`}>
              {index === 0 && <Form.Label>Precio</Form.Label>}
              <Form.Control
                type="number"
                name={`price${line.id}`}
                value={formData[index].price}
                onChange={(event) => handleInputChange(index, event)}
                placeholder="Ingrese un precio"
              />
            </Form.Group>
            <Form.Group as={Col} sm={2} className="d-flex align-items-end">
              <button
                className=""
                type="button"
                onClick={() => removeLine(line.id)}
              >
                Eliminar
              </button>
            </Form.Group>
          </Row>
        ))}
        <button className="" type="button" onClick={addLine}>
          Añadir
        </button>
        <div className="my-3">Total ${formatNumberWithCommas(total)}</div>
        <div className="button-container">
          <button
            className="button-form-ticket"
            type="submit"
            onClick={handleSubmit}
          >
            Guardar
          </button>
          <button className="button-form-ticket">
            <Link className="button-link" to="/ticket">
              Volver
            </Link>
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Ticket;
