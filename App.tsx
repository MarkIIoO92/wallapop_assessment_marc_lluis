import React from 'react';
import ItemManager from './components/ItemManager';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import ScrollTopButton from './components/Layout/ScrollTopButton';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import '@fortawesome/fontawesome-free/css/regular.css';
import '@fortawesome/fontawesome-free/css/brands.css';



function App() {
  return (
    <div>
      <Header />
      <ItemManager />
      <Footer companyName="WallaMarc" year={new Date().getFullYear()} />
      <ScrollTopButton />
    </div>
  );
}

export default App;