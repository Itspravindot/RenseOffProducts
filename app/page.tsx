import { BackdropController } from "@/components/BackdropController";
import { Collection } from "@/components/Collection";
import { Faq } from "@/components/Faq";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowToOrder } from "@/components/HowToOrder";
import { InquiryBasket } from "@/components/InquiryBasket";
import { MadeByRenseoff } from "@/components/MadeByRenseoff";
import { Navbar } from "@/components/Navbar";
import { ProductSection } from "@/components/ProductSection";
import { Reviews } from "@/components/Reviews";
import { Story } from "@/components/Story";
import { WhatSetsUsApart } from "@/components/WhatSetsUsApart";
import { showcaseProducts } from "@/lib/products";

export default function HomePage() {
  return (
    <>
      <BackdropController />
      <Navbar />
      <main>
        <Hero />
        {showcaseProducts.map((product, index) => (
          <ProductSection key={product.id} product={product} index={index} />
        ))}
        <Story />
        <MadeByRenseoff />
        <Collection />
        <WhatSetsUsApart />
        <HowToOrder />
        <Reviews />
        <Faq />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <InquiryBasket />
    </>
  );
}
