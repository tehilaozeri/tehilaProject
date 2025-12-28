import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function CategoryDropdown({ categories, selectedId, onSelect }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="category-label">קטגוריה</InputLabel>
      <Select
        labelId="category-label"
        value={selectedId || ""}
        label="קטגוריה"
        onChange={(e) => onSelect(e.target.value)}
      >
        {categories.map((c) => (
          <MenuItem key={c.id} value={c.id}>
            {c.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
