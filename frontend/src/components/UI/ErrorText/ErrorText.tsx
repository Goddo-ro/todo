import styles from './ErrorText.module.css';

type ErrorText = {
    text?: string,
    className?: string,
}

const ErrorText = ({text, className}: ErrorText) => {
    return (
        <p className={[styles['error'], className].join(' ')}>
            {text}
        </p>
    )
}

export default ErrorText;