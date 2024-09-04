import ResourceItem from "@/app/(main)/learn/_components/resource-item";
import { Box } from "@mui/material";

const resources = [
  {
    name: "Resource #1",
    description: "To be added.",
    url: "https://dennise.me",
    imageUrl: "/assets/gym.png",
  },
  {
    name: "Resource #2",
    description: "To be added.",
    url: "https://dennise.me",
    imageUrl: "/assets/mcd.jpg",
  },
];

export default function ResourcesTab() {
  return (
    <Box className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"}>
      {resources.map((resource, index) => (
        <ResourceItem
          key={index}
          name={resource.name}
          description={resource.description}
          url={resource.url}
          imageUrl={resource.imageUrl}
        />
      ))}
    </Box>
  );
}