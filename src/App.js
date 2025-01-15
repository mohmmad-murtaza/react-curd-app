
import { AppRoutes } from '../src/Routes/AppRoutes';
import Header from './components/Header';
import "./App.css"
import { Footer } from './components/Footer';
function App() {
  return (
  <>
<Header/>
  <AppRoutes/>
  <Footer/>
  </>
  );
}

export default App;