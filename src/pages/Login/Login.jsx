import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebaseConfig';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Paper,
  Grid,
  ThemeProvider,
  CssBaseline,
  createTheme,
  Fade,
  useMediaQuery
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6D4C41',
    },
    secondary: {
      main: '#A1887F',
    },
    background: {
      default: '#f3efe7',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

const backgroundImage =
  'url(https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1950&q=80)';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

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
      setShow(false);
      setTimeout(() => {
        navigate(email.endsWith('@icesi.edu.co') ? '/home-admin' : '/home');
      }, 500);
    } catch (err) {
      console.error('Error al iniciar sesión:', err.message);
      setError('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: `linear-gradient(rgba(109, 76, 65, 0.6), rgba(243, 239, 231, 0.8)), ${backgroundImage}`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Fade in={show} timeout={700}>
          <Grid container spacing={2} maxWidth="md" sx={{ mx: 'auto', alignItems: 'center' }}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <Typography variant="h4" color="primary" gutterBottom>
                  Login Now
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
                    <Typography color="error" sx={{ mt: 1 }}>
                      {error}
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    color="primary"
                    sx={{
                      mt: 2,
                      fontWeight: 'bold',
                      letterSpacing: 1,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        backgroundColor: 'secondary.main',
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
                      sx={{
                        fontWeight: 'bold',
                        textTransform: 'none',
                        transition: 'color 0.3s ease',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      Regístrate ahora
                    </Button>
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            {!isMobile && (
              <Grid item md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
                <Box
                  sx={{
                    height: '400px',
                    borderRadius: 3,
                    backgroundImage: backgroundImage,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </Grid>
            )}
          </Grid>
        </Fade>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
