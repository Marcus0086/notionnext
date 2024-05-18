import { StickyScroll } from "@/components/ui/stickyScrollReveal";
import { PRODUCT_TIMELINE } from "@/components/dashboard/constants";

const ProductTimeline = () => {
  return (
    <section className="w-full mb-36 px-8 md:px-10">
      <StickyScroll content={PRODUCT_TIMELINE} />
    </section>
  );
};

export default ProductTimeline;
