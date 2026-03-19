import type { Metadata } from "next";
import AboutInner from "../../components/about/AboutInner";
import "./about.css";

export const metadata: Metadata = {
  title: "About Koty",
  description: "Koty의 소개 페이지",
};

export default function About() {
  return <AboutInner />;
}
