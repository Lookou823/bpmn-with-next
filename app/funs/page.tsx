"use client";
import Image from "next/image";
import CommonLayout from "@/components/Layout";

import DragAndDropExample from "@/components/Tools/DragComponent";
export default function Funs() {
  return (
    <CommonLayout curActive="/funs">
      <DragAndDropExample />
    </CommonLayout>
  );
}
