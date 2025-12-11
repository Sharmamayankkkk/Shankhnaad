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
  Grid,
  Avatar,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon, Chat as ChatIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const AboutPage = () => {
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
              About Us
            </Typography>
          </Box>
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
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ pt: 12, pb: 8 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Hero Section */}
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <Avatar
                src={process.env.PUBLIC_URL + "/logo.png"}
                sx={{ width: 100, height: 100, borderRadius: 3 }}
              />
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Krishna Consciousness Society
            </Typography>
            <Typography variant="h6" sx={{ color: "text.secondary", maxWidth: 800, mx: "auto" }}>
              Bringing Ancient Wisdom to the Modern World
            </Typography>
          </Box>

          {/* Mission Section */}
          <Card
            sx={{
              mb: 4,
              bgcolor: "background.paper",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
                Our Mission
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                The Krishna Consciousness Society is dedicated to sharing the timeless wisdom and teachings
                of the Bhagavad Gita with people around the world. Our mission is to make spiritual knowledge
                accessible, understandable, and applicable to modern life through innovative technology.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                We believe that the profound teachings found in the Bhagavad Gita can provide guidance,
                peace, and purpose to anyone seeking spiritual growth and self-realization.
              </Typography>
            </CardContent>
          </Card>

          {/* About Shankhnaad AI */}
          <Card
            sx={{
              mb: 4,
              bgcolor: "background.paper",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
                About Shankhnaad AI
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                Shankhnaad AI is our flagship project that combines artificial intelligence with spiritual
                wisdom. The name "Shankhnaad" comes from Sanskrit, meaning "the sound of the conch shell" -
                a sacred sound that marks the beginning of something auspicious and divine.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                Our AI-powered platform allows you to:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  Search and explore verses from the Bhagavad Gita
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  Ask questions about spiritual concepts and receive relevant guidance
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  Discover interpretations and purports from authentic sources
                </Typography>
                <Typography component="li" variant="body1" sx={{ lineHeight: 1.8 }}>
                  Learn at your own pace with an intuitive, conversational interface
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Values Section */}
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 4, textAlign: "center" }}>
            Our Values
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  bgcolor: "background.paper",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Authenticity
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                    We stay true to the original teachings and interpretations of the Bhagavad Gita,
                    ensuring accuracy and spiritual integrity in all our content.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  bgcolor: "background.paper",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Accessibility
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                    We believe spiritual knowledge should be available to everyone, regardless of their
                    background or technical expertise.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  bgcolor: "background.paper",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Innovation
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                    We embrace modern technology to create new and engaging ways to learn and practice
                    Krishna consciousness in the digital age.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Disclaimer */}
          <Card
            sx={{
              mb: 4,
              bgcolor: "rgba(255, 152, 0, 0.1)",
              border: "1px solid rgba(255, 152, 0, 0.3)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "warning.light" }}>
                Important Notice
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                While Shankhnaad AI strives to provide accurate information from the Bhagavad Gita, it is an
                AI-powered tool and may occasionally provide incomplete or inaccurate interpretations. We
                strongly recommend consulting with qualified spiritual teachers and authentic texts for
                serious study and spiritual guidance. This tool is meant to supplement, not replace,
                traditional learning methods.
              </Typography>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Ready to Begin Your Spiritual Journey?
            </Typography>
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
              Start Exploring
            </Button>
          </Box>
        </MotionBox>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          py: 4,
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
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
                © {new Date().getFullYear()} Krishna Consciousness Society. All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                <Button
                  sx={{ color: "text.secondary" }}
                  onClick={() => navigate("/privacy")}
                >
                  Privacy Policy
                </Button>
                <Button
                  sx={{ color: "text.secondary" }}
                  onClick={() => navigate("/terms")}
                >
                  Terms of Service
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;
