import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import WeddingInvitation from './pages/WeddingInvitation.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeddingInvitation />} />
        <Route path="/invite/:guestId" element={<WeddingInvitation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
