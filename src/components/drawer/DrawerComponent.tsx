"use client";
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import MedicationIcon from "@mui/icons-material/Medication";
import CategoryIcon from "@mui/icons-material/Category";
import ScienceIcon from "@mui/icons-material/Science";
import BusinessIcon from "@mui/icons-material/Business";
import Toolbar from "@mui/material/Toolbar";
import ResponsiveAdminAppBar from "../app-bar-admin";

const drawerWidth = 240;

interface Props {
  children: React.ReactNode;
}

interface RouteItem {
  label: string;
  path: string;
  Icon: React.ElementType;
}
const dashboardRoutes: RouteItem[] = [
  {
    label: "Dashboard",
    path: "/admin-panel",
    Icon: DashboardIcon,
  },
  {
    label: "Users",
    path: "/admin-panel/users",
    Icon: PeopleIcon,
  },
];
const productsRoutes: RouteItem[] = [
  {
    label: "Products",
    path: "/admin-panel/products",
    Icon: MedicationIcon,
  },
  {
    label: "Categories",
    path: "/admin-panel/categories",
    Icon: CategoryIcon,
  },
  {
    label: "Generics",
    path: "/admin-panel/generics",
    Icon: ScienceIcon,
  },
  {
    label: "Manufacturers",
    path: "/admin-panel/manufacturers",
    Icon: BusinessIcon,
  },
  // Drawer Menu Items
];

export default function ResponsiveDrawer(props: Props) {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [_, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {dashboardRoutes.map(({ label, path: routePath, Icon }) => (
          <ListItem key={label} disablePadding onClick={handleDrawerClose}>
            <ListItemButton href={routePath}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {productsRoutes.map(({ label, path: routePath, Icon }) => (
          <ListItem key={label} disablePadding onClick={handleDrawerClose}>
            <ListItemButton href={routePath}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ResponsiveAdminAppBar
        drawerWidth={drawerWidth}
        setOpenDrawer={setMobileOpen}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
