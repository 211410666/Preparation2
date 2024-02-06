import { BrowserRouter, Routes, Route } from "react-router-dom";
import SampleOut from './pages/SampleOut';
import SearchReport from './pages/SearchReport';
import Capacity from './pages/Capacity';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/SampleOut' element={<SampleOut/>}/>
        <Route path='/SearchReport' element={<SearchReport/>}/>
        <Route path='/Capacity' element={<Capacity/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
