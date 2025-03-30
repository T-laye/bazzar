import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CategoriesSection from "@/components/home/CategoriesSection";
import ExpandSection from "@/components/home/ExpandSection";
import IndustryServedSection from "@/components/home/IndustryServedSection";
import LocationsSector from "@/components/home/LocationsSector";

export default function Home() {

  
  return (
    <div className="">
      <Header />
      <CategoriesSection />
      <ExpandSection />
      <IndustryServedSection />
      <LocationsSector />
      <Footer />
    </div>
  );
}
