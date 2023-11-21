import { List, ListItemButton, ListItemText } from "@mui/material";

function FilterByCategory({ data = [], ...other }) {
  return (
    <List
      sx={{ width: "18%", marginRight: "20px", height: "100%", gap: "12px" }}
    >
      {data.map((item) => (
        <ListItemButton sx={{ borderRadius: "100px" }} key={item.id}>
          <ListItemText
            sx={{ fontSize: "18px", fontWeight: "500" }}
            disableTypography
            primary={item.title}
          />
        </ListItemButton>
      ))}
    </List>
  );
}

export default FilterByCategory;
