"use client";
import Image from "next/image";
import CommonLayout from "@/components/Layout";

export default function Demos() {
  return (
    <CommonLayout curActive="/html-demo">
      <div>
        <h1>内嵌HTML文件</h1>
        <iframe src="./htmls/notification.html" width="100%" height="600px" />
      </div>
    </CommonLayout>
  );
}
