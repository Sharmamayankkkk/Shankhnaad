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

const TermsOfServicePage = () => {
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
              Terms of Service
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
            Terms of Service
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
                Agreement to Terms
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                By accessing or using Shankhnaad AI, you agree to be bound by these Terms of Service and all
                applicable laws and regulations. If you do not agree with any of these terms, you are
                prohibited from using this service.
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
                Use License
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                Permission is granted to temporarily access Shankhnaad AI for personal, non-commercial use
                only. This is a license, not a transfer of title. Under this license, you may not:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  Modify or copy the materials
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  Use the materials for any commercial purpose
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  Attempt to reverse engineer any software contained in the service
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  Remove any copyright or proprietary notations from the materials
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card
            sx={{
              mb: 3,
              bgcolor: "rgba(255, 152, 0, 0.1)",
              border: "1px solid rgba(255, 152, 0, 0.3)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: "warning.light" }}>
                Disclaimer
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                <strong>Important:</strong> The materials and information provided by Shankhnaad AI are for
                general information and educational purposes only. While we strive for accuracy:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  The AI may occasionally provide incomplete or inaccurate interpretations
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  This service should not replace consultation with qualified spiritual teachers
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  Users should verify important spiritual guidance with authentic sources
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  The Krishna Consciousness Society makes no warranties about the completeness, reliability,
                  or accuracy of the information
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
                Limitations
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                In no event shall the Krishna Consciousness Society or its suppliers be liable for any
                damages (including, without limitation, damages for loss of data or profit, or due to
                business interruption) arising out of the use or inability to use Shankhnaad AI.
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
                Acceptable Use
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                You agree to use Shankhnaad AI only for lawful purposes and in a way that does not:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  Infringe on the rights of others
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  Attempt to gain unauthorized access to any portion of the service
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  Use the service to transmit any harmful or malicious code
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  Use the service in any way that could damage, disable, or impair it
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
                Intellectual Property
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                The content of the Bhagavad Gita is in the public domain. However, the Shankhnaad AI
                application, its design, features, and functionality are owned by the Krishna Consciousness
                Society and are protected by international copyright, trademark, and other intellectual
                property laws.
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
                Modifications to Service
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                We reserve the right to modify or discontinue Shankhnaad AI (or any part thereof) at any
                time without notice. We shall not be liable to you or any third party for any modification,
                suspension, or discontinuance of the service.
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
                Governing Law
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                These terms shall be governed and construed in accordance with applicable laws, without
                regard to its conflict of law provisions. Any disputes shall be resolved through appropriate
                legal channels.
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
                Changes to Terms
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                We reserve the right to revise these Terms of Service at any time. By continuing to use
                Shankhnaad AI after revisions become effective, you agree to be bound by the revised terms.
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
                Contact Information
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                If you have any questions about these Terms of Service, please contact the Krishna
                Consciousness Society through our official channels.
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
              onClick={() => navigate("/privacy")}
              sx={{
                bgcolor: "primary.main",
                color: "#000",
                "&:hover": { bgcolor: "primary.light" },
              }}
            >
              View Privacy Policy
            </Button>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default TermsOfServicePage;
