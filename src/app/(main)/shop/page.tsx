import ShopItem from "@/app/(main)/shop/_components/shop-item";
import { Box } from "@mui/material";

export default function Page() {
  return (
    <Box className={"p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"}>
      <ShopItem />
      <ShopItem />
      <ShopItem />
      <ShopItem />
      <ShopItem />
      <ShopItem />
    </Box>
  );
}