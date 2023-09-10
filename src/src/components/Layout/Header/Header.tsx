import React from 'react';
import '../../../styles/layout/_header.scss';

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" className="header__logo-image"/>
      </div>
      <div className="header__title">
        {/* Include your title here */}
      </div>
      <div className="header__search">
        {/* Include your search box here */}
      </div>
    </header>
  );
}

export default Header;