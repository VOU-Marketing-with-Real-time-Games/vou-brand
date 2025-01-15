import { forwardRef, useState } from "react";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useQuery, useMutation } from "@tanstack/react-query";
import { IFullUser } from "../../types/user.type";
import userApi from "../../api/user.api";
import toast from "react-hot-toast";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Card = styled(MuiCard)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.background.default,
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "30%",
  maxHeight: "98%",
  height: "fit-content",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("md")]: {
    width: "40%",
  },
  ...(theme.applyStyles &&
    theme.applyStyles("dark", {
      backgroundColor: theme.palette.background.paper,
      boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    })),
}));

interface AccountInforProps {
  userId: string | number;
  onSuccess: () => void;
}

const renderRole = (
  role: string,
  isEditing: boolean,
  setIsEditing: (value: boolean) => void,
  handleChange: (event: any) => void,
) => {
  const roleColors: { [index: string]: "primary" | "secondary" | "default" } = {
    ADMIN: "primary",
    BRAND: "secondary",
    USER: "default",
  };

  return isEditing ? (
    <Select value={role} onChange={handleChange} size="small" variant="outlined">
      <MenuItem value="ADMIN">ADMIN</MenuItem>
      <MenuItem value="BRAND">BRAND</MenuItem>
      <MenuItem value="USER">USER</MenuItem>
    </Select>
  ) : (
    <>
      <Chip label={role} color={roleColors[role] || "default"} size="small" />
      <IconButton size="small" sx={{ marginLeft: "0.5rem", border: "0" }} onClick={() => setIsEditing(true)}>
        <EditOutlinedIcon fontSize="small" />
      </IconButton>
    </>
  );
};

const renderStatus = (
  status: string,
  isEditing: boolean,
  setIsEditing: (value: boolean) => void,
  handleChange: (event: any) => void,
) => {
  const colors: { [index: string]: "success" | "default" | "error" } = {
    ACTIVE: "success",
    INACTIVE: "default",
    BANNED: "error",
  };

  return isEditing ? (
    <Select value={status} onChange={handleChange} size="small" variant="outlined">
      <MenuItem value="ACTIVE">ACTIVE</MenuItem>
      <MenuItem value="INACTIVE">INACTIVE</MenuItem>
      <MenuItem value="BANNED">BANNED</MenuItem>
    </Select>
  ) : (
    <>
      <Chip label={status} color={colors[status]} size="small" />
      <IconButton size="small" sx={{ marginLeft: "0.5rem", border: "0" }} onClick={() => setIsEditing(true)}>
        <EditOutlinedIcon fontSize="small" />
      </IconButton>
    </>
  );
};

const AccountDetails = forwardRef<HTMLDivElement, AccountInforProps>(({ userId, onSuccess }, ref) => {
  const [user, setUser] = useState<IFullUser>();
  const [originalRole, setOriginalRole] = useState<string>("");
  const [originalStatus, setOriginalStatus] = useState<string>("");
  const [currentRole, setCurrentRole] = useState<string>("");
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [isEditingStatus, setIsEditingStatus] = useState(false);

  useQuery({
    queryKey: ["get-user"],
    queryFn: async () => {
      try {
        const fetchedUser = await userApi.getUserById(userId);
        setUser(fetchedUser);
        setOriginalRole(fetchedUser.role);
        setOriginalStatus(fetchedUser.status);
        setCurrentRole(fetchedUser.role);
        setCurrentStatus(fetchedUser.status);
        return fetchedUser;
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch user data");
      }
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (data: IFullUser) => userApi.updateUser(userId, data),
    onError: () => {
      toast.error("Failed to update user data");
    },
    onSuccess: () => {
      toast.success("User updated successfully");
      setOriginalRole(currentRole);
      setOriginalStatus(currentStatus);
      onSuccess();
    },
  });

  const handleRoleChange = (event: any) => {
    setCurrentRole(event.target.value);
    setIsEditingRole(false);
  };

  const handleStatusChange = (event: any) => {
    setCurrentStatus(event.target.value);
    setIsEditingStatus(false);
  };

  const validateFields = () => {
    const validRoles = ["ADMIN", "BRAND", "USER"];
    const validStatuses = ["ACTIVE", "INACTIVE", "BANNED"];

    if (!validRoles.includes(currentRole)) {
      toast.error("Invalid role selected");
      return false;
    }

    if (!validStatuses.includes(currentStatus)) {
      toast.error("Invalid status selected");
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (validateFields() && user) {
      updateUserMutation.mutate({ ...user, role: currentRole, status: currentStatus });
    }
  };

  const hasChanges = currentRole !== originalRole || currentStatus !== originalStatus;

  return (
    <Card ref={ref} variant="outlined">
      <Typography component="h1" variant="h5" sx={{ width: "100%", fontSize: "1.5rem", textAlign: "center" }}>
        ACCOUNT INFORMATION
      </Typography>
      {user ? (
        <>
          <Avatar alt={user.fullName} src={user.avatar} sx={{ width: 100, height: 100, margin: "0 auto" }} />
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>User ID</TableCell>
                  <TableCell>{user.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>Full Name</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>Email</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>Username</TableCell>
                  <TableCell>{user.username}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>Role</TableCell>
                  <TableCell>{renderRole(currentRole, isEditingRole, setIsEditingRole, handleRoleChange)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>Phone Number</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>Status</TableCell>
                  <TableCell>
                    {renderStatus(currentStatus, isEditingStatus, setIsEditingStatus, handleStatusChange)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {hasChanges && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Typography component="p" variant="body1" sx={{ width: "100%", textAlign: "center" }}>
          Loading...
        </Typography>
      )}
    </Card>
  );
});

AccountDetails.displayName = "AccountInfor";

export default AccountDetails;
