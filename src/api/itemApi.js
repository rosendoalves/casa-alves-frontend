import Swal from "sweetalert2";
import useToken from "../hooks/useToken";

const useItemApi = () => {
  const { token, setToken } = useToken();

  const getItems = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/items/getItems`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token.userToken}` },
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
        title: "Sin items",
        showConfirmButton: false,
        timer: 1500,
      });
      throw error;
    }
  };

  const updateItems = async (form) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/items/createItem`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",  
            Authorization: `Bearer ${token.userToken}` 
          },
          body: JSON.stringify(form)
        }
      );
      const data = await response.json();
      if (data.status !== 200) {
        throw new Error("El servidor respondió con un estado no exitoso.");
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Items actualizados correctamente",
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
        title: "Items no actualizados",
        showConfirmButton: false,
        timer: 1500,
      });
      return error;
    }
  };

  return {
    getItems,
    updateItems
  };
};

export default useItemApi;
