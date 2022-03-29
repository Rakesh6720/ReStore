import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogueSlice";

export default function ProductSearch() {
  const { productParams } = useAppSelector((state) => state.catalogue);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useDispatch();

  // material ui function to wait before sending action
  const debouncedSearch = debounce((event: any) => {
    dispatch(setProductParams({ searchTerm: event.target.value }));
  }, 1000);

  return (
    <TextField
      label="search Products"
      variant="outlined"
      fullWidth
      value={searchTerm || ""}
      onChange={(event) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event);
      }}
    />
  );
}
