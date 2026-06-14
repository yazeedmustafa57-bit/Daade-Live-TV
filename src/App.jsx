import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import OneShows from './pages/OneShows'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/1shows" element={<OneShows />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
