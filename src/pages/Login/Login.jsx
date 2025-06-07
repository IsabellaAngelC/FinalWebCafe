import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebaseConfig';
import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  Fade,
  FormControlLabel,
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
      main: '#713001', // Café oscuro
    },
    secondary: {
      main: '#925a1a', // Café claro
    },
    background: {
      default: '#f5f3ea', // Fondo claro
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

const backgroundImage =
  'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80)'; // Imagen de café de Unsplash

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        alert('Usuario no encontrado');
        return;
      }

      if (rememberMe) {
        localStorage.setItem('userData', JSON.stringify({ email, password }));
      }

      setShow(false); // Para animación de salida

      setTimeout(() => {
        if (email.endsWith('@icesi.edu.co')) {
          navigate('/home-admin');
        } else {
          navigate('/home');
        }
      }, 500);
    } catch (err) {
      console.error('Error al iniciar sesión:', err.message);
      setError('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
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
                p: 4,
                borderRadius: 3,
                backgroundColor: 'rgba(255,255,255,0.95)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Typography variant="h4" align="center" color="primary" gutterBottom>
                Login Now
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
                  autoFocus
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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Remember me"
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
                  Login
                </Button>
                <Typography align="center" sx={{ mt: 2 }}>
                  ¿No tienes cuenta?{' '}
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={() => navigate('/signup')}
                    sx={{ textTransform: 'none', fontWeight: 'bold' }}
                  >
                    Regístrate ahora
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

export default Login;