import ShopItem from "@/app/(main)/shop/_components/shop-item";
import { Box } from "@mui/material";

const items = [
  {
    name: "$15 Voucher",
    description: "To be added.",
    points: 1500,
    imageUrl: "/assets/voucher.jpg",
  },
  {
    name: "ActiveSG 1-Month Membership",
    description: "To be added.",
    points: 1500,
    imageUrl: "/assets/gym.png",
  },
  {
    name: "$10 McDonald's Voucher",
    description: "To be added.",
    points: 1500,
    imageUrl: "/assets/mcd.jpg",
  },
  {
    name: "$10 Grab Voucher",
    description: "To be added.",
    points: 1500,
    imageUrl: "/assets/mcd.jpg",
  },
];

export default function Page() {
  return (
    <Box className={"p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"}>
      {items.map((item, index) => (
        <ShopItem
          key={index}
          name={item.name}
          description={item.description}
          points={item.points}
          imageUrl={item.imageUrl}
        />
      ))}
    </Box>
  );
}