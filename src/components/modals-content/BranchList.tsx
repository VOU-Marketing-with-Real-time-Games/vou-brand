import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import { forwardRef, useState } from "react";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import branchApi from "../../api/branch.api";
import { IBranch } from "../../types/branch.type";
import toast from "react-hot-toast";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BranchMap from "./BranchMap";

const Card = styled(MuiCard)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.background.default,
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "60%",
  height: "fit-content",
  maxHeight: "98%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "60%",
  },
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

interface BranchListProps {
  brandId: string | number;
}

const BranchList = forwardRef<HTMLDivElement, BranchListProps>(({ brandId }, ref) => {
  const [branches, setBranches] = useState<IBranch[]>([]);

  useQuery({
    queryKey: ["get-branches-by-brand-id", brandId],
    queryFn: async () => {
      try {
        const fetchedBranches = await branchApi.getBranchesByBrandId(Number(brandId));
        setBranches(fetchedBranches);
        return fetchedBranches;
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch branches data");
      }
    },
  });

  return (
    <Card ref={ref}>
      <Typography component="h1" variant="h5" sx={{ width: "100%", fontSize: "1.5rem", textAlign: "center" }}>
        Branch List
      </Typography>
      {branches.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "primary" }}>Branch ID</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "primary" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "primary" }}>Address</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "primary" }}>Map</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {branches.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell>{branch.id}</TableCell>
                  <TableCell>{branch.name}</TableCell>
                  <TableCell>{branch.address}</TableCell>
                  <TableCell sx={{ width: "400px" }}>
                    <BranchMap branch={branch} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography component="p" variant="body1" sx={{ width: "100%", textAlign: "center" }}>
          No branches found.
        </Typography>
      )}
    </Card>
  );
});

BranchList.displayName = "BranchList";
export default BranchList;
