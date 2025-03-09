import { useEffect, useState } from "react";
import { getDebtsByIds } from "../../Services/DebtService";
import { getIncomesByIds } from "../../Services/IncomeService";
import { useAuthContext } from "../../Contexts/AuthContext";
import DebtCard from "../../Components/DebtCard/DebtCard";
import IncomeCard from "../../Components/IncomeCard/IncomeCard";
import ExpenseCard from "../../Components/ExpenseCard/ExpenseCard"; // Para gastos

const Home = () => {
  const { user } = useAuthContext();
  const [debts, setDebts] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Supongamos que 'user.debts' y 'user.incomes' son arrays de ids.
    const debtIds = user.debts || [];
    const incomeIds = user.incomes || [];
    // Para gastos, se mantiene la lógica actual u otro endpoint similar.
    
    Promise.all([
      getDebtsByIds(debtIds),
      getIncomesByIds(incomeIds)
    ])
      .then(([debtsResponse, incomesResponse]) => {
        setDebts(debtsResponse);
        setIncomes(incomesResponse);
        // Aquí puedes seguir con gastos o implementar lógica similar para ellos.
      })
      .catch(error => {
        console.error('Error fetching summary data:', error);
      })
      .finally(() => setLoading(false));
  }, [user]);



  if (loading) return <div>Loading...</div>;

  return (
    <>
      <DebtCard title="Deudas" debts={debts} />
      <IncomeCard title="Ingresos" incomes={incomes} />
      <ExpenseCard title="Gastos"  />
    </>
  );
};

export default Home;