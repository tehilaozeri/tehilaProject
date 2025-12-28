import { Grid, Typography, Box } from "@mui/material";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onAdd }) {
  if (!products || products.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          אין מוצרים
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {products.map((p) => (
        <Grid item xs={12} sm={6} md={4} key={p.id}>
          <ProductCard product={p} onAdd={onAdd} />
        </Grid>
      ))}
    </Grid>
  );
}
