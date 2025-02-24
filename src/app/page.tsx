import Header from "@/components/Header";
import CategoriesSection from "@/components/home/CategoriesSection";
import ExpandSection from "@/components/home/ExpandSection";
import IndustryServedSection from "@/components/home/IndustryServedSection";

export default function Home() {
  return (
    <div className="">
      <Header />
      <CategoriesSection />
      <ExpandSection />
      <IndustryServedSection />
    </div>
  );
}
