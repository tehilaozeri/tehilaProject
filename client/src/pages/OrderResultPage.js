import React from "react";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function OrderResultPage({ onNewOrder, orderId }) {
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, textAlign: "center" }}>
        <CheckCircleOutlineIcon fontSize="large" />
        <Typography variant="h5" fontWeight={900} sx={{ mt: 1 }}>
          ההזמנה נקלטה ✅
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          {orderId ? `מספר הזמנה: ${orderId}` : "תודה!"}
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" size="large" onClick={onNewOrder}>
            הזמנה חדשה
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
