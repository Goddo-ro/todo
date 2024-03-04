import { ButtonHTMLAttributes, FC } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = (props) => {
    return (
        <button 
            {...props}
            className={[props.className, styles['button']].join(' ')}></button>
    )
}

export default Button;
