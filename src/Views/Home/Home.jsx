import { Box, FormControlLabel, Switch, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getDebtbyId } from "../../Services/DebtService"
import { getIncomeById } from "../../Services/IncomeService"
import { useAuthContext } from "../../Contexts/AuthContext";
import { getUser } from "../../Services/UsersService";
import DebtCard from "../../Components/DebtCard/DebtCard";

const Home = () => {

    const { user } = useAuthContext();
    const [incomes, setIncomes] = useState([])
    const [debts, setDebts] = useState([])
    const [selectResume, setSelectResume] = useState(false)
    const [data, setData] = useState({
        debts: [],
        incomes: []
    })
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user.family?.members?.length) {
            const incomesToData = [];
            const debtsToData = [];

            const familyMembers = user.family.members.map(member => member.user);

            Promise.all(familyMembers.map(member => getUser(member)))
                .then(responses => {
                    responses.forEach(response => {
                        incomesToData.push(...response.incomes);
                        debtsToData.push(...response.debts);
                    });

                    setData({
                        debts: debtsToData,
                        incomes: incomesToData
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            setData({
                debts: user.debts,
                incomes: user.incomes
            });
        }
    }, [user]);

    useEffect(() => {
        let debtPromises = [];
        let incomePromises = [];

        if (!selectResume) {
            debtPromises = data?.debts.map(debt => getDebtbyId(debt));
            incomePromises = data?.incomes.map(income => getIncomeById(income));
        } else {
            debtPromises = user?.debts.map(debt => getDebtbyId(debt));
            incomePromises = user?.incomes.map(income => getIncomeById(income));
        }

        if (data.debts.length || data.incomes.length) {
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
        }
    }, [data, selectResume, user]);

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
            <DebtCard title="Deudas" debts={debts} />
        </Box>

    );
}

export default Home;


/* 
         
*/