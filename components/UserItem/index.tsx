import { useEffect, useState } from "react";
import Image from "next/image";
import { Space, Card, Button, Typography } from "antd";
import { useToggle } from "ahooks";

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
type GetPrefix<T extends string> = (username: T) => T;

const getPrefix: GetPrefix<string> = (name) => "掘金-" + name;

const myName = "海石";

const afterName = getPrefix(myName);
const afterName2 = getPrefix(123);

console.log("afterName", afterName);

function getSum(num1: number): number;
function getSum(num1: number, num2: number): number;
function getSum(num1: number, num2: number, num3: number): number;

function getSum(num1: string, num2?: number, num3?: number) {
  let sum = num1;
  sum += num2 ?? 0;
  sum += num3 ?? 0;
  return sum;
}

const sum1 = getSum(1);
const sum2 = getSum(1, 2);
const sum3 = getSum(1, 2, 3);
// const sum4 = getSum(1,2,3,4)
console.log(sum1);
console.log(sum2);
console.log(sum3);

function getSumByRestOperator(...nums: number[]) {
  return nums.reduce((pre, cur) => pre + cur, 0);
}

const sum1_other = getSumByRestOperator(1);
const sum2_other = getSumByRestOperator(1, 2);
const sum3_other = getSumByRestOperator(1, 2, 3);
console.log("sum1_other: ", sum1_other);
console.log("sum2_other: ", sum2_other);
console.log("sum3_other: ", sum3_other);

const sum4 = getSum(1, 2, 3, 4);

const sum4_other = getSumByRestOperator(1, 2, 3, 4);

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

type BtnState = {
  btnText: "关注" | "已关注";
  btnType: "default" | "primary";
};

const UserItem = ({ userId, info }: UserItemProps) => {
  const userInfo = mockUserDate[userId];
  // 无需使用 setLeft 和 setRight
  const [{ btnText, btnType }, { toggle, setLeft, setRight }] = useToggle<
    BtnState,
    BtnState
  >(
    { btnText: "关注", btnType: "default" },
    { btnText: "已关注", btnType: "primary" }
  );

  const [followStatus, setFollowStatus] = useState(info.followStatus);
  const handleClick = () => {
    setFollowStatus(!followStatus);
    // 内部调用
    toggle();
  };

  // 直接注释掉
  //   useEffect(() => {
  //     if (followStatus) {
  //       setRight();
  //     } else {
  //       setLeft();
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [followStatus]);
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

// declare function combine<Type>(arr1: Type[], arr2: Type[]): Type[];

// const arr = combine([1, 2, 3], ["hello"]);
// const arr1 = combine(["hello"], [1, 2, 3]);

// function minimumLength<Type extends { length: number }>(
//   obj: Type,
//   minimum: number
// ): Type {
//   if (obj.length >= minimum) {
//     return obj;
//   } else {
//     return { length: minimum };
//   }
// }

// // 'arr' gets value { length: 6 }
// const arr3 = minimumLength([1, 2, 3], 6);
// // and crashes here because arrays have
// // a 'slice' method, but not the returned object!
// console.log(arr3.slice(0));
