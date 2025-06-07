import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebaseConfig';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Fade,
  TextField,
  Typography,
  Paper,
  ThemeProvider,
  createTheme,
} from '@mui/material';

// Paleta personalizada
const theme = createTheme({
  palette: {
    primary: {
      main: '#713001',
    },
    secondary: {
      main: '#925a1a',
    },
    background: {
      default: '#f5f3ea',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

const backgroundImage =
  'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80)';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
      });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: email,
        username: username,
      });

      setShow(false); // Para animación de salida

      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (err) {
      console.error('Error al registrar usuario:', err.message);
      setError(err.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: `${backgroundImage ? `linear-gradient(rgba(113,48,1,0.7), rgba(245,243,234,0.8)), ${backgroundImage}` : 'none'}`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CssBaseline />
        <Fade in={show} timeout={700}>
          <Container maxWidth="xs">
            <Paper
              elevation={8}
              sx={{
                p: { xs: 2, sm: 4 },
                borderRadius: 3,
                backgroundColor: 'rgba(255,255,255,0.95)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Typography variant="h4" align="center" color="primary" gutterBottom>
                Sign up Now
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  color="primary"
                  autoFocus
                />
                <TextField
                  label="Username"
                  type="text"
                  fullWidth
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  color="primary"
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  color="primary"
                />
                {error && (
                  <Typography color="error" sx={{ mt: 1, mb: 1 }}>
                    {error}
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 2,
                    mb: 1,
                    fontWeight: 'bold',
                    letterSpacing: 1,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      backgroundColor: 'secondary.main',
                      transform: 'scale(1.03)',
                    },
                  }}
                >
                  Sign Up
                </Button>
                <Typography align="center" sx={{ mt: 2 }}>
                  ¿Ya tienes cuenta?{' '}
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={() => navigate('/')}
                    sx={{ textTransform: 'none', fontWeight: 'bold' }}
                  >
                    Login now
                  </Button>
                </Typography>
              </Box>
            </Paper>
          </Container>
        </Fade>
      </Box>
    </ThemeProvider>
  );
};

export default Signup;