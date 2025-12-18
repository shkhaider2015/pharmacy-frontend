"use client";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import useAuth from "@/services/auth/use-auth";
import useAuthActions from "@/services/auth/use-auth-actions";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "@/services/i18n/client";
import Link from "@/components/link";
import ThemeSwitchButton from "@/components/switch-theme-button";

interface Props {
  drawerWidth?: number;
  setOpenDrawer: (boolean: boolean) => void;
}

function ResponsiveAdminAppBar(props: Props) {
  const { drawerWidth, setOpenDrawer } = props;
  const { t } = useTranslation("common");
  const { user, isLoaded } = useAuth();
  const { logOut } = useAuthActions();

  const [anchorElementUser, setAnchorElementUser] =
    useState<null | HTMLElement>(null);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElementUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElementUser(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {t("common:app-name")}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenDrawer}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {t("common:app-name")}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }} />

          <Box
            sx={{
              display: "flex",
              mr: 1,
            }}
          >
            <ThemeSwitchButton />
          </Box>

          {!isLoaded ? (
            <CircularProgress color="inherit" />
          ) : (
            user && (
              <>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Profile menu">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                      data-testid="profile-menu-item"
                    >
                      <Avatar
                        alt={user?.firstName + " " + user?.lastName}
                        src={user.photo?.path}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: 5.5 }}
                    id="menu-appbar"
                    anchorEl={anchorElementUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElementUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      component={Link}
                      href="/profile"
                      data-testid="user-profile"
                    >
                      <Typography textAlign="center">
                        {t("common:navigation.profile")}
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        logOut();
                        handleCloseUserMenu();
                      }}
                      data-testid="logout-menu-item"
                    >
                      <Typography textAlign="center">
                        {t("common:navigation.logout")}
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            )
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAdminAppBar;
