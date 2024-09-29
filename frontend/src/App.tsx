import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blogs from './pages/Blogs'
import CreateBlog from './pages/CreateBlog'
import Blog from './pages/Blog'

function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Signin />} />
          <Route path='/blogs/' element={<Blogs />} />
          <Route path='/blogs/:id' element={<Blog />} />
          <Route path='/create' element={<CreateBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
