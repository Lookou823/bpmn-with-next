"use client";
import Image from "next/image";
import CommonLayout from "@/components/Layout";
import NotificationComponent from "@/components/Tools/NotificationComponent";
import DragAndDropExample from "@/components/Tools/DragComponent";
import { Space, Card } from "antd";
import React, { useState } from "react";
import { Vertify } from "@alex_xu/react-slider-vertify";

export default function Funs() {
  const [visible, setVisible] = useState(false);
  const show = () => {
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
  };
  const style = {
    display: "inline-block",
    marginRight: "20px",
    marginBottom: "20px",
    width: "100px",
    padding: "5px 20px",
    color: "#fff",
    textAlign: "center",
    cursor: "pointer",
    background: "#1991FA",
  };
  return (
    <CommonLayout curActive="/funs">
      <Space style={{ width: "100%" }} direction="vertical" size="large">
        <Card title="拖动组件">
          <DragAndDropExample />
        </Card>
        <Card title="桌面通知组件">
          <NotificationComponent />
        </Card>

        <Card title="滑块验证组件">
          <>
            <div onClick={show} style={style}>
              显示
            </div>
            <div onClick={hide} style={style}>
              隐藏
            </div>
            <Vertify
              width={320}
              height={160}
              visible={visible}
              onSuccess={() => alert("success")}
              onFail={() => alert("fail")}
              onRefresh={() => alert("refresh")}
            />
          </>
        </Card>
      </Space>
    </CommonLayout>
  );
}
