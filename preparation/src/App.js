import { BrowserRouter, Routes, Route } from "react-router-dom";
import SampleOut from './pages/SampleOut';
import SearchReport from './pages/SearchReport';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/SampleOut' element={<SampleOut/>}/>
        <Route path='/SearchReport' element={<SearchReport/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
