import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUnit } from 'effector-react';
import { loginFx } from '@/store/auth';
import { FormValue } from './types';
import Input from '@/components/UI/Input/Input';
import Button from '@/components/UI/Button/Button';
import ErrorText from '@/components/UI/ErrorText/ErrorText';
import styles from './Auth.module.css';

const Login = () => {
    const loginEffect = useUnit(loginFx);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<FormValue>();

    return (
        <form className={styles['form']} onSubmit={handleSubmit(loginEffect)}>
            <h2 className={styles['form__title']}>Sign in to HabitHUB</h2>
            <div className={styles['form__bottom']}>
            <Input 
                    placeholder='Username' 
                    {...register('username', {
                        required: {
                            value: true,
                            message: 'Обязательное поле',
                        },
                    })}
                    isInvalid={!!errors.username}
                />
                {errors.username && 
                    <ErrorText text={errors.username.message?.toString()} 
                                className={styles['form__error']}
                />}
                <Input 
                    type='password' 
                    placeholder='Password' 
                    {...register('password', {
                        required: {
                            value: true,
                            message: 'Обязательное поле',
                        },
                        minLength: {
                            value: 4,
                            message: 'Пароль должен содержать как минимум 4 символа',
                        },
                    })} 
                    isInvalid={!!errors.password}
                />
                {errors.password && 
                    <ErrorText text={errors.password.message?.toString()} 
                                className={styles['form__error']}
                />}
                <span>Don't have an account? <Link to='/auth/register'>Sign Up</Link></span>
                <Button className={styles['form__button']}>Sign In</Button>
            </div>
        </form>
    )
}

export default Login;