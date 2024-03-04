import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    isInvalid?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(({isInvalid, ...rest}, ref) => {
    return (
        <div 
            data-invalid={isInvalid} 
            className={[styles['container'], 
                isInvalid && styles['container_invalid']].join(' ')}
        >
            <input ref={ref} className={styles['input']} {...rest} />
        </div>
    )
})

export default Input;