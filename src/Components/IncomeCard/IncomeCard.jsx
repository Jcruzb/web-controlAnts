/* eslint-disable react/prop-types */
import { Box, Card, Divider, Typography } from "@mui/material";
import PieCharts from "../Charts/PieCharts";
import ResumeIncomeTable from "./ResumeIncomeTable";

const IncomeCard = ({ title, incomes }) => {


    return (
        <Card>
            <Typography variant="h4">{title}</Typography>
            <Divider />
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, padding: 2 }}>
                <ResumeIncomeTable incomes={incomes} />
                <PieCharts
                    otherData={
                        incomes?.map((income) => {
                            return {
                                id: income._id,
                                name: income.source,
                                value: income.amount,
                                date: income.date
                            }
                        })
                    }
                    width={200}
                    height={200}
                />  
            </Box>
        </Card>
    );
};

export default IncomeCard;