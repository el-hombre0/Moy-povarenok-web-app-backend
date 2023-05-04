import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import {Home, AddDish, FullDish, Login, Registration} from './pages';

import Container from '@mui/material/Container';
function App() {
  return (
    <>
      <Header></Header>
      <Container maxWidth="lg">
        <Home></Home>
      </Container>
      <Footer></Footer>
    </>
    
  );
}

export default App;
