import React from "react";
import "./ticketv2.css";
import useTicket from "./useTicket";
import { Form, Col, Row, Button } from "react-bootstrap";

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
            <Form.Group as={Col} sm={7} controlId={`name${line.id}`}>
              <Form.Label>Producto</Form.Label>
              <Form.Control
                type="text"
                name={`name${line.id}`}
                value={formData[index].name}
                onChange={(event) => handleInputChange(index, event)}
                placeholder="Ingrese un producto"
              />
            </Form.Group>
            <Form.Group as={Col} sm={3} controlId={`price${line.id}`}>
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name={`price${line.id}`}
                value={formData[index].price}
                onChange={(event) => handleInputChange(index, event)}
                placeholder="Ingrese un precio"
              />
            </Form.Group>
            <Form.Group as={Col} sm={2} className="d-flex align-items-end">
              <Button
                className="btn btn-danger"
                type="button"
                onClick={() => removeLine(line.id)}
              >
                Eliminar
              </Button>
            </Form.Group>
          </Row>
        ))}
        <Button className="btn btn-success" type="button" onClick={addLine}>
          Añadir
        </Button>
        <div className="my-3">Total ${total}</div>
        <Button className="btn btn-primary" type="submit" onClick={handleSubmit}>
          Enviar
        </Button>
      </Form>
    </div>
  );
};

export default Ticket;
