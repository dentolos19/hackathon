import MessageView from "@/components/views/message-view";
import { RouteProps } from "@/types";

export default function Page(props: RouteProps) {
  const id = props.params.id;
  return <MessageView title={"Coming Soon"} message={`This room's ID is \"${id}\".`} />;
}