import { forwardRef } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import userApi from "../../api/user.api";
import { IUserCreate } from "../../types/user.type";
import toast from "react-hot-toast";

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
  height: "fit-content",
  maxHeight: "98%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("md")]: {
    width: "40%",
  },
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

interface AddAccountFormProps {
  onSuccess: () => void;
}

const AddAccountForm = forwardRef<HTMLDivElement, AddAccountFormProps>(({ onSuccess }, ref) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserCreate>({
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
      role: "",
    },
  });

  const createUserMutation = useMutation({
    mutationFn: (data: IUserCreate) => userApi.createUserByAdmin(data),
    onError: (error: any) => {
      if (!error.errors || error.errors.length === 0) {
        toast.error("Something went wrong");
        return;
      }
      error.errors.forEach((err: any) => {
        toast.error(err);
      });
    },
    onSuccess: () => {
      toast.success("User created successfully");
      onSuccess();
    },
  });

  const onSubmit: SubmitHandler<IUserCreate> = (data) => {
    createUserMutation.mutate(data);
  };

  return (
    <Card ref={ref} variant="outlined">
      <Typography component="h1" variant="h5" sx={{ width: "100%", fontSize: "1.5rem", textAlign: "center" }}>
        CREATE NEW ACCOUNT
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControl>
          <FormLabel htmlFor="fullName">Full name</FormLabel>
          <Controller
            name="fullName"
            control={control}
            rules={{ required: "Name is required." }}
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete="name"
                fullWidth
                id="fullName"
                placeholder="Jon Snow"
                error={!!errors.fullName}
                helperText={errors.fullName ? (errors.fullName.message as string) : ""}
                color={errors.fullName ? "error" : "primary"}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Controller
            name="username"
            control={control}
            rules={{
              required: "Username is required.",
              pattern: { value: /^[A-Za-z0-9]+$/, message: "Username can only contain alphanumeric characters." },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete="username"
                fullWidth
                id="username"
                placeholder="jonsnow"
                error={!!errors.username}
                helperText={errors.username ? (errors.username.message as string) : ""}
                color={errors.username ? "error" : "primary"}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required.",
              pattern: { value: /\S+@\S+\.\S+/, message: "Please enter a valid email address." },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="email"
                placeholder="your@email.com"
                autoComplete="email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email ? (errors.email.message as string) : ""}
                color={errors.email ? "error" : "primary"}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required.",
              minLength: { value: 6, message: "Password must be at least 6 characters long." },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password ? (errors.password.message as string) : ""}
                color={errors.password ? "error" : "primary"}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: "PhoneNumber is required." }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                name="phoneNumber"
                id="phoneNumber"
                placeholder="1234567890"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber ? (errors.phoneNumber.message as string) : ""}
                color={errors.phoneNumber ? "error" : "primary"}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="role">Role</FormLabel>
          <Controller
            name="role"
            control={control}
            rules={{ required: "Role is required." }}
            render={({ field }) => (
              <Select {...field} fullWidth id="role" error={!!errors.role} displayEmpty defaultValue="">
                <MenuItem value="" disabled>
                  Select Role
                </MenuItem>
                <MenuItem value="ADMIN">ADMIN</MenuItem>
                <MenuItem value="BRAND">BRAND</MenuItem>
                <MenuItem value="USER">USER</MenuItem>
              </Select>
            )}
          />
          {errors.role && (
            <Typography sx={{ marginLeft: "1rem" }} color="error">
              {errors.role.message as string}
            </Typography>
          )}
        </FormControl>
        <Button type="submit" fullWidth variant="contained">
          Create
        </Button>
      </Box>
    </Card>
  );
});

AddAccountForm.displayName = "AddAccountForm";

export default AddAccountForm;
