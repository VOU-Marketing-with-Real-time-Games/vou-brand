import metadata from "../../utils/metadata";
import DocumentMeta from "react-document-meta";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import BranchesDataGrid from "../../components/tables/BranchesDataGrid.tsx";

const BranchesPage = () => {
  return (
    <DocumentMeta {...metadata.brandsMeta}>
      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
        <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            Brands
          </Typography>
          <Grid size={{ xs: 12, lg: 12 }}>
            <BranchesDataGrid />
          </Grid>
        </Grid>
      </Box>
    </DocumentMeta>
  );
};

export default BranchesPage;
