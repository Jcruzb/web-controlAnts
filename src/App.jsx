import { Route, Routes } from 'react-router'
import './App.css'
import Login from './Views/Login/Login'
import NotFound from './Views/NotFound/NotFound'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Home from './Views/Home/Home';
import { useAuthContext } from './Contexts/AuthContext';
import Category from './Views/Category/Category';
import Expense from './Views/Expense/Expense';
import CategoryForm from './Views/Category/CategoryForm';
import ExpenseForm from './Views/Expense/ExpenseForm';
import Debt from './Views/Debt/Debt';
import DebtForm from './Views/Debt/DebtForm';
import Users from './Views/Users/Users';
import UsersForm from './Views/Users/UsersForm';
import Incomes from './Views/Incomes/Incomes';
import IncomeForm from './Views/Incomes/IncomesForm';
import Program from './Views/Program/Program';

function App() {
  const { isAuthenticationFetched } = useAuthContext();

  if (!isAuthenticationFetched) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      {/* not found */}
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />

        {/* Categorys */}
        <Route path="/categorys" element={<Category />} />
        <Route path="/category/add" element={<CategoryForm />} />
        <Route path="/categorys/:id" element={<h1>Categoria</h1>} />
        <Route path="/categorys/:id/edit" element={<h1>Editar Categoria</h1>} />
        {/* Expenses */}
        <Route path="/expenses" element={<Expense />} />
        <Route path="/expenses/add" element={<ExpenseForm />} />
        <Route path="/expenses/:id" element={<h1>Gasto</h1>} />
        <Route path="/expenses/:id/edit" element={<h1>Editar Gasto</h1>} />
        {/* Debts */}
        <Route path="/debts" element={<Debt />} />
        <Route path="/debt/add" element={<DebtForm />} />
        <Route path="/debts/:id" element={<h1>Deuda</h1>} />
        <Route path="/debts/:id/edit" element={<h1>Editar Deuda</h1>} />

        {/* Incomes */}
        <Route path="/incomes" element={<Incomes />} />
        <Route path="/income/add" element={<IncomeForm />} />
        <Route path="/incomes/:id" element={<h1>Deuda</h1>} />
        <Route path="/income/edit/:id" element={<IncomeForm />} />

        {/*Program*/}
        <Route path="/program" element={<Program />} />

        {/* Users */}
        <Route path="/users" element={<Users />} />
        <Route path="/user/add" element={<UsersForm />} />
        <Route path="/users/:id" element={<h1>Usuario</h1>} />
        <Route path="/users/:id/edit" element={<h1>Editar Usuario</h1>} />

      </Route>

    </Routes>
  )
}

export default App
