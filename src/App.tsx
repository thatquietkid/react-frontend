import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { InventoryProvider } from './context/InventoryContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <InventoryProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </InventoryProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;