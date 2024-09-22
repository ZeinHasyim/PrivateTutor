import styles from './Button.module.scss';

type Propstypes = {
    type: 'button' | 'submit' | 'reset' | undefined;
    onClick?: () => void;
    children: React.ReactNode;
    variant?: string;
    className?: string;
    disabled?: boolean;
    hidden?: boolean;
}

const Button = (props: Propstypes) => {
    const {type, onClick, children, variant = "primary", className, disabled, hidden } = props;
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`${styles.button} ${styles[variant]} ${className}`}
        disabled={disabled}
        hidden={hidden}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
