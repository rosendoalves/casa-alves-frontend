
import moment from 'moment';
import 'chartjs-adapter-moment';

export const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };
  
  export const formatDateShow = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric'};
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  export const formatDate = (dateString) => {
    return moment(dateString).format('YYYY-MM-DD'); // Ajusta el formato según tus necesidades
  };

  export const formatNumberWithCommas = (number) => {
    return number.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }