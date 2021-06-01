import React from 'react';
import { Link } from 'react-router-dom';

export default function FormWrapper(props) {
  const { children, text, linkText, link } = props;
  return (
    <>
      <div className="row justify-content-center h-100 align-items-center">
        <div className="col-md-6 col-xl-4">
          <div className="card shadow-sm">
            <div className="card-body p-4 text-center">{children}</div>
            <div className="card-footer text-muted py-3 text-center">
              {text}
              &nbsp;
              <Link to={link}>{linkText}</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
