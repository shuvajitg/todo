
import { BrowserRouter, Routes, Route } from "react-router-dom"

import TodoPage from "./pages/TodoPage"

function App() {

  // use router make more page 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
