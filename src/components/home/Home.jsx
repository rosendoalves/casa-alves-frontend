import React from 'react';
import './home.css';
import place from '../assets/negocio.png'
import duck from '../assets/pato.gif'

const Home = () => {

  return (
    <div className="container home">
      <div>
      <h1>
     Bienvenido a Casa Alves!
      </h1>
      <img 
      src={place}
      className='img-fluid business'
      />
      </div>
      <div className='container text-center'>
      <img 
      src={duck}
      className='img-fluid duck'
      />
      <p>Tranquilo loquito! Estamos trabajando</p>
      </div>
    </div>
  );
};

export default Home;
