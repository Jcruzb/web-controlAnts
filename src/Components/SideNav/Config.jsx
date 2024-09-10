import HomeIcon from '@mui/icons-material/Home';
import TypeSpecimenIcon from '@mui/icons-material/TypeSpecimen';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import TimelineIcon from '@mui/icons-material/Timeline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';


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
  }
];
