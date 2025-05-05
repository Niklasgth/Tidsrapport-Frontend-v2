import React from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({ children, onClick, type = 'button' }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
