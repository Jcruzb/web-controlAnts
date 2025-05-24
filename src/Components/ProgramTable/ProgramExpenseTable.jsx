/* eslint-disable react/prop-types */
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const ProgramExpenseTable = ({ rows }) => {
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 2 }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="tabla de gastos">
                    <TableHead>
                        <TableRow>
                            <TableCell>Descripción</TableCell>
                            <TableCell align="right">Monto (€)</TableCell>
                            <TableCell align="right">Tipo</TableCell>
                            <TableCell align="right">Categoría</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.description}</TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell align="right">{row.kind}</TableCell>
                                <TableCell align="right">{row.category}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ProgramExpenseTable;
