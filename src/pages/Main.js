import React from 'react';
import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <>
      <h1>Main page</h1>
      <Link to="/login">Go Login</Link>
    </>
  );
}
