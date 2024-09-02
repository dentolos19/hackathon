"use client";

import { useAuth } from "@/components/providers/auth-provider";
import LoadingView from "@/components/views/loading-view";
import LoginView from "@/components/views/login-view";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ForumIcon from "@mui/icons-material/Forum";
import MenuIcon from "@mui/icons-material/Menu";
import SchoolIcon from "@mui/icons-material/School";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const links = [
  {
    label: "Learn",
    icon: <SchoolIcon />,
    href: "/app",
  },
  {
    label: "Shop",
    icon: <ShoppingCartIcon />,
    href: "/app/shop",
  },
  {
    label: "Community",
    icon: <ForumIcon />,
    href: "/app/community",
  },
];

export default function AppContainer(props: { children: React.ReactNode }) {
  const auth = useAuth();
  const [open, setOpen] = useState(false);

  if (auth.loading) return <LoadingView />;
  if (!auth.user) return <LoginView />;

  return (
    <Box className={"h-full flex"}>
      <AppBar className={"fixed z-20"}>
        <Toolbar>
          <Tooltip title={"Menu"} placement={"right"}>
            <IconButton
              className={"mr-1"}
              sx={{
                display: { xs: "block", sm: "none" },
              }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Typography component={"div"} className={"flex-1 font-bold text-2xl"}>
            Pennywise
          </Typography>
          <Tooltip title={"Profile"} placement={"left"}>
            <IconButton LinkComponent={Link} href={"/app/profile"}>
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        className={"z-10 w-[200px] [&>.MuiDrawer-paper]:w-[200px]"}
        sx={{ display: { xs: "none", sm: "block" } }}
        variant={"permanent"}
      >
        <Toolbar />
        <Box>
          <List>
            {links.map((link) => (
              <ListItem key={link.label} disablePadding>
                <ListItemButton LinkComponent={Link} href={link.href}>
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Drawer
        className={"w-[200px] [&>.MuiDrawer-paper]:w-[200px]"}
        sx={{ display: { xs: "block", sm: "none" } }}
        variant={"temporary"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          {links.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton LinkComponent={Link} href={link.href}>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box className={"flex-1 grid grid-rows-[auto,1fr]"}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}