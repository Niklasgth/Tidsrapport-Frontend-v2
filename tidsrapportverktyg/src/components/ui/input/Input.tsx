import React from 'react';
import styles from './Input.module.css';

type InputProps = {
  label?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean; 
};

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false, // Sätter standardvärde för disabled till false
}: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
        disabled={disabled} // Skickar vidare disabled till input-elementet
      />
    </div>
  );
};

export default Input;
