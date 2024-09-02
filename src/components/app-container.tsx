"use client";

import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function AppContainer(props: { children: React.ReactNode }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding={"md"}
    >
      <AppShell.Header>
        <Group h={"100%"} px={"md"}>
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom={"sm"} size={"sm"} />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom={"sm"} size={"sm"} />
          Hackathon
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p={"md"}>Navigation Here</AppShell.Navbar>
      <AppShell.Main className={"h-dvh"}>{props.children}</AppShell.Main>
    </AppShell>
  );
}