import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  Fade,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import {
  Chat as ChatIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Book as BookIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const features = [
    {
      icon: <BookIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Bhagavad Gita Wisdom",
      description: "Access ancient wisdom from the Bhagavad Gita with AI-powered search and insights",
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Instant Answers",
      description: "Get quick, relevant answers to your spiritual questions in real-time",
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Secure & Private",
      description: "Your conversations are private and stored securely on your device",
    },
  ];

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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}>
            <img
              src={process.env.PUBLIC_URL + "/logo.png"}
              alt="Shankhnaad AI"
              style={{ width: 32, height: 32, borderRadius: 8 }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Shankhnaad AI
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            {!isMobile && (
              <>
                <Button color="inherit" onClick={() => navigate("/about")}>
                  About
                </Button>
                <Button color="inherit" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
              </>
            )}
            <Button
              variant="contained"
              startIcon={<ChatIcon />}
              onClick={() => navigate("/chat")}
              sx={{
                bgcolor: "primary.main",
                color: "#000",
                "&:hover": { bgcolor: "primary.light" },
              }}
            >
              Start Chat
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: { xs: 12, md: 16 }, pb: 8 }}>
        <Fade in timeout={1000}>
          <Box sx={{ textAlign: "center" }}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                <Box
                  sx={{
                    position: "relative",
                    width: { xs: 80, md: 120 },
                    height: { xs: 80, md: 120 },
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      borderRadius: "30%",
                      opacity: 0.3,
                    }}
                  />
                  <img
                    src={process.env.PUBLIC_URL + "/logo.png"}
                    alt="Shankhnaad AI"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      borderRadius: "20%",
                    }}
                  />
                </Box>
              </Box>

              <Typography
                variant={isMobile ? "h3" : "h2"}
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Discover Spiritual Wisdom
              </Typography>

              <Typography
                variant={isMobile ? "h6" : "h5"}
                sx={{ mb: 4, color: "text.secondary", maxWidth: 800, mx: "auto" }}
              >
                Your AI-powered guide to the Bhagavad Gita. Ask questions, explore verses, and
                gain spiritual insights from ancient wisdom.
              </Typography>

              <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ChatIcon />}
                  onClick={() => navigate("/chat")}
                  sx={{
                    bgcolor: "primary.main",
                    color: "#000",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    "&:hover": { bgcolor: "primary.light" },
                  }}
                >
                  Start Chatting
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/about")}
                  sx={{
                    borderColor: "primary.main",
                    color: "primary.main",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </MotionBox>
          </Box>
        </Fade>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mb: 6, fontWeight: 600 }}
        >
          Why Choose Shankhnaad AI?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                sx={{
                  height: "100%",
                  bgcolor: "background.paper",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 4 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About Section */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <MotionBox
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            Krishna Consciousness Society
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "text.secondary", lineHeight: 1.8 }}>
            Shankhnaad AI is brought to you by the Krishna Consciousness Society, dedicated to
            sharing the timeless wisdom of the Bhagavad Gita. Our mission is to make spiritual
            knowledge accessible to everyone through modern technology.
          </Typography>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/about")}
            sx={{ borderColor: "primary.main", color: "primary.main" }}
          >
            Learn About Us
          </Button>
        </MotionBox>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          py: 4,
          mt: 8,
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <img
                  src={process.env.PUBLIC_URL + "/logo.png"}
                  alt="Shankhnaad AI"
                  style={{ width: 24, height: 24, borderRadius: 4 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Shankhnaad AI
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Your spiritual guide powered by AI. Bringing ancient wisdom to the modern world.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Quick Links
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Button
                  sx={{ justifyContent: "flex-start", color: "text.secondary" }}
                  onClick={() => navigate("/about")}
                >
                  About Us
                </Button>
                <Button
                  sx={{ justifyContent: "flex-start", color: "text.secondary" }}
                  onClick={() => navigate("/chat")}
                >
                  Chat
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Legal
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Button
                  sx={{ justifyContent: "flex-start", color: "text.secondary" }}
                  onClick={() => navigate("/privacy")}
                >
                  Privacy Policy
                </Button>
                <Button
                  sx={{ justifyContent: "flex-start", color: "text.secondary" }}
                  onClick={() => navigate("/terms")}
                >
                  Terms of Service
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, pt: 4, borderTop: "1px solid rgba(255, 255, 255, 0.1)", textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              © {new Date().getFullYear()} Krishna Consciousness Society. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
