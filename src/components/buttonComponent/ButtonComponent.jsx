/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import './buttonComponent.css';

function ButtonComponent({
  type, cancel, text, action, icon, size,
}) {
  return (
    <>
      { type === 'button' && (
      <button
        type="button"
        className={`button-component ${cancel ? 'cancel' : 'confirm'} ${size}`}
        onClick={action}
      >
        {' '}
        {text}
        {' '}
        {icon}
      </button>
      )}

      { type === 'submit' && (
        <input
          type="submit"
          className={`button-component ${cancel ? 'cancel' : 'confirm'} ${size}`}
          value={text}
          onClick={action}
        />
      )}

      { type === 'link' && (
        <Link
          to={action}
          className={`button-component ${cancel ? 'cancel' : 'confirm'} ${size}`}
        >
          {text}
        </Link>
      )}

    </>
  );
}

export default ButtonComponent;
