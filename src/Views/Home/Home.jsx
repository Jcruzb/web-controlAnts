import { Box, Card, Divider, FormControlLabel, Switch, Typography } from "@mui/material"

import { useEffect, useState } from "react"
import PieCharts from "../../Components/Charts/PieCharts";

import { getDebtbyId } from "../../Services/DebtService"
import { getIncomeById } from "../../Services/IncomeService"

import { useAuthContext } from "../../Contexts/AuthContext";
import ResumeDebtTable from "../../Components/ResumeDebtTable/ResumeDebtTable";



const Home = () => {

    const { user } = useAuthContext();

    const [incomes, setIncomes] = useState([])
    const [debts, setDebts] = useState([])
    const [selectResume, setSelectResume] = useState(true)
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const debtPromises = user.debts.map(debt => getDebtbyId(debt));
        const incomePromises = user.incomes.map(income => getIncomeById(income));

        Promise.all([...debtPromises, ...incomePromises])
            .then(results => {
                const debtsResults = results.slice(0, debtPromises.length);
                const incomesResults = results.slice(debtPromises.length);
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

    const handleResumeChange = () => {
        setSelectResume(!selectResume)
    }




    if (loading) {
        return <Box> Loading ...</Box>
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

            <Card>
                <Typography variant="h4">Deudas</Typography>
                <Divider />
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, padding: 2 }}>
                    <PieCharts
                        otherData={
                            debts.map((debt) => {
                                return {
                                    id: debt.id,
                                    name: debt.name,
                                    value: debt.amount,
                                    date: debt.date
                                }
                            })
                        }
                        width={200}
                        height={200}
                    />
                    <ResumeDebtTable debts={debts} />
                </Box>
            </Card>
        </Box>

    );
}

export default Home;


/* 
         
*/