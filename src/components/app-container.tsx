"use client";

import { useAuth } from "@/components/auth-provider";
import LoadingPage from "@/components/loading-page";
import LoginPage from "@/components/login-page";
import { AccountCircle, Book, School, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";

const links = [
  {
    label: "Learn",
    icon: <School />,
    href: "/app",
  },
  {
    label: "Quests",
    icon: <Book />,
    href: "/app/quests",
  },
  {
    label: "Shop",
    icon: <ShoppingCart />,
    href: "/app/shop",
  },
  {
    label: "Profile",
    icon: <AccountCircle />,
    href: "/app/profile",
  },
];

export default function AppContainer(props: { children: React.ReactNode }) {
  const auth = useAuth();
  if (auth.loading) return <LoadingPage />;
  if (!auth.user) return <LoginPage />;
  return (
    <Box className={"h-full grid grid-cols-[200px,1fr]"}>
      <AppBar className={"fixed z-20"}>
        <Toolbar>
          <Typography component={"div"} className={"flex-1"} variant={"h6"}>
            Pennywise
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer className={"z-10 [&>div]:static"} variant={"permanent"}>
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
      <Box className={"grid grid-rows-[auto,1fr]"}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}