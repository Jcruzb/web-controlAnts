import HomeIcon from '@mui/icons-material/Home';
import TypeSpecimenIcon from '@mui/icons-material/TypeSpecimen';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import TimelineIcon from '@mui/icons-material/Timeline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


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
    title: "Productos",
    href: "/#/products",
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingCartIcon />
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
    title: "Historial",
    href: "/#/history",
    icon: (
      <SvgIcon fontSize="small">
        <TimelineIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Deudas",
    href: "/#/debts",
    icon: (
      <SvgIcon fontSize="small">
        <TimelineIcon />
      </SvgIcon>
    ),
  }
];
