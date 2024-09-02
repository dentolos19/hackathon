"use client";

import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
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
    icon: <QuestionMarkIcon />,
    href: "/app",
  },
  {
    label: "Quests",
    icon: <QuestionMarkIcon />,
    href: "/app/quests",
  },
  {
    label: "Shop",
    icon: <QuestionMarkIcon />,
    href: "/app/shop",
  },
  {
    label: "Profile",
    icon: <QuestionMarkIcon />,
    href: "/app/profile",
  },
];

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <Box className={"h-dvh grid grid-cols-[200px,1fr]"}>
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