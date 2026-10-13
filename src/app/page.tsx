import Image from "next/image";
import GithubActivity from "./components/GithubActivity";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ion-Sebastian Bucel — Portfolio",
  description: "",
};

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold text-center mb-8">
          Ion-Sebastian Bucel
        </h1>
        <p className="text-lg text-center mb-8">
          This website is under construction.
        </p>
        <GithubActivity />
        
    </div>
    </>
  );
}
