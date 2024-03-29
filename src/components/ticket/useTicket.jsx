import { useEffect, useState } from "react";
import "./ticket.css";
import { useNavigate } from "react-router-dom";
import useTicketApi from "../../api/ticketApi";

const useTicket = () => {
  const {createTicket} = useTicketApi()
  const [formData, setFormData] = useState([{ id: 1, name: "", price: 0, quantity: 1 }]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const sumTotal = () => {
    const prices = formData.map((data) => parseInt(data.price, 10));
    const totalAmount = prices.reduce((total, price) => total + price, 0);
    setTotal(totalAmount);
  };
  useEffect(() => {
    sumTotal();
  }, [formData.length]);

  const handleSubmit = (e) => {
    const form = {
      items: formData,
      total: total
    }
    e.preventDefault();
    createTicket(form)
    .then((res) => {
      if(res.status === 200) navigate('/ticket')
    })
    
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
    setFormData([...formData, { id: newId, name: "", price: 0,  quantity: 1  }]);
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
