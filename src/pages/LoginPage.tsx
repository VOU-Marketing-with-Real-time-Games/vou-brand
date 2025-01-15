import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { useContext } from "react";
import AppTheme from "../theme/shared-theme/AppTheme.tsx";
import { Box, Checkbox, CssBaseline, FormControlLabel, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ColorModeIconDropdown from "../theme/shared-theme/ColorModeIconDropdown.tsx";
import logo from "../assets/image/logo.png";
import DocumentMeta from "react-document-meta";
import metadata from "../utils/metadata";
import { AuthContext } from "../context/AuthContext.tsx";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "../utils/rules";
import { useMutation } from "@tanstack/react-query";
import authApi from "../api/auth.api";
import brandApi from "../api/brand.api";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { setToken } from "../utils/helper";
import { useNavigate, Navigate } from "react-router-dom";
import path from "../constants/paths.ts";
import { ILoginUserRes, IFullUser } from "../types/user.type";
import "../hooks/useQueryString";

type FormData = LoginSchema;

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage: "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage: "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const LoginPage = () => {
  const { auth, changeAuth } = useContext(AuthContext)!;

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const signinMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body),
    onError: (error: AxiosError) => {
      toast.error(error instanceof AxiosError ? error.message : "Something went wrong");
    },
    onSuccess: async (response: ILoginUserRes) => {
      setToken(response.accessToken, response.refreshToken);
      const profile: IFullUser = await authApi.profile();
      const brand = await brandApi.getBrandByUserId(profile.id);
      changeAuth({ ...profile, brand });
      toast.success("Login successfully");
      navigate(path.HOME);
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (signinMutation.isPending) return;
    signinMutation.mutate(data);
  };

  if (auth != null) {
    return <Navigate to={path.HOME} replace />;
  }

  return (
    <DocumentMeta {...metadata.loginMeta}>
      <AppTheme themeComponents={null} disableCustomTheme={false}>
        <CssBaseline enableColorScheme />
        <SignInContainer direction="column" justifyContent="space-between">
          <Box sx={{ position: "fixed", top: "1rem", right: "1rem" }}>
            <ColorModeIconDropdown />
          </Box>
          <Card variant="outlined">
            <Box
              component="a"
              href="/"
              sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center" }}
            >
              <img src={logo} alt="Logo" style={{ height: 70 }} />
              <Typography component="h1" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
                Sign in
              </Typography>
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.username}
                      helperText={errors.username?.message}
                      id="username"
                      type="text"
                      placeholder="username"
                      autoFocus
                      required
                      fullWidth
                      variant="outlined"
                      color={errors.username ? "error" : "primary"}
                    />
                  )}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      id="password"
                      type="password"
                      placeholder="••••••"
                      autoComplete="current-password"
                      required
                      fullWidth
                      variant="outlined"
                      color={errors.password ? "error" : "primary"}
                    />
                  )}
                />
              </FormControl>
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
              <Button type="submit" fullWidth variant="contained">
                Sign in
              </Button>
            </Box>
            <Divider>or</Divider>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography sx={{ textAlign: "center" }}>
                Don&apos;t have an account?{" "}
                <Link href="/" variant="body2" sx={{ alignSelf: "center" }}>
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Card>
        </SignInContainer>
      </AppTheme>
    </DocumentMeta>
  );
};

export default LoginPage;
