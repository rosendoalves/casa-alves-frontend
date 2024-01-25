import { redirect } from "react-router-dom";
import Swal from "sweetalert2";

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    const data = await response.json();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Bienvenido",
      showConfirmButton: false,
      timer: 1500,
    });
    return data;
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Ocurrió un error al intentar ingresar",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  redirect("login")
};
