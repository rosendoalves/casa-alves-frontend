import { useEffect, useState } from "react";
import "./ticket.css";

const useTicket = () => {
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

  return {
    formData,
    total,
    handleSubmit,
    handleInputChange,
    addLine,
    removeLine,
  }
};

export default useTicket;