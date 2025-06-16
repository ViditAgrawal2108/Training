// import React from 'react';
// import NavBar from './components/navbar';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ProductsTable from './ProductsTable'; 

// function App() {
//   return (
//     <div>
//       <Router>
//         <NavBar />
//         <div className="row">
//           <div className="col-sm-10 col-xs-12 mr-auto ml-auto mt-4 mb-4">
//             <ProductsTable />
//           </div>
//         </div>
//       </Router>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Shop from './pages/Shop';
import ManagerDashboard from './pages/ManagerDashboard';
import Cart from './pages/Cart';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;
  return children;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/manager/dashboard" element={<ManagerDashboard/> } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
