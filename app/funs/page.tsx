"use client";
import Image from "next/image";
import CommonLayout from "@/components/Layout";
import NotificationComponent from "@/components/Tools/NotificationComponent";
import DragAndDropExample from "@/components/Tools/DragComponent";
import {
  Space,
  Card,
  Button,
  Spin,
  Switch,
  Flex,
  Alert,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { Vertify } from "@alex_xu/react-slider-vertify";
import DeviceList from "@/components/TableExample";
import DeviceCopyList from "@/components/TableExampleTwo";
import ModalButton from "@/components/ModalComponent";
import io from "socket.io-client";
import UserItem from "@/components/UserItem";
import ToggleComponent from "@/components/ToggleComponent";
import useDelay from "@/components/Hooks/useDelay";
export default function Funs() {
  const [visible, setVisible] = useState(false);
  const [tableType, setTableType] = useState(false);
  const [loading, setLoading] = useDelay(false, 500, true);
  const [cardLoading, setCardLoading] = useDelay(false, 2000, true);
  const [alarms, setAlarms] = useState<any[]>([]);
  const [flag, setFlag] = useState(false);
  const [cardFlag, setCardFlag] = useState(false);

  useEffect(() => {
    let socket: any | null = null;
    console.log("flag", flag);
    if (flag) {
      socket = io("ws://localhost:8080");
      // socket.on("ping", () => {
      //   console.log("Received ping from server");
      //   // 发送pong响应
      //   socket.emit("pong");
      // });
      // 监听从服务端推送的告警消息
      socket.on("new-alarm", (alarm: any) => {
        console.log("alarm", alarm);
        // 设置加载状态为true
        setLoading(true);
        // 延迟更新数据，模拟异步操作
        setTimeout(() => {
          // 设置加载状态为false
          setLoading(false);
        }, 800); // 延迟1秒

        // 将新的告警添加到列表中
        setAlarms((currentAlarms) => [...currentAlarms, alarm]);
      });
      socket.on("disconnect", () => {
        console.log("server disconnected");
        // clearInterval(interval);
      });
    } else {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
      setAlarms([]);
      setLoading(false);
    }

    return () => {
      if (socket) {
        socket.disconnect();
        setLoading(false);
        setAlarms([]);
      }
    };
  }, [flag]);

  useEffect(() => {
    if (cardFlag) {
    } else {
    }
  }, [cardFlag]);
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
        <Button
          onClick={() => {
            setTableType(!tableType);
          }}
        >
          切换表格
        </Button>
        <>
          {tableType ? (
            <Card title="表格示例1">
              <DeviceList />
            </Card>
          ) : (
            <Card title="表格示例2">
              <DeviceCopyList />
            </Card>
          )}
        </>

        <Card title="弹窗组件">
          <ModalButton />
        </Card>
        <Card title="用户信息">
          <UserItem
            userId="823"
            info={{
              detail: "100 文章 · 100沸点 · 100关注者",
              followStatus: false,
            }}
          />
        </Card>

        <Card title="测试useToggle">
          <ToggleComponent />
        </Card>

        <Card title="测试useDelay">
          <Flex gap="middle" vertical>
            <Flex gap="middle" vertical>
              <p>
                Loading state：
                <Switch checked={flag} onChange={setFlag} />
              </p>
              <Spin spinning={loading}>
                <Space direction="vertical">
                  {alarms.map((item, index) => (
                    <Typography.Text key={item.timestamp}>
                      {item.message}
                    </Typography.Text>
                  ))}
                </Space>
              </Spin>
            </Flex>
            <Flex gap="middle" vertical>
              <p>
                Loading state：
                <Switch checked={cardLoading} onChange={setCardLoading} />
              </p>
              <Card title="info" loading={cardLoading}>
                Further details about the context of this alert
              </Card>
            </Flex>
          </Flex>
        </Card>
      </Space>
    </CommonLayout>
  );
}
