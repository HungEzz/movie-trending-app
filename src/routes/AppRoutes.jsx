import HomePage from '../pages/HomePage'
import MovieDetailPage from '../pages/MovieDetailPage'
import PageNotFound from '../pages/PageNotFound'
import { Routes, Route } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="*" element={<PageNotFound/>} /> 
      </Routes>
  )
}

export default AppRoutes