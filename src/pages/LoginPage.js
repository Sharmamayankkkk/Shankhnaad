import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon, Construction as ConstructionIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Header */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "rgba(10, 10, 10, 0.8)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate("/")} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}>
            <img
              src={process.env.PUBLIC_URL + "/logo.png"}
              alt="Shankhnaad AI"
              style={{ width: 32, height: 32, borderRadius: 8 }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Sign In
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ pt: 16, pb: 8 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MotionCard
            sx={{
              bgcolor: "background.paper",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              textAlign: "center",
              p: 4,
            }}
            whileHover={{ scale: 1.02 }}
          >
            <CardContent>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                <ConstructionIcon sx={{ fontSize: 80, color: "warning.main", mb: 2 }} />
              </motion.div>

              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Coming Soon!
              </Typography>

              <Typography variant="body1" sx={{ color: "text.secondary", mb: 3, lineHeight: 1.8 }}>
                We're currently building our authentication system to provide you with a personalized
                experience. Sign in and sign up features will be available soon!
              </Typography>

              <Box
                sx={{
                  bgcolor: "rgba(168, 197, 255, 0.1)",
                  border: "1px solid rgba(168, 197, 255, 0.3)",
                  borderRadius: 2,
                  p: 3,
                  mb: 3,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "primary.light" }}>
                  What to Expect
                </Typography>
                <Box component="ul" sx={{ textAlign: "left", pl: 3, m: 0 }}>
                  <Typography component="li" variant="body2" sx={{ mb: 1, lineHeight: 1.7 }}>
                    Save your conversations across devices
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ mb: 1, lineHeight: 1.7 }}>
                    Personalized spiritual journey tracking
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ mb: 1, lineHeight: 1.7 }}>
                    Bookmark your favorite verses and insights
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ lineHeight: 1.7 }}>
                    Community features and discussions
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                In the meantime, you can still use Shankhnaad AI without an account. Your conversations will
                be saved locally in your browser.
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/chat")}
                  sx={{
                    bgcolor: "primary.main",
                    color: "#000",
                    "&:hover": { bgcolor: "primary.light" },
                  }}
                >
                  Continue to Chat
                </Button>
                <Button variant="outlined" onClick={() => navigate("/")}>
                  Back to Home
                </Button>
              </Box>
            </CardContent>
          </MotionCard>

          {/* Additional Info */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
              Looking for an account?
            </Typography>
            <Button
              variant="text"
              onClick={() => navigate("/signup")}
              sx={{ color: "primary.main" }}
            >
              Sign Up (Coming Soon)
            </Button>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default LoginPage;
