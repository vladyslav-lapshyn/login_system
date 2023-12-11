import { Box, Typography, Button } from '@mui/material';
import styles from './Home.module.scss';
import { Modals } from '../../components/Modals';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData, isAuthSelector, logout } from '../../redux/slices/auth';

export const Home = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const [showModalType, setShowModalType] = useState(null);

  const handleLogoutClick = () => {
    if (window.confirm('Are you sure that you want to logout?')) {
      dispatch(logout());
    }
  }

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      dispatch(fetchUserData());
    }
  }, [dispatch])

  return (
    <Box className={styles.container}>
      {isAuth && (
        <>
          <Typography variant='h3'>
            You are logged in!
          </Typography>

          <Typography variant='h3'>
            User Email: {userEmail}
          </Typography>
        </>
      )}

      <Box className={styles.buttonsContainer}>
        {isAuth ? (
          <Button
            variant='contained'
            onClick={handleLogoutClick}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              variant='contained'
              onClick={() => setShowModalType('login')}
            >
              Log In
            </Button>

            <Button
              variant='contained'
              onClick={() => setShowModalType('register')}
            >
              Register
            </Button>
          </>
        )}

        <Modals
          type={showModalType}
          handleModalClose={() => setShowModalType(null)}
        />
      </Box>
    </Box>
  )
}
