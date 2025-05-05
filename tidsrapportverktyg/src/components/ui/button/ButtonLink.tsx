import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

type ButtonLinkProps = {
  to: string;
  children: React.ReactNode;
};

const ButtonLink = ({ to, children }: ButtonLinkProps) => {
  return (
    <Link to={to} className={styles.button}>
      {children}
    </Link>
  );
};

export default ButtonLink;
