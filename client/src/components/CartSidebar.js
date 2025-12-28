import React from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Divider,
  Button,
  Paper,
  Chip,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function CartSidebarMUI({
  items,
  total,
  onInc,
  onDec,
  onRemove,
  onProceed,
  canProceed,
}) {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 3, p: 2, height: "100%", display: "flex", flexDirection: "column" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography fontWeight={900}>הסל שלי</Typography>
        <Chip size="small" label={`${items.reduce((s, i) => s + i.qty, 0)} פריטים`} />
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ flex: 1, overflow: "auto" }}>
        {items.length === 0 ? (
          <Typography color="text.secondary">הסל ריק. הוסף מוצרים כדי להמשיך.</Typography>
        ) : (
          <Stack spacing={1.5}>
            {items.map((i) => (
              <Paper key={i.productId} variant="outlined" sx={{ borderRadius: 2, p: 1.25 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography fontWeight={800} noWrap>{i.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      ₪ {(i.price * i.qty).toFixed(2)}
                    </Typography>
                  </Box>

                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <IconButton size="small" onClick={() => onDec(i.productId)}>
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ width: 24, textAlign: "center", fontWeight: 800 }}>
                      {i.qty}
                    </Typography>
                    <IconButton size="small" onClick={() => onInc(i.productId)}>
                      <AddIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => onRemove(i.productId)}>
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography color="text.secondary">סה״כ</Typography>
        <Typography fontWeight={900}>₪ {total.toFixed(2)}</Typography>
      </Stack>

      <Button
        variant="contained"
        size="large"
        onClick={onProceed}
        disabled={!canProceed}
        fullWidth
      >
        המשך הזמנה
      </Button>
    </Paper>
  );
}
