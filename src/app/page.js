import CTASection from "@/components/CTASection";
import FeaturesJob from "@/components/FeaturesJob";
import HeroSection from "@/components/HeroSection";
import JobDiscoverySection from "@/components/JobDiscoverySection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <HeroSection></HeroSection>
      <JobDiscoverySection></JobDiscoverySection>
      <FeaturesJob></FeaturesJob>
      <CTASection></CTASection>
    </div>



  );
}
