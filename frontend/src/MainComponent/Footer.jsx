import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="text-light py-2 mt-auto border py-5 w-100" style={{ backgroundColor: "#0F1C25" }}>

        <div className="row">
          <div className="col-12 text-center">
            <p className="small mb-1">
              © 2025 TaskBoard. All rights reserved.
            </p>
            <span className=" x-small">
              Made with ❤️ for fun <br></br> by Sabrina Cinque
            </span>
          </div>
        </div>
    
    </footer>
  );
}
