import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectCartTotal } from "../features/cart/cartSlice";
import { resetOrderState, submitOrder } from "../features/order/orderSlice";

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Divider,
  Stack,
  Alert,
} from "@mui/material";

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
}

export default function CheckoutPage({ onBackToShop, onOrderDone }) {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items);
  const total = useSelector(selectCartTotal);
  const order = useSelector((s) => s.order);

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const canSubmit = useMemo(() => {
    if (items.length === 0) return false;
    if (!fullName.trim()) return false;
    if (!address.trim()) return false;
    if (!isEmail(email)) return false;
    return order.status !== "loading";
  }, [items.length, fullName, address, email, order.status]);

  async function onConfirm(e) {
    e.preventDefault();

    const payload = {
      fullName: fullName.trim(),
      address: address.trim(),
      email: email.trim(),
      items: items.map((i) => ({
        productId: i.productId,
        name: i.name,
        price: i.price,
        qty: i.qty,
      })),
    };

    const action = await dispatch(submitOrder(payload));
    if (submitOrder.fulfilled.match(action)) {
      dispatch(clearCart());
      onOrderDone?.();
    }
  }

  function onResetAndBack() {
    dispatch(resetOrderState());
    onBackToShop();
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AppBar position="sticky" elevation={0} sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={onResetAndBack} color="inherit">חזרה</Button>
          <Typography fontWeight={900}>סיכום הזמנה</Typography>
          <Box sx={{ width: 64 }} />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
              <Typography fontWeight={900} sx={{ mb: 1 }}>
                פרטי משלוח (חובה)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                מלא שם מלא, כתובת ומייל. לאחר מכן לחץ “אשר הזמנה”.
              </Typography>

              {items.length === 0 && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  אין מוצרים בסל. חזור למסך הקניות והוסף מוצרים.
                </Alert>
              )}

              {order.status === "failed" && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  שגיאה בשליחה: {order.error}
                </Alert>
              )}

              <Stack component="form" onSubmit={onConfirm} spacing={2}>
                <TextField
                  label="שם פרטי ומשפחה"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  fullWidth
                />
                <TextField
                  label="כתובת מלאה"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  fullWidth
                />
                <TextField
                  label="מייל"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  error={!!email && !isEmail(email)}
                  helperText={email && !isEmail(email) ? "מייל לא תקין" : " "}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={!canSubmit}
                >
                  {order.status === "loading" ? "שולח..." : "אשר הזמנה"}
                </Button>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, position: "sticky", top: 16 }}>
              <Typography fontWeight={900} sx={{ mb: 1 }}>
                המוצרים שנבחרו
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {items.length === 0 ? (
                <Typography color="text.secondary">אין מוצרים להצגה.</Typography>
              ) : (
                <Stack spacing={1.25}>
                  {items.map((i) => (
                    <Box key={i.productId} sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography fontWeight={800} noWrap>{i.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {i.qty} × ₪ {i.price.toFixed(2)}
                        </Typography>
                      </Box>
                      <Typography fontWeight={900}>₪ {(i.qty * i.price).toFixed(2)}</Typography>
                    </Box>
                  ))}
                </Stack>
              )}

              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="text.secondary">סה״כ</Typography>
                <Typography fontWeight={900}>₪ {total.toFixed(2)}</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
