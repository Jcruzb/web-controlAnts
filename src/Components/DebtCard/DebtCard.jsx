/* eslint-disable react/prop-types */
// src/Components/CustomCard.js
import { Box, Card, Divider, Typography } from "@mui/material";
import PieCharts from "../Charts/PieCharts";
import ResumeDebtTable from "./ResumeDebtTable";


const DebtCard = ({ title, debts }) => {
    return (
        <Card>
            <Typography variant="h4">{title}</Typography>
            <Divider />
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, padding: 2 }}>
                <PieCharts
                    otherData={
                        debts?.map((debt) => {
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
    );
};

export default DebtCard;