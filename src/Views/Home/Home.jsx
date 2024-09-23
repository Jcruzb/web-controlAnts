import { Box, Card, Divider, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import PieCharts from "../../Components/Charts/PieCharts";

import { getDebtbyId } from "../../Services/DebtService"
import { getIncomeById } from "../../Services/IncomeService"

import { useAuthContext } from "../../Contexts/AuthContext";


const Home = () => {

    const { user } = useAuthContext();
    console.log(user)

    const [users, setUsers] = useState([]);
    const [incomes, setIncomes] = useState([])
    const [debts, setDebts] = useState([])
    const [debtsToShow, setDebtsToShow] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Crear arrays con las promesas de deudas e ingresos
      const debtPromises = user.debts.map(debt => getDebtbyId(debt));
      const incomePromises = user.incomes.map(income => getIncomeById(income));
  
      // Usar Promise.all para esperar a todas las promesas
      Promise.all([...debtPromises, ...incomePromises])
        .then(results => {
          const debtsResults = results.slice(0, debtPromises.length); // Separar las deudas
          const incomesResults = results.slice(debtPromises.length); // Separar los ingresos
          setDebts(debtsResults);
          setIncomes(incomesResults);
        })
        .catch(error => {
          console.error('Error fetching debts or incomes:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [user]);

        console.log(debts)




 





    if (loading) {
        return <Box> Loading ...</Box>
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', padding: 3, gap: 2 }}>
                <Typography variant="h3">Resumen de deudas</Typography>
            </Box>
 
            {/* <Box>
                <Typography variant="h4">Deudas</Typography>
                <PieCharts
                    otherData={debts}
                    width={200}
                    height={200}
                />
            </Box> */}
        </Box>

    );
}

export default Home;


/* 
         
*/