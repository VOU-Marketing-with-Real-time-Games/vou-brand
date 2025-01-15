import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import paths from "../../constants/paths";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: theme.palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center",
  },
}));

const pathNames = {
  [paths.HOME]: "Home",
  [paths.CAMPAIGNS]: "Campaigns",
  [paths.BRANCHES]: "Branches",
};

export default function NavbarBreadcrumbs() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <StyledBreadcrumbs aria-label="breadcrumb" separator={<NavigateNextRoundedIcon fontSize="small" />}>
      <Typography variant="body1">Dashboard</Typography>
      <Typography variant="body1" sx={{ color: "text.primary", fontWeight: 600 }}>
        {pathNames[currentPath] || "Unknown"}
      </Typography>
    </StyledBreadcrumbs>
  );
}