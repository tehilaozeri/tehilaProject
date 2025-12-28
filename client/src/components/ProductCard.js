import {
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
    Stack,
    TextField
  } from "@mui/material";
  import AddIcon from "@mui/icons-material/Add";
  import RemoveIcon from "@mui/icons-material/Remove";
  
  import { useState } from "react";
  import './style.css';
  
  const getProductImageUrl = (productId) => {
    return `/products/${productId}.jpg`;
  };
  
  export default function ProductCard({ product, onAdd }) {
    const [qty, setQty] = useState(1);
    const [imageError, setImageError] = useState(false);
    
    const imageUrl = product.imageUrl || getProductImageUrl(product.id);
    const fallbackImage = "https://via.placeholder.com/300x200?text=Food";
  
    return (
      <Card sx={{ borderRadius: 3 }}>
        <CardMedia
          component="img"
          height="140"
          image={imageError ? fallbackImage : imageUrl}
          onError={() => setImageError(true)}
          alt={product.name}
        />
  
        <CardContent>
          <Stack spacing={1}>
            <Typography fontWeight={700}>{product.name}</Typography>
            <Typography color="text.secondary">
              ₪ {product.price.toFixed(2)}
            </Typography>
  
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <RemoveIcon />
              </IconButton>
  
              <TextField
                size="small"
                value={qty}
                onChange={(e) =>
                  setQty(Math.max(1, Number(e.target.value) || 1))
                }
                inputProps={{ style: { textAlign: "center", width: 40 } }}
              />
  
              <IconButton onClick={() => setQty((q) => q + 1)}>
                <AddIcon />
              </IconButton>
  
              <IconButton
                color="primary"
                sx={{ ml: "auto" }}
                onClick={() => onAdd(product, qty)}
              >
                <AddIcon />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    );
  }
  