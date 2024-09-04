import ShopItem from "@/app/(main)/shop/_components/shop-item";
import { Box } from "@mui/material";

export default function Page() {
  return (
    <Box className={"p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"}>
      <ShopItem name={"$15 Voucher"} description={"To be added."} points={1500} imageUrl={"/assets/voucher.jpg"} />
      <ShopItem
        name={"ActiveSG 1-Month Membership"}
        description={"To be added."}
        points={1500}
        imageUrl={"/assets/gym.png"}
      />
      <ShopItem
        name={"$10 McDonald's Voucher"}
        description={"To be added."}
        points={1500}
        imageUrl={"/assets/mcd.jpg"}
      />
      <ShopItem name={"$10 Grab Voucher"} description={"To be added."} points={1500} imageUrl={"/assets/mcd.jpg"} />
    </Box>
  );
}