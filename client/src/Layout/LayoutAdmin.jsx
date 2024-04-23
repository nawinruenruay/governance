import { AppShell, Flex, Group } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Outlet, NavLink as Nl } from "react-router-dom";
import { IconHome } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import Header from "../components/Header";

function LayoutAdmin() {
  return (
    <AppShell header={{ height: 65 }} padding="md">
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
          <Flex align="center" gap={10} ml={10}>
            <Link
              to="/complaint/home"
              style={{ color: "white", display: "flex" }}
            >
              <IconHome />
              <span style={{ marginLeft: "5px", fontWeight: "bold" }}>
                {" "}
                หน้าหลัก
              </span>
            </Link>
          </Flex>
          <Header />
        </Group>
      </AppShell.Header>

      <AppShell.Main style={{ background: "#f0f2f8" }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default LayoutAdmin;
