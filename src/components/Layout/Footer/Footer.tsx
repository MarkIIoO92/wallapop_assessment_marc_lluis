import React from 'react';
import '../../../styles/layout/_footer.scss';
import { FooterProps } from '../../../types/FooterProps';

const Footer: React.FC<FooterProps> = ({ companyName, year }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>
          &copy; {year} {companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;