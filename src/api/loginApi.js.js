import Swal from "sweetalert2";

export const loginUser = async (credentials) => {
    const url = 'http://localhost:8000/api/auth/login'
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }
    try {
        const response = await fetch(url, params);
        const data = await response.json();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Bienvenido',
            showConfirmButton: false,
            timer: 1500,
        });
        return data;
        
    } catch (error) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ocurrió un error al intentar ingresar',
            showConfirmButton: false,
            timer: 1500,
        });
    }
   }