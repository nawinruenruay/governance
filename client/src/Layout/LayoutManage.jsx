import { AppShell, Burger, Flex, Group, NavLink } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, NavLink as Nl } from "react-router-dom";
import {
  IconMessage,
  IconProgress,
  IconCircleCheck,
  IconUserCancel,
  IconArrowNarrowRight,
} from "@tabler/icons-react";

import Header from "../components/Header";

function LayoutManage() {
  const [Active, setActive] = useState(0);
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const data = [
    {
      title: "ข้อมูลผู้ร้องเรียน",
      icon: <IconMessage />,
      subnav: [
        {
          title: "ข้อร้องเรียนทั้งหมด",
          path: "/complaint/home",
          icon: <IconArrowNarrowRight size={15} />,
        },
        {
          title: "การร้องเรียนทั่วไป",
          path: "/complaint/general",
          icon: <IconArrowNarrowRight size={15} />,
        },
        {
          title: "การร้องเรียนการฝ่าฝืนจริยธรรม",
          path: "/complaint/ethics",
          icon: <IconArrowNarrowRight size={15} />,
        },
      ],
    },
    {
      title: "อยู่ระหว่างการดำเนินการ",
      path: "/complaint/progress",
      icon: <IconProgress />,
    },
    {
      title: "ดำเนินการเสร็จสิ้น",
      path: "/complaint/success",
      icon: <IconCircleCheck />,
    },
    {
      title: "ไม่รับเรื่อง",
      path: "/complaint/dontaccept",
      icon: <IconUserCancel />,
    },
  ];

  useEffect(() => {
    const activeIndex = parseInt(localStorage.getItem("activeMenu"));
    if (!isNaN(activeIndex)) {
      setActive(activeIndex);
    }
  }, []);

  const HandleNavClick = (key) => {
    setActive(key);
    toggleMobile();
    localStorage.setItem("activeMenu", key);
  };

  return (
    <AppShell
      header={{ height: 65 }}
      navbar={{
        width: 270,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      // padding="md"
    >
      <AppShell.Header
        style={{
          borderBottom: "0",
          background: "#3366FF",
          color: "#FFF",
          paddingRight: "5px",
        }}
        className="Header"
      >
        <Group h="100%" px="sm" w="auto" justify="space-between">
          <Flex className="NavLogo" align="center" gap={10} ml={10}>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
              color="#FFF"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
              color="#FFF"
            />
          </Flex>
          <Header />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" style={{ borderRight: "0" }} className="Navbar">
        <Flex direction={"column"} align={"center"}>
          {data.map((i, key) => (
            <NavLink
              color="#3366FF"
              style={{
                borderRadius: "10px",
                padding: "15px 15px",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
              className="NavLink ripple"
              onClick={() => HandleNavClick(key)}
              active={key === Active}
              component={Nl}
              to={i.path}
              label={i.title}
              leftSection={i.icon}
            >
              {i.subnav && (
                <>
                  <Flex direction="column" align="flex-start">
                    {i.subnav.map((item, index) => (
                      <NavLink
                        color="#3366FF"
                        style={{
                          borderRadius: "10px",
                          padding: "15px 15px",
                          fontWeight: "bold",
                          marginBottom: "5px",
                        }}
                        key={index}
                        className="subNav"
                        onClick={() => HandleNavClick(key)}
                        component={Nl}
                        to={item.path}
                        label={item.title}
                        leftSection={item.icon}
                      />
                    ))}
                  </Flex>
                </>
              )}
            </NavLink>
          ))}
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main style={{ background: "#f0f2f8" }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default LayoutManage;
