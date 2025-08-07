import React from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Box,
} from "@mui/material";
import {
  AccountBalance,
  SwapHoriz,
  Receipt,
  Assessment,
  CreditCard,
  ShowChart,
  Support,
  Chat,
  Phone,
} from "@mui/icons-material";

function QuickActions({ isMobile, isTablet }) {
  // Responsive configurations
  const cardPadding = isMobile ? 2 : isTablet ? 3 : 4;
  const titleVariant = isMobile ? "h6" : "h5";
  const buttonSpacing = isMobile ? 2 : 2.5;
  const buttonSize = isMobile ? "medium" : "large";
  const fontSize = isMobile ? "1rem" : "1.1rem";
  const buttonPadding = isMobile ? 1.5 : 1.75;
  const helpButtonPadding = isMobile ? 1 : 1.25;

  return (
    <Card
      sx={{
        borderRadius: 3,
        width: "100%",
        maxWidth: { xs: "100%", sm: "90%", md: "600px" },
        mx: "auto",
        height: "100%",
      }}
    >
      <CardContent
        sx={{
          p: cardPadding,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant={titleVariant}
            sx={{
              mb: { xs: 2, md: 3, lg: 4 },
              fontWeight: "bold",
              fontSize: { xs: "1.25rem", md: "1.5rem", lg: "1.75rem" },
            }}
          >
            Quick Actions
          </Typography>

          <Stack spacing={buttonSpacing} sx={{ flex: 1 }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<SwapHoriz fontSize={isMobile ? "small" : "medium"} />}
              sx={{
                py: buttonPadding,
                borderRadius: 2,
                fontSize: fontSize,
                fontWeight: 500,
              }}
              size={buttonSize}
            >
              Transfer Funds
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<Receipt fontSize={isMobile ? "small" : "medium"} />}
              sx={{
                py: buttonPadding,
                borderRadius: 2,
                fontSize: fontSize,
                fontWeight: 500,
              }}
              size={buttonSize}
            >
              Pay Bills
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={
                <Assessment fontSize={isMobile ? "small" : "medium"} />
              }
              sx={{
                py: buttonPadding,
                borderRadius: 2,
                fontSize: fontSize,
                fontWeight: 500,
              }}
              size={buttonSize}
            >
              View Statements
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={
                <AccountBalance fontSize={isMobile ? "small" : "medium"} />
              }
              sx={{
                py: buttonPadding,
                borderRadius: 2,
                fontSize: fontSize,
                fontWeight: 500,
              }}
              size={buttonSize}
            >
              Open Account
            </Button>

            {/* Additional actions for larger screens */}
            {!isMobile && (
              <>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={
                    <CreditCard fontSize={isMobile ? "small" : "medium"} />
                  }
                  sx={{
                    py: buttonPadding,
                    borderRadius: 2,
                    fontSize: fontSize,
                    fontWeight: 500,
                  }}
                  size={buttonSize}
                >
                  Request Card
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={
                    <ShowChart fontSize={isMobile ? "small" : "medium"} />
                  }
                  sx={{
                    py: buttonPadding,
                    borderRadius: 2,
                    fontSize: fontSize,
                    fontWeight: 500,
                  }}
                  size={buttonSize}
                >
                  Investments
                </Button>
              </>
            )}
          </Stack>

          <Divider sx={{ my: { xs: 2, md: 3, lg: 4 } }} />

          <Box>
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              color="text.secondary"
              sx={{
                mb: { xs: 1.5, md: 2, lg: 3 },
                fontSize: { xs: "1rem", md: "1.125rem", lg: "1.25rem" },
              }}
            >
              Need Help?
            </Typography>

            {isMobile ? (
              // Mobile: Horizontal layout to save space
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  flexWrap: "wrap",
                  "& .MuiButton-root": {
                    flex: 1,
                    minWidth: 0,
                  },
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Support fontSize="small" />}
                  sx={{
                    py: 1,
                    fontSize: "0.875rem",
                  }}
                >
                  Support
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Chat fontSize="small" />}
                  sx={{
                    py: 1,
                    fontSize: "0.875rem",
                  }}
                >
                  Chat
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Phone fontSize="small" />}
                  sx={{
                    py: 1,
                    fontSize: "0.875rem",
                  }}
                >
                  Call
                </Button>
              </Stack>
            ) : (
              // Tablet/Desktop: Vertical layout
              <Stack spacing={isTablet ? 1.5 : 2}>
                <Button
                  variant="outlined"
                  fullWidth
                  size={buttonSize}
                  startIcon={
                    <Support fontSize={isMobile ? "small" : "medium"} />
                  }
                  sx={{
                    py: helpButtonPadding,
                    fontSize: { md: "0.9rem", lg: "1rem" },
                  }}
                >
                  Support Center
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  size={buttonSize}
                  startIcon={<Chat fontSize={isMobile ? "small" : "medium"} />}
                  sx={{
                    py: helpButtonPadding,
                    fontSize: { md: "0.9rem", lg: "1rem" },
                  }}
                >
                  Live Chat
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  size={buttonSize}
                  startIcon={<Phone fontSize={isMobile ? "small" : "medium"} />}
                  sx={{
                    py: helpButtonPadding,
                    fontSize: { md: "0.9rem", lg: "1rem" },
                  }}
                >
                  Call Us
                </Button>
              </Stack>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default QuickActions;
