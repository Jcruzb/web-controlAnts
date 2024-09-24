/* eslint-disable react/prop-types */
import { Box, Card, Divider, Typography, MenuItem, Select } from "@mui/material";
import PieCharts from "../Charts/PieCharts"; // Asegúrate de que el componente PieCharts esté adaptado para mostrar datos por categoría
import { useState } from "react";
import ResumeExpenseTable from "./ResumeExpenseTable"; // Crear este nuevo componente para la tabla

const ExpenseCard = ({ title, expenses }) => {

    // Obtener el mes y año actual
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    // Definir estados para mes y año
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    // Filtrar los gastos por mes y año
    const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getFullYear() === selectedYear && expenseDate.getMonth() + 1 === selectedMonth;
    });

    // Transformar los datos para incluir solo la categoría y el monto


    // Manejar el cambio de mes
    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    // Manejar el cambio de año
    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    // Obtener categorías de los gastos y sumar el total por categoría
    const expensesByCategory = filteredExpenses.reduce((acc, expense) => {
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
        <Card>
            <Typography variant="h4">{title}</Typography>
            <Divider />
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, padding: 2 }}>
                {/* Gráfico de torta por categoría */}
                <PieCharts
                    otherData={pieChartData}
                    width={200}
                    height={200}
                />

                {/* Tabla con los gastos filtrados */}
                <ResumeExpenseTable expenses={transformedExpenses} />
            </Box>

            {/* Filtros por mes y año */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
                <Box>
                    <Typography variant="h6">Filtrar por Mes:</Typography>
                    <Select value={selectedMonth} onChange={handleMonthChange}>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                            <MenuItem key={month} value={month}>
                                {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>

                <Box>
                    <Typography variant="h6">Filtrar por Año:</Typography>
                    <Select value={selectedYear} onChange={handleYearChange}>
                        {[currentYear - 1, currentYear, currentYear + 1].map(year => (
                            <MenuItem key={year} value={year}>{year}</MenuItem>
                        ))}
                    </Select>
                </Box>
            </Box>
        </Card>
    );
};

export default ExpenseCard;