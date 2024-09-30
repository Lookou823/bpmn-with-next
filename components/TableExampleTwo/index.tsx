import React, { useState, useEffect } from "react";
import { Table, Input, Button, Typography, Space } from "antd";
import { useSetState } from "ahooks";
import { debounce } from "lodash";
import useToggle from "./usehook";
const mockData = Array.from({ length: 100 }, (_, index) => ({
  key: `${index}`,
  name: `设备${index + 1}`,
  type: index % 2 === 0 ? "类型A" : "类型B",
  status: index % 3 === 0 ? "在线" : "离线",
}));
interface Device {
  key: string;
  name: string;
  type: string;
  status: string;
}

type UserDetail = {
  name: string;
  age: number;
  gender: "male" | "female";
  school: string;
};

type UserBriefDetail = Pick<UserDetail, "name" | "age">;
type UserDetailCopy = keyof UserDetail;

type TestFun = (param: number) => number;
type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state: Pick<S, K>
) => void;

type Pagination = {
  pageNum: number;
  pageSize: number;
  total: number;
};

const DeviceCopyList: React.FC = () => {
  const setPaginationState: SetState<Pagination> = (state) => {};
  setPaginationState({ total: 1, pageNum: 1 });

  setPaginationState({ gender: "male" });

  const logUserInfo = (info: Pick<UserDetail, "name">) => {};

  logUserInfo({ name: "123" });

  const testFun: TestFun = (param) => param + 1;
  // 处理字符串类型的状态
  const setStringState: SetState<string> = (state) => {};

  setStringState("Hello");
  // 处理数字类型的状态
  const setNumberState: SetState<number> = (state) => {};

  setNumberState(42);

  // 处理对象类型的状态
  interface Person {
    name: string;
    age: number;
  }

  const setPersonState: SetState<Person> = (state) => {};

  const person: Person = { name: "Bob", age: 25 };
  setPersonState(person);

  // 处理数组类型的状态
  type Todo = {
    id: number;
    text: string;
  };

  const setTodosState: SetState<Todo[]> = (state) => {};

  const todos: Todo[] = [
    { id: 1, text: "Learn TypeScript" },
    { id: 2, text: "Write examples" },
  ];
  setTodosState(todos);
  const [data, setData] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);

  const [toggle_state, { set }] = useToggle<string>();

  const [searchText, setSearchText] = useState<string>("");
  const [pagination, setPagination] = useSetState({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });

  const columns = [
    {
      title: "设备名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "设备类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "设备状态",
      dataIndex: "status",
      key: "status",
    },
  ];

  const fetchData = async (
    pageNum: number,
    pageSize: number,
    searchText: string
  ) => {
    setLoading(true);
    // 模拟网络请求
    return new Promise<{ data: Device[]; total: number }>((resolve) => {
      setTimeout(() => {
        const startIndex = (pageNum - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        const filteredData = searchText
          ? mockData.filter((device) => device.name.includes(searchText))
          : mockData;
        const paginatedData = filteredData.slice(startIndex, endIndex);
        resolve({ data: paginatedData, total: filteredData.length });
      }, 1000);
    });
  };

  useEffect(() => {
    fetchData(pagination.pageNum, pagination.pageSize, searchText).then(
      (data) => {
        setData(data.data);
        setLoading(false);
        setPagination({ total: data.total });
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageNum, pagination.pageSize, searchText]);

  return (
    <div>
      <Input
        placeholder="输入设备名称搜索"
        onChange={debounce((e) => {
          setSearchText(e.target.value);
          setPagination({ pageNum: 1 });
        }, 1000)}
        style={{ width: 200, marginBottom: 16 }}
      />
      <Space>
        <Button
          style={{ marginLeft: 8 }}
          onClick={() => {
            setPagination({ pageNum: 1 });
          }}
        >
          重置
        </Button>
        <Typography.Text>Total: {pagination.total}</Typography.Text>
      </Space>

      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={{
          pageSize: pagination.pageSize,
          current: pagination.pageNum,
          total: pagination.total,
          onChange: (page, pageSize) => {
            setPagination({ pageNum: page, pageSize });
          },
        }}
      />
    </div>
  );
};

export default DeviceCopyList;
