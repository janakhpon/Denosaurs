import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout'
import { DinoProvider } from './Context'
export default function App() {
  return (
    <BrowserRouter>
      <DinoProvider>
        <Layout />
      </DinoProvider>
    </BrowserRouter>
  );
}
