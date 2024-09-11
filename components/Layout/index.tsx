"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  GithubOutlined,
  CalculatorOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from "antd";
import { getThemeBg } from "@/utils";

const { Header, Content, Sider, Footer } = Layout;
interface IProps {
  children: React.ReactNode;
  curActive: string;
  defaultOpen?: string[];
}

const items1: MenuProps["items"] = ["1", "2", "3", "4", "5"].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const keyMap: { [x: string]: string } = {
  "1": "/bpm",
  "2": "/charts",
  "3": "/funs",
  "4": "/default-bpm",
  "5": "/html-demo",
};
const keyName: { [x: string]: string } = {
  "1": "自定义工作流",
  "2": "图表",
  "3": "小工具",
  "4": "默认工作流",
  "5": "原生html例子",
};
const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  CalculatorOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `${keyMap[key]}`,
    icon: React.createElement(icon),
    label: `${keyName[key]}`,

    // children: new Array(4).fill(null).map((_, j) => {
    //   const subKey = index * 4 + j + 1;
    //   if (index === 0) {
    //     return {
    //       key: "/bpm",
    //       label: `option${subKey}`,
    //     };
    //   } else {
    //     return {
    //       key: "/charts",
    //       label: `option${subKey}`,
    //     };
    //   }
    // }),
  };
});

const CommonLayout: React.FC<IProps> = ({
  children,
  curActive,
  defaultOpen = ["/"],
}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [curTheme, setCurTheme] = useState<boolean>(false);
  const toggleTheme = () => {
    const _curTheme = !curTheme;
    setCurTheme(_curTheme);
    localStorage.setItem("isDarkTheme", _curTheme ? "true" : "");
  };
  const router = useRouter();
  const handleSelect = (row: { key: string }) => {
    router.push(row.key);
  };
  // const handleSelect = (row: { key: string }) => {
  //   router.push(row.key);
  // };

  useEffect(() => {
    const isDark = !!localStorage.getItem("isDarkTheme");
    setCurTheme(isDark);
  }, []);
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            // padding: 0,
            ...getThemeBg(curTheme),
          }}
        >
          <div className="demo-logo">Next Project</div>
          {/* <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        /> */}
        </Header>
        <Layout>
          <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              // defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
              items={items2}
              onSelect={handleSelect}
            />
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Next Projects ©{new Date().getFullYear()} Created by{" "}
              <GithubOutlined /> <a href="https://github.com/Lookou823">Liu</a>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default CommonLayout;
