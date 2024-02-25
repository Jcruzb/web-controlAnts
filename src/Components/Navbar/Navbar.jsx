import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import TypeSpecimenIcon from '@mui/icons-material/TypeSpecimen';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import TimelineIcon from '@mui/icons-material/Timeline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Typography } from '@mui/material';



// eslint-disable-next-line react/prop-types
const Navbar = ({content}) => {

    const menus = [
        {
            text: 'home',
            name: 'inicio',
            icon: <HomeIcon />,
        },
        {
            text: 'products',
            name: 'productos',
            icon: <ShoppingCartIcon />,
        },
        {
            text: 'categorys',
            name: 'categorías',
            icon: <TypeSpecimenIcon />,
        },
        {
            text: 'expenses',
            name: 'gastos',
            icon: <EuroSymbolIcon />,
        },
        {
            text: 'history',
            name: 'historial',
            icon: <TimelineIcon />,
        }   
    ]


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
      >
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Contador de Hormigas
            </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {menus.map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton href={`/${text.text}`}>
                <ListItemIcon>
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
}

export default Navbar;

