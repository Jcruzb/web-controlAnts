/* eslint-disable react/prop-types */
import { Box, Card, Divider, Typography } from "@mui/material";
import PieCharts from "../Charts/PieCharts";
import ResumeIncomeTable from "./ResumeIncomeTable";

const IncomeCard = ({ title, incomes }) => {
  return (
    <Card sx={{ width: '100%', p: 2, mb: 2 }}>
      <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
        {title}
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          alignItems: 'center'
        }}
      >
        <ResumeIncomeTable incomes={incomes} />
        <PieCharts
          otherData={incomes?.map(income => ({
            id: income._id,
            name: income.source,
            value: income.amount,
            date: income.date
          }))}
          width={200}
          height={200}
        />
      </Box>
    </Card>
  );
};

export default IncomeCard;