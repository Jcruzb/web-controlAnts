/* eslint-disable react/prop-types */
import { Box, Card, Divider, Typography } from "@mui/material";
import PieCharts from "../Charts/PieCharts";
import ResumeDebtTable from "./ResumeDebtTable";

const DebtCard = ({ title, debts }) => {
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
        <PieCharts
          otherData={debts?.map(debt => ({
            id: debt.id,
            name: debt.name,
            value: debt.amount,
            date: debt.date
          }))}
          width={200}
          height={200}
        />
        <ResumeDebtTable debts={debts} />
      </Box>
    </Card>
  );
};

export default DebtCard;