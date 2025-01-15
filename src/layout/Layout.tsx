import AppNavbar from "../components/layout/AppNavbar.tsx";
import AppTheme from "../theme/shared-theme/AppTheme.tsx";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "../theme/customizations";
import { Box, CssBaseline } from "@mui/material";
import SideMenu from "../components/layout/SideMenu.tsx";
import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header.tsx";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

const Layout = () => {
  return (
    <AppTheme themeComponents={xThemeComponents} disableCustomTheme={false}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: `rgba(${theme.palette.background.default} / 1)`,
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Outlet />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
};

export default Layout;
