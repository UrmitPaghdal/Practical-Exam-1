import { BrowserRouter, Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import Add from "./Pages/Add"
import View from "./Pages/View"
import Edit from "./Pages/Edit"

function App() {


  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Add/>}/>
        <Route path="/view" element={<View/>}/>
        <Route path="/edit" element={<Edit/>}/>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
