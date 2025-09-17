import CTA from "@/components/modules/homepage/CTA";
import HeroSection from "@/components/modules/homepage/HeroSection";
import HowWork from "@/components/modules/homepage/HowWork";
import Testimonial from "@/components/modules/homepage/Testimonial";

import WhyWe from "@/components/modules/homepage/WhyWe";

const Home = () => {
    return (
        <div>
             <HeroSection></HeroSection>
                {/* Other sections like How It Works, Testimonials, etc. can be added here */}
                <HowWork></HowWork>

                <Testimonial></Testimonial>
           
                <WhyWe></WhyWe>
                   <CTA></CTA>
        </div>
    );
};

export default Home;