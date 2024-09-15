import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { useBoolean } from "ahooks";

function ModalButton() {
  const [open, { setTrue, setFalse }] = useBoolean();

  const showModal = () => {
    setTrue();
  };
  const closeModal = () => {
    setFalse();
  };
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          showModal();
        }}
      >
        Click Me
      </Button>
      <Modal
        title="ModalDemo"
        open={open}
        okText="Submit"
        onCancel={() => {
          closeModal();
        }}
        onOk={() => {
          closeModal();
        }}
      >
        <>children</>
      </Modal>
    </>
  );
}

export default ModalButton;

interface Vehicle {
  engine: string;
}

interface Vehicle {
  wheel: number;
}

const vehicle: Vehicle = {};
