import React, { useEffect, useState } from "react";
import "./ticket.css";

const Ticket = () => {
  const [formData, setFormData] = useState([{ id: 1, name: "", price: 0 }]);
  const [total, setTotal] = useState(0);

  const sumTotal = () => {
    const prices = formData.map((data) => parseInt(data.price, 10));
    const totalAmount = prices.reduce((total, price) => total + price, 0);
    setTotal(totalAmount);
  };
  useEffect(() => {
    sumTotal();
  }, [formData.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData];
      updatedFormData[index] = {
        ...updatedFormData[index],
        [name.slice(0, -1)]: value,
      };
      return updatedFormData;
    });
  };

  const addLine = () => {
    const newId = formData.length + 1;
    setFormData([...formData, { id: newId, name: "", price: 0 }]);
  };

  const removeLine = (id) => {
    const updatedFormData = formData.filter((line) => line.id !== id);
    setFormData(updatedFormData);
  };

  return (
    <div className="form-ticket">
      <h1>Nuevo Ticket</h1>
      <form id="form" onSubmit={handleSubmit}>
        {formData.map((line, index) => (
          <div key={line.id}>
            <label htmlFor={`name${line.id}`}>Producto</label>
            <input
              type="text"
              name={`name${line.id}`}
              value={formData[index].name}
              onChange={(event) => handleInputChange(index, event)}
            />
            <label htmlFor={`price${line.id}`}>Precio</label>
            <input
              type="number"
              name={`price${line.id}`}
              value={formData[index].price}
              onChange={(event) => handleInputChange(index, event)}
            />
            <button type="button" onClick={() => removeLine(line.id)}>
              Eliminar
            </button>
          </div>
        ))}
        <br />
        <button type="button" onClick={addLine}>
          +
        </button>
        <p>Total ${total}</p>
        <button type="submit" onClick={handleSubmit}>
          Crear ticket
        </button>
      </form>
    </div>
  );
};

export default Ticket;
