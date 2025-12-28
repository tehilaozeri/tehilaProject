import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  AppBar,
  Badge,
  Box,
  Container,
  Dialog,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

import { fetchCategoriesWithProducts } from "../features/categories/categoriesSlice";
import {
  selectProductsByCategoryId,
  selectAllProducts,
} from "../features/products/productsSlice";
import {
  addToCart,
  decQty,
  incQty,
  removeFromCart,
  selectCartTotal,
} from "../features/cart/cartSlice";

import CategoryList from "../components/CategoryList";
import ProductGrid from "../components/ProductGrid";
import CartSidebar from "../components/CartSidebar";

const CART_WIDTH = 360;

export default function ShoppingPage({ onProceed }) {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:980px)");

  const [selectedId, setSelectedId] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  // --- Redux state ---

  const {
    list: categories = [],
    status = "idle",
    error = null,
  } = useSelector((s) => s.categories) || {};

  const cartItems = useSelector((s) => s.cart.items);
  const total = useSelector(selectCartTotal);

  const productsForSelectedCategory = useSelector((state) =>
    selectedId
      ? selectProductsByCategoryId(state, selectedId)
      : selectAllProducts(state)
  );

  const cartCount = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.qty, 0),
    [cartItems]
  );

  useEffect(() => {
    dispatch(fetchCategoriesWithProducts());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0 && selectedId == null) {
      setSelectedId(categories[0].id);
    }
  }, [categories, selectedId]);

  const selectedCategory =
    selectedId != null
      ? categories.find((c) => c.id === selectedId)
      : null;

  const cartContent = (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography fontWeight={900}>הסל שלי</Typography>
        <IconButton onClick={() => setCartOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <CartSidebar
        items={cartItems}
        total={total}
        onInc={(id) => dispatch(incQty(id))}
        onDec={(id) => dispatch(decQty(id))}
        onRemove={(id) => dispatch(removeFromCart(id))}
        onProceed={() => {
          setCartOpen(false);
          onProceed();
        }}
        canProceed={cartItems.length > 0}
      />
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }} dir="rtl">
      {/* AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ borderBottom: "1px solid", borderColor: "divider" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography fontWeight={900}>רשימת קניות</Typography>

          {isMobile ? (
            <IconButton color="inherit" onClick={() => setCartOpen(true)}>
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          ) : (
            <Typography variant="body2" color="text.secondary">
              פרויקט קניות
            </Typography>
          )}
        </Toolbar>
      </AppBar>

      {/* פופאפ סל במובייל */}
      {isMobile && (
        <Dialog
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          {cartContent}
        </Dialog>
      )}

      {/* תוכן ימין */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />

        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                <Typography fontWeight={900} sx={{ mb: 0.5 }}>
                  בחר קטגוריה והוסף מוצרים לסל
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {status === "loading"
                    ? "טוען קטלוג..."
                    : status === "failed"
                    ? `שגיאה: ${error}`
                    : "הקטלוג נטען"}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                <CategoryList
                  categories={categories}
                  selectedId={selectedId}
                  onSelect={(id) => setSelectedId(id)}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                <Typography fontWeight={900} sx={{ mb: 2 }}>
                  {selectedCategory ? selectedCategory.name : "מוצרים"}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <ProductGrid
                  products={productsForSelectedCategory}
                  onAdd={(product, qty) =>
                    dispatch(addToCart(product, qty))
                  }
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* סל בדסקטופ */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          anchor="right"
          sx={{
            width: CART_WIDTH,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: CART_WIDTH,
              boxSizing: "border-box",
              borderRight: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          <Toolbar />
          <Box
            sx={{
              p: 2,
              height: "calc(100vh - 64px)",
              display: "flex",
            }}
          >
            <CartSidebar
              items={cartItems}
              total={total}
              onInc={(id) => dispatch(incQty(id))}
              onDec={(id) => dispatch(decQty(id))}
              onRemove={(id) => dispatch(removeFromCart(id))}
              onProceed={onProceed}
              canProceed={cartItems.length > 0}
            />
          </Box>
        </Drawer>
      )}
    </Box>
  );
}
