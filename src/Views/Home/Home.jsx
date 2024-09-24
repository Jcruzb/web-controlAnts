import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getDebtbyId } from "../../Services/DebtService";
import { getIncomeById } from "../../Services/IncomeService";
import { getExpenseName } from "../../Services/ExpenseService";
import { useAuthContext } from "../../Contexts/AuthContext";
import { getUser } from "../../Services/UsersService";
import DebtCard from "../../Components/DebtCard/DebtCard";
import IncomeCard from "../../Components/IncomeCard/IncomeCard";
import ExpenseCard from "../../Components/ExpenseCard/ExpenseCard"; // Nuevo componente de gastos

const Home = () => {

    const { user } = useAuthContext();
    const [incomes, setIncomes] = useState([]);
    const [debts, setDebts] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [selectResume, setSelectResume] = useState(false);
    const [data, setData] = useState({
        debts: [],
        incomes: [],
        expenses: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user.family?.members?.length) {
            const incomesToData = [];
            const debtsToData = [];
            const expensesToData = [];

            const familyMembers = user.family.members.map(member => member.user);

            Promise.all(familyMembers.map(member => getUser(member)))
                .then(responses => {
                    responses.forEach(response => {
                        incomesToData.push(...response.incomes);
                        debtsToData.push(...response.debts);
                        expensesToData.push(...response.expenses);
                    });

                    setData({
                        debts: debtsToData,
                        incomes: incomesToData,
                        expenses: expensesToData
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            setData({
                debts: user.debts,
                incomes: user.incomes,
                expenses: user.expenses
            });
        }
    }, [user]);

    useEffect(() => {
        let debtPromises = [];
        let incomePromises = [];
        let expensePromises = [];

        if (!selectResume) {
            debtPromises

 = data?.debts.map(debt => getDebtbyId(debt));
            incomePromises = data?.incomes.map(income => getIncomeById(income));
            expensePromises = data?.expenses.map(expense => getExpenseName(expense));
        } else {
            debtPromises = user?.debts.map(debt => getDebtbyId(debt));
            incomePromises = user?.incomes.map(income => getIncomeById(income));
            expensePromises = user?.expenses.map(expense => getExpenseName(expense));
        }

        if (data.debts.length || data.incomes.length || data.expenses.length) {
            Promise.all([...debtPromises, ...incomePromises, ...expensePromises])
                .then(results => {
                    const debtsResults = results.slice(0, debtPromises.length);
                    const incomesResults = results.slice(debtPromises.length, debtPromises.length + incomePromises.length);
                    const expensesResults = results.slice(debtPromises.length + incomePromises.length);
                    setDebts(debtsResults);
                    setIncomes(incomesResults);
                    setExpenses(expensesResults);
                })
                .catch(error => {
                    console.error('Error fetching debts, incomes, or expenses:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [data, selectResume, user]);

    const handleResumeChange = () => {
        setSelectResume(!selectResume);
    }

    if (loading) {
        return <Box> Loading ...</Box>;
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', padding: 3, gap: 2 }}>
                <Typography variant="h3">Resumen</Typography>
                {user.family ?
                    <>
                        <Typography variant="h5">Familia: {user.family.familyName}</Typography>
                        <FormControlLabel
                            control={
                                <Switch checked={selectResume.personal} onChange={(e) => handleResumeChange(e)} name="resume" />
                            }
                            label={selectResume ? 'Personal' : 'Familiar'}
                        />
                    </>
                    : null}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 3 }}>
                <DebtCard title="Deudas" debts={debts} />
                <IncomeCard title="Ingresos" incomes={incomes} />
                <ExpenseCard title="Gastos" expenses={expenses} /> {/* Nuevo componente de gastos */}
            </Box>
        </Box>

    );
}

export default Home;