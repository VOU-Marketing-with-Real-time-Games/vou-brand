import { useLocation, useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import paths from "../../constants/paths";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon />, link: paths.HOME },
  { text: "Campaigns", icon: <CampaignRoundedIcon />, link: paths.CAMPAIGNS },
  { text: "Branches", icon: <StoreRoundedIcon />, link: paths.BRANCHES },
];

export default function MenuContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const selectedIndex = mainListItems.findIndex((item) => item.link === currentPath);

  const handleNavigation = (link: string) => {
    navigate(link);
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} sx={{ display: "block", mt: "10px", px: "5px" }}>
            <ListItemButton selected={index === selectedIndex} onClick={() => handleNavigation(item.link)}>
              <ListItemIcon sx={{ py: "10px" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
