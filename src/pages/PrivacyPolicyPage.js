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
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const PrivacyPolicyPage = () => {
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
              Privacy Policy
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ pt: 12, pb: 8 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            Privacy Policy
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 4 }}>
            Last updated: {new Date().toLocaleDateString()}
          </Typography>

          <Card
            sx={{
              mb: 3,
              bgcolor: "background.paper",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Introduction
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                Welcome to Shankhnaad AI, operated by the Krishna Consciousness Society. We respect your
                privacy and are committed to protecting your personal data. This privacy policy explains how
                we handle your information when you use our services.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              mb: 3,
              bgcolor: "background.paper",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Data Collection
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                Shankhnaad AI is designed with privacy in mind:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  <strong>Local Storage:</strong> Your chat conversations are stored locally on your device
                  using browser localStorage. We do not transmit or store your conversations on our servers.
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  <strong>No Account Required:</strong> Currently, Shankhnaad AI does not require user
                  accounts or collect personal information like names, email addresses, or phone numbers.
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  <strong>Anonymous Usage:</strong> Your queries and interactions with the AI are processed
                  locally and anonymously.
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card
            sx={{
              mb: 3,
              bgcolor: "background.paper",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Cookies and Tracking
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                We may use cookies and similar tracking technologies to improve your experience:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  <strong>Essential Cookies:</strong> Required for the website to function properly
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  <strong>Analytics Cookies:</strong> Help us understand how visitors use our website
                  (anonymous data only)
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card
            sx={{
              mb: 3,
              bgcolor: "background.paper",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Data Security
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                We take data security seriously. Since your data is stored locally on your device:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  You have full control over your data
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  You can clear your conversations at any time by clearing your browser data
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  Your data is not accessible to us or third parties
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card
            sx={{
              mb: 3,
              bgcolor: "background.paper",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Third-Party Services
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                Our website may contain links to third-party websites or services. We are not responsible
                for the privacy practices of these external sites. We encourage you to review their privacy
                policies.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              mb: 3,
              bgcolor: "background.paper",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Children's Privacy
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                Shankhnaad AI is suitable for all ages. We do not knowingly collect personal information
                from children under 13. Since we don't collect personal data, there's no risk of
                inadvertently collecting children's information.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              mb: 3,
              bgcolor: "background.paper",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Changes to This Policy
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                We may update this privacy policy from time to time. We will notify you of any changes by
                posting the new privacy policy on this page and updating the "Last updated" date.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              mb: 3,
              bgcolor: "background.paper",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Contact Us
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                If you have any questions about this privacy policy or our privacy practices, please feel
                free to contact the Krishna Consciousness Society through our official channels.
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button
              variant="outlined"
              onClick={() => navigate("/")}
              sx={{ borderColor: "primary.main", color: "primary.main", mr: 2 }}
            >
              Back to Home
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/terms")}
              sx={{
                bgcolor: "primary.main",
                color: "#000",
                "&:hover": { bgcolor: "primary.light" },
              }}
            >
              View Terms of Service
            </Button>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default PrivacyPolicyPage;
