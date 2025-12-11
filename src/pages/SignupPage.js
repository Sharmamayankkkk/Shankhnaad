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

const SignupPage = () => {
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
              Sign Up
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
                We're excited to welcome new members to the Shankhnaad AI community! Our registration system
                is currently under development and will be available soon.
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
                  Benefits of Creating an Account
                </Typography>
                <Box component="ul" sx={{ textAlign: "left", pl: 3, m: 0 }}>
                  <Typography component="li" variant="body2" sx={{ mb: 1, lineHeight: 1.7 }}>
                    Sync conversations across all your devices
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ mb: 1, lineHeight: 1.7 }}>
                    Access premium features and content
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ mb: 1, lineHeight: 1.7 }}>
                    Create and manage bookmarks and favorites
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ mb: 1, lineHeight: 1.7 }}>
                    Join our community of spiritual seekers
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ lineHeight: 1.7 }}>
                    Receive personalized recommendations
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  bgcolor: "rgba(255, 152, 0, 0.1)",
                  border: "1px solid rgba(255, 152, 0, 0.3)",
                  borderRadius: 2,
                  p: 2,
                  mb: 3,
                }}
              >
                <Typography variant="body2" sx={{ color: "warning.light", lineHeight: 1.7 }}>
                  <strong>Good News:</strong> You don't need an account to start using Shankhnaad AI! You
                  can begin your spiritual journey right now, and your conversations will be saved locally
                  in your browser.
                </Typography>
              </Box>

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
                  Start Using Shankhnaad AI
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
              Already have an account?
            </Typography>
            <Button
              variant="text"
              onClick={() => navigate("/login")}
              sx={{ color: "primary.main" }}
            >
              Sign In (Coming Soon)
            </Button>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default SignupPage;
