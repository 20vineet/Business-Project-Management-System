import * as React from "react";
import {Link, useNavigate} from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Tooltip,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {grey} from "@mui/material/colors";

// Define pages with correct route mappings
const pages = [
  {name: "Home", path: "/home"},
  {name: "Projects", path: "/dashboard"},
  {name: "Events", path: "/events"},
  {name: "Upload", path: "/upload-pdf"},
];

// Settings for the user menu
const settings = ["Account", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate(); // Add navigate hook

  // Handlers for opening/closing menus
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // Handle navigation for account and logout
  const handleUserMenuClick = (setting) => {
    if (setting === "Account") {
      navigate("/account"); // Navigate to the account page
    }
    if (setting === "Logout") {
      // localStorage.setItem("token", "");
      localStorage.removeItem("token");
      localStorage.removeItem("username");

      navigate("/login"); // Navigate to the account page
    }
    // Handle logout if necessary (not implemented here)
    handleCloseUserMenu(); // Close the user menu after selection
  };

  return (
    <AppBar position="sticky" sx={{backgroundColor: grey[900], boxShadow: 0}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* App Name / Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/home"
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FinanceManager
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{vertical: "bottom", horizontal: "left"}}
              transformOrigin={{vertical: "top", horizontal: "left"}}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link
                    to={page.path}
                    style={{textDecoration: "none", color: "black"}}
                  >
                    <Typography>{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: {xs: "none", md: "flex"},
              justifyContent: "flex-end",
            }}
          >
            {pages.map((page) => (
              <Button key={page.name} sx={{my: 2, color: "white"}}>
                <Link
                  to={page.path}
                  style={{textDecoration: "none", color: "white"}}
                >
                  {page.name}
                </Link>
              </Button>
            ))}
          </Box>

          {/* User Menu */}
          <Box sx={{flexGrow: 0}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{mt: "45px"}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{vertical: "top", horizontal: "right"}}
              transformOrigin={{vertical: "top", horizontal: "right"}}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleUserMenuClick(setting)}
                >
                  <Typography sx={{textAlign: "center"}}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
