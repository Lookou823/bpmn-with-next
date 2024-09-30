"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import CommonLayout from "@/components/Layout";
import BpmEditor from "@/components/Bpm/BpmEditor";
export default function Charts() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // window 对象存在，因此我们处于客户端
      // 在这里执行你的副作用代码
    }
  }, []);
  return <CommonLayout curActive="/charts">charts</CommonLayout>;
}
