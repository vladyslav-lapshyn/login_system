/* eslint-disable react/prop-types */
import { Typography, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import styles from './AuthForm.module.scss';
import { useDispatch } from 'react-redux';
import { loginisation, registraion } from '../../redux/slices/auth';

export const AuthForm = ({ formType, handleModalClose }) => {
  const dispatch = useDispatch();
  const isRegisterFormType = formType === 'register';

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(
      isRegisterFormType ? registraion(values) : loginisation(values),
    );

    if (!data.payload) {
      alert(`${isRegisterFormType ? 'Register' : 'Login'} failed`);
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }

    handleModalClose();
  };

  return <>
    <Typography variant='h2' className={styles.form__title}>
      {isRegisterFormType ? 'Register' : 'Login'}
    </Typography>

    <form className={styles.form__content} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label='Email'
        type='email'
        {...register('email', {required: 'Email field is required'})}
        error={Boolean(errors?.email?.message)}
        helperText={errors.email && 'Email field is required'}
      />

      <TextField
        label='Password'
        type='password'
        {...register('password', {required: 'Password should be at least 6 symbols', minLength: 6})}
        error={Boolean(errors?.password?.message)}
        helperText={errors.password && 'Password should be at least 6 symbols'}
      />

      <Button
        className={styles.form__button}
        disabled={!isValid}
        size='large'
        variant='contained'
        type='submit'
      >
        Submit
      </Button>
    </form>
  </>
}
