import styles from './Modal.module.css';

type ModalProps = {
    children?: JSX.Element,
    onClose: () => void,
}

const Modal = ({children, onClose}: ModalProps) => {
    return (
        <div className={styles['modal-container']}>
            <div className={styles['modal']}>
                <span className={styles['modal__close']} onClick={onClose}>x</span>
                {children}
            </div>
        </div>
    )
}

export default Modal;