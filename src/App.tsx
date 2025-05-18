
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SongDetail from "./pages/SongDetail";
import NotFound from "./pages/NotFound";
import PlaylistPage from "./pages/PlaylistPage";
import GenrePage from "./pages/GenrePage";
import PodcastPage from "./pages/PodcastPage";
import MadeForYouPage from "./pages/MadeForYouPage";
import MediaPlayer from "./components/MediaPlayer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/song/:id" element={<SongDetail />} />
          <Route path="/playlist/:id" element={<PlaylistPage />} />
          <Route path="/genre/:id" element={<GenrePage />} />
          <Route path="/podcasts/:slug" element={<PodcastPage />} />
          <Route path="/made-for-you/:slug" element={<MadeForYouPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MediaPlayer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
