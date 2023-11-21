import { Button, Stack, Typography, TextField, Divider } from "@mui/material";
import { IconSVG } from "../components";

const SignUpPage = () => {
  return (
    <Stack
      height="100%"
      direction="row"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        borderRadius: "20px",
      }}
    >
      <Stack
        sx={{
          width: "30%",
          backgroundColor: "#f96f5c",
          borderTopLeftRadius: "20px",
          borderBottomLeftRadius: "20px",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          gap: "20px",
        }}
      >
        <Typography fontWeight="bold" variant="h4">
          Welcome back
        </Typography>
        <Typography fontSize="18px">
          To keep connected please <br /> login with personal info
        </Typography>{" "}
        <br />
        <Button
          sx={{
            color: "#fff",
            padding: "12px 32px",
            border: "1px solid #fff ",
          }}
        >
          Sign In
        </Button>
      </Stack>

      <Stack
        sx={{
          width: "30%",
          borderRadius: 1.25,
          display: "flex",
          justifyContent: "center",
          // marginTop: "30px",
          boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
          padding: "20px",
        }}
        gap={5}
      >
        <Stack gap={3}>
          <Typography variant="h5">Sign Up</Typography>
          <Stack gap={2.5}>
            <TextField name="email" label="Email" placeholder="Email" />
            <TextField
              name="password"
              label="Password"
              placeholder="Password"
            />
          </Stack>
        </Stack>

        <Stack gap={1.75}>
          <Button color="error" variant="contained">
            Large
          </Button>
          <Typography variant="contentSRegular" align="center" component="div">
            By clicking sign up, you agree to our{" "}
            <Typography
              variant="contentSLink"
              component="a"
              href="#"
              target="_blank"
              color="grey.800"
            >
              Terms
            </Typography>{" "}
            and
            <Typography
              variant="contentSLink"
              component="a"
              href="#"
              target="_blank"
              color="grey.800"
            >
              Privacy Policy
            </Typography>
          </Typography>
        </Stack>
        <Stack direction="column" gap={2}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Divider sx={{ flex: 1 }} />
            <Typography>Or sign up with</Typography>
            <Divider sx={{ flex: 1 }} />
          </Stack>
          <Stack
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
            gap={{ xs: 1.5, sm: 2 }}
          >
            <Button
              variant="outlined"
              size="large"
              sx={{ flexGrow: 1 }}
              startIcon={<IconSVG name="google" imgSvg />}
            >
              Google
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{ flexGrow: 1 }}
              startIcon={<IconSVG name="facebook" imgSvg />}
            >
              Facebook
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SignUpPage;
