/* eslint-disable react/prop-types */
import { Box, Card, Divider, Typography, MenuItem, Select } from "@mui/material";
import { useState, useEffect } from "react";
import ResumeExpenseTable from "./ResumeExpenseTable";
import PieCharts from "../Charts/PieCharts";
import { getExpensesByMonth } from "../../Services/ExpenseService"; // Nuevo servicio

const ExpenseCard = ({ title }) => {
  // Fecha actual para filtros predeterminados (por ejemplo, marzo 2025)
  const currentDate = new Date();
  const defaultYear = currentDate.getFullYear();
  const defaultMonth = currentDate.getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Se consulta al back cada vez que cambian los filtros
  useEffect(() => {
    setLoading(true);
    getExpensesByMonth(selectedMonth, selectedYear)
      .then((res) => {
        setExpenses(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [selectedMonth, selectedYear]);

  // Agrupar gastos por categoría para gráfico y tabla
  const expensesByCategory = expenses.reduce((acc, expense) => {
    const categoryName = expense.category?.name || 'Sin categoría';
    if (!acc[categoryName]) {
      acc[categoryName] = { amount: 0, category: categoryName };
    }
    acc[categoryName].amount += expense.amount;
    return acc;
  }, {});

  const transformedExpenses = Object.values(expensesByCategory);
  const pieChartData = transformedExpenses.map(item => ({
    name: item.category,
    value: item.amount
  }));

  return (
    <Card sx={{ width: '100%', p: 2, mb: 2 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {loading ? (
        <Typography>Cargando gastos...</Typography>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            alignItems: 'center'
          }}
        >
          <PieCharts otherData={pieChartData} width={200} height={200} />
          <ResumeExpenseTable expenses={transformedExpenses} />
        </Box>
      )}
      {/* Filtros por mes y año */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          mt: 2
        }}
      >
        <Box>
          <Typography variant="h6">Filtrar por Mes:</Typography>
          <Select
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
              <MenuItem key={month} value={month}>
                {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box>
          <Typography variant="h6">Filtrar por Año:</Typography>
          <Select
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
          >
            {[defaultYear - 1, defaultYear, defaultYear + 1].map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </Card>
  );
};

export default ExpenseCard;