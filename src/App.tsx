import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LibraryPage from './pages/LibraryPage';
import GenrePage from './pages/GenrePage';
import InstrumentPage from './pages/InstrumentPage';
import SongPage from './pages/songPage';
import PlaylistPage from './pages/PlaylistPage';
import MediaPlayer from './components/MediaPlayer';
import { Toaster } from 'sonner';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/genre/:id" element={<GenrePage />} />
          <Route path="/instrument/:id" element={<InstrumentPage />} />
          <Route path="/song/:id" element={<SongPage />} />
          <Route path="/playlist/:slug" element={<PlaylistPage />} />
        </Routes>
        <MediaPlayer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
};

export default App;