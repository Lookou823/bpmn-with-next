import { useEffect, useState } from "react";
import Image from "next/image";
import { Space, Card, Button, Typography } from "antd";

import styles from "./user-item.module.css";
type User = {
  id: string;
  name: string;
  avatorSrc: string;
};
const mockUserDate: Record<string, User> = {
  "823": { id: "823", name: "爱学习的汤姆", avatorSrc: "/images/tom.png" },
};

type UserInfo = {
  detail: string;
  followStatus: boolean;
};

type UserItemProps = {
  userId: string;
  info: UserInfo;
};

type UserAvatarProps = { id: string };

const UserAvatar = ({ id }: UserAvatarProps) => {
  const userInfo = mockUserDate[id];
  return (
    <div className={styles["jj-avatar"]}>
      <Image
        className={styles["avatar-img"]}
        width={100}
        height={100}
        src={userInfo.avatorSrc}
        alt={"头像"}
      />
    </div>
  );
};

const UserItem = ({ userId, info }: UserItemProps) => {
  const userInfo = mockUserDate[userId];
  const [btnText, setBtnText] = useState<"关注" | "已关注">("关注");
  const [btnType, setBtnType] = useState<"default" | "primary">("default");

  const [followStatus, setFollowStatus] = useState(info.followStatus);
  const handleClick = () => {
    setFollowStatus(!followStatus);
  };

  useEffect(() => {
    if (followStatus) {
      setBtnText("已关注");
      setBtnType("primary");
    } else {
      setBtnText("关注");
      setBtnType("default");
    }
  }, [followStatus]);
  return (
    <div className={styles["list-item"]}>
      <UserAvatar id={userId} />
      <Space className={styles["info-box"]} direction="vertical" size={0}>
        <Typography.Title level={4}>{userInfo.name}</Typography.Title>
        <Typography.Text type="secondary">{info.detail}</Typography.Text>
      </Space>

      <Button
        className={styles["follow-btn"]}
        type={btnType}
        onClick={handleClick}
      >
        {btnText}
      </Button>
    </div>
  );
};

export default UserItem;
