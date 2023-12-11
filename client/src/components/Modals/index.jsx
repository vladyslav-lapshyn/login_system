/* eslint-disable react/prop-types */
import { Modal, Box } from '@mui/material';
import styles from './Modals.module.scss';
import { AuthForm } from '../AuthForm';

export const Modals = ({type, handleModalClose}) => (
  <>
    <Modal
      open={type === 'login'}
      onClose={handleModalClose}
    >
      <Box className={styles.formContainer}>
        <AuthForm
          formType={type}
          handleModalClose={handleModalClose}
        />
      </Box>
    </Modal>

    <Modal
      open={type === 'register'}
      onClose={handleModalClose}
    >
      <Box className={styles.formContainer}>
        <AuthForm
            formType={type}
            handleModalClose={handleModalClose}
        />
      </Box>
    </Modal>
  </>
);
