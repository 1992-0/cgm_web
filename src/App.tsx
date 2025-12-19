import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/layouts/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Products from '@/pages/Products';
import Contact from '@/pages/Contact';
import ScrollToTop from '@/components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
