import HomeIcon from '@mui/icons-material/Home';
import TypeSpecimenIcon from '@mui/icons-material/TypeSpecimen';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


import { SvgIcon } from "@mui/material";



export const items = [
  {
    title: "Inicio",
    href: "/#/home",
    icon: (
      <SvgIcon fontSize="small">
        <HomeIcon />
      </SvgIcon>
    ),
  }
  ,
  {
    title: "Categorías",
    href: "/#/categorys",
    icon: (
      <SvgIcon fontSize="small">
        <TypeSpecimenIcon />
      </SvgIcon>
    ),
  }
  ,
  {
    title: "Gastos",
    href: "/#/expenses",
    icon: (
      <SvgIcon fontSize="small">
        <EuroSymbolIcon />
      </SvgIcon>
    ),
  }
  ,
  {
    title: "Deudas",
    href: "/#/debts",
    icon: (
      <SvgIcon fontSize="small">
        <CreditScoreIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Ingresos",
    href: "/#/incomes",
    icon: (
      <SvgIcon fontSize="small">
        <PointOfSaleIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Programa",
    href: "/#/program",
    icon: (
      <SvgIcon fontSize="small">
        <CalendarMonthIcon />
      </SvgIcon>
    ),
  },
];
