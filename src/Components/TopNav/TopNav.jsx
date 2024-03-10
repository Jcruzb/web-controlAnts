import PropTypes from "prop-types";
import BellIcon from "@heroicons/react/24/solid/BellIcon";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import {
  Avatar,
  Box,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Tooltip,
} from "@mui/material";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useState } from "react";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { logout } from "../../stores/AccessTokenStore";


const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = ({onNavOpen}) => {
 
  const { user } = useAuthContext();

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: "primary.main",
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            <IconButton onClick={onNavOpen}>
              <SvgIcon fontSize="small">
                <Bars3Icon />
              </SvgIcon>
            </IconButton>
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Tooltip title="Contacts">
              <Link href="/#/users" sx={{ textDecoration: "none" }}>
                <IconButton>
                  <SvgIcon fontSize="small">
                    <UsersIcon />
                  </SvgIcon>
                </IconButton>
              </Link>
            </Tooltip>
            <Link href="/notifications" sx={{ color: "white" }}>
              <Tooltip title="Notifications">
                <IconButton>
                <SvgIcon fontSize="small">
                        <BellIcon />
                      </SvgIcon>
                </IconButton>
              </Tooltip>
            </Link>
            <SimpleListMenu
              avatar={user.avatar}
              method={logout}
            />

          </Stack>
        </Stack>
      </Box>
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};





// eslint-disable-next-line react/prop-types
const SimpleListMenu = ({ avatar, method }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };



  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List component="nav" aria-label="Device settings">
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <Avatar
            href={avatar}
            sx={{
              cursor: "pointer",
              height: 40,
              width: 40,
            }}
            src={avatar}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        <MenuItem onClick={() => method()}>
          <Link href="/" sx={{ color: "black", textDecoration:"none" }} >
            Logout
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}

