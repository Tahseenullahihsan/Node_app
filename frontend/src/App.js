import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddUser from './components/AddUser';
import UserList from './components/UserList';
import UserLogin from './components/UserLogin';
import MonthlyReport from './components/MonthlyReport';
import BillForm from './components/BillForm';
import SaleForm from './components/SaleForm';
import AmplifierForm from './components/AmplifierForm';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">User List</Link> |{" "}
          <Link to="/add-user">Add User</Link> |{" "}
          <Link to="/login">Login</Link> |{" "}
          <Link to="/bill-generate">BillForm</Link> |{" "}
          <Link to="/monthly-report">MonthlyReport</Link> |{" "}
          <Link to="/sale">SaleForm</Link> |{" "}
          <Link to="/add-amplifier">AmplifierForm</Link>
        </nav>

        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/monthly-report" element={<MonthlyReport />} />
          <Route path="/bill-generate" element={<BillForm />} />
          <Route path="/sale" element={<SaleForm />} />
          <Route path="/add-amplifier" element={<AmplifierForm />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
