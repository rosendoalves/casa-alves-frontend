import React from "react";
import "./ticket.css";
import useTicket from "./useTicket";
import { Form, Col, Row, Button } from "react-bootstrap";

const Ticket0 = () => {
  const {
    formData,
    total,
    handleSubmit,
    handleInputChange,
    addLine,
    removeLine,
  } = useTicket();

  return (
    <div className="form-ticket">
       <Form id="form" onSubmit={handleSubmit}>
       {formData.map((line, index) => (
          <Row className="line" key={line.id}>
            <Form.Group as={Col} controlId="formProduct" className="input-group">
              <Form.Label htmlFor={`name${line.id}`}>Producto</Form.Label>
              <Form.Control
                type="text"
                name={`name${line.id}`}
                value={formData[index].name}
                onChange={(event) => handleInputChange(index, event)}
              />
            </Form.Group>
            <Form.Group className="input-group">
              <Form.Label htmlFor={`price${line.id}`}>Precio</Form.Label>
              <Form.Control
                type="number"
                name={`price${line.id}`}
                value={formData[index].price}
                onChange={(event) => handleInputChange(index, event)}
              />
            </Form.Group>
            <Form.Group className="trash-group">
              <button
                className="btn-delete"
                type="button"
                onClick={() => removeLine(line.id)}
              >
                -
              </button>
            </Form.Group>
          </Row>
        ))}
         <Button className='btn-add' type="button" onClick={addLine}>
          +
        </Button>
        <p>Total ${total}</p>
        <Button  className='btn-action' type="submit" onClick={handleSubmit}>
          Enviar
        </Button >
    </Form>
      {/* <h1>Nuevo Ticket</h1>
      <form id="form" onSubmit={handleSubmit}>
        {formData.map((line, index) => (
          <div className="line" key={line.id}>
            <div className="input-group">
              <label htmlFor={`name${line.id}`}>Producto</label>
              <input
                type="text"
                name={`name${line.id}`}
                value={formData[index].name}
                onChange={(event) => handleInputChange(index, event)}
              />
            </div>
            <div className="input-group">
              <label htmlFor={`price${line.id}`}>Precio</label>
              <input
                type="number"
                name={`price${line.id}`}
                value={formData[index].price}
                onChange={(event) => handleInputChange(index, event)}
              />
            </div>
            <div className="trash-group">
              <button
                className="btn-delete"
                type="button"
                onClick={() => removeLine(line.id)}
              >
                -
              </button>
            </div>
          </div>
        ))}
        <br />
        <button className='btn-add' type="button" onClick={addLine}>
          +
        </button>
        <p>Total ${total}</p>
        <button className='btn-action' type="submit" onClick={handleSubmit}>
          Enviar
        </button>
      </form> */}
    </div>
  );
};

export default Ticket0;
