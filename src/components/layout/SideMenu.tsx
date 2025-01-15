import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuContent from "./MenuContent.tsx";
import OptionsMenu from "./OptionsMenu.tsx";
import logo from "../../assets/image/logo.png";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

const drawerWidth = "18%";

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function SideMenu() {
  const { auth } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="button"
          onClick={handleLogoClick}
          sx={{ display: "flex", alignItems: "center", justifyItems: "center", background: "none", border: "none", cursor: "pointer" }}
        >
          <img src={logo} alt="Logo" style={{ height: 70 }} />
        </Box>
      </Box>
      <Divider />
      <MenuContent />
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Avatar alt={auth.username} src={auth.avatar} sx={{ width: 36, height: 36 }} />{" "}
        <Box sx={{ mr: "auto" }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: "16px" }}>
            {auth.fullName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {auth.role}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {auth.email}
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}