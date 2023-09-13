import React from 'react';
import '../../../styles/layout/_header.scss';

function Header() {
  return (
    <header className="header" data-testid="header">
      <div className="header__logo">
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" className="header__logo-image"/>
      </div>
    </header>
  );
}

export default Header;