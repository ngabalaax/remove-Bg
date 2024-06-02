import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Page/HomePage/HomePage'
import DashbroadPage from './Page/DashbroadPage/DashbroadPage'
import { ToastContainer } from 'react-toastify'
// import { AuthProvider } from './AuthContext'
// import Upload from './components/Content/Upload'
// import Setting from './components/Content/Setting'
// import PrivateRoute from './PrivateRoute'

function App() {

  return (
    <>
      {/* <AuthProvider> */}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/dashbroad" element={<DashbroadPage />}  />
          {/* <Route path="/upload" element={<PrivateRoute element={<Upload />} />} />
          <Route path="/setting" element={<PrivateRoute element={<Setting />} />} /> */}
        </Routes>
        <ToastContainer />
      {/* </AuthProvider> */}
    </>
  )
}

export default App
