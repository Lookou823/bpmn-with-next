"use client";
import Image from "next/image";
import CommonLayout from "@/components/Layout";
import DefaultBpmEditor from "@/components/Bpm/DefaultBpmEditor";
export default function Bpm() {
  return (
    <CommonLayout curActive="/default-bpm">
      <DefaultBpmEditor />
    </CommonLayout>
  );
}
