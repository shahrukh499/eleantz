"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import AOS from "aos";
import { clientLogo } from "./data/clientLogo";
import { testimonialData } from "./data/testimonialData";

export default function Home() {
  const [gap, setGap] = useState(64);
  const [imageTransform, setImageTransform] = useState({ first: 0, third: 0 });
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [countedValues, setCountedValues] = useState({
    managedSpend: 0,
    revenueGrowth: 0,
    categories: 0,
  });
  const [hasCounted, setHasCounted] = useState(false);
  const splideRef = useRef<any>(null);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint in Tailwind
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Only apply gap effect on large screens
      if (isLargeScreen) {
        // Gap decreases from 64px to 16px as user scrolls from 0 to 500px
        const maxScroll = 500;
        const minGap = 16;
        const maxGap = 64;

        const newGap = Math.max(
          minGap,
          maxGap - (scrollY / maxScroll) * (maxGap - minGap)
        );

        setGap(newGap);
      } else {
        setGap(64); // Fixed gap on small screens
      }

      // Images translate behind second image on scroll
      // Start translating after 200px scroll, reach max at 500px (smaller range = faster)
      const translateStart = 200;
      const translateEnd = -600;

      let progress = 0;
      if (scrollY > translateStart) {
        progress = Math.min(
          1,
          (scrollY - translateStart) / (translateEnd - translateStart)
        );
      }

      setImageTransform({
        first: progress,
        third: progress,
      });
    };

    window.addEventListener("scroll", handleScroll);
    // Set initial gap
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLargeScreen]);

  // Counting animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasCounted) {
            setHasCounted(true);

            // Animate to 24 million
            const animateCount = (
              target: number,
              setter: (val: number) => void,
              suffix: string = ""
            ) => {
              const duration = 2000;
              const startTime = Date.now();
              const startValue = 0;

              const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(
                  startValue + (target - startValue) * easeOutQuart
                );

                setter(currentValue);

                if (progress < 1) {
                  requestAnimationFrame(animate);
                } else {
                  setter(target);
                }
              };

              animate();
            };

            animateCount(24, (val) =>
              setCountedValues((prev) => ({ ...prev, managedSpend: val }))
            );
            animateCount(146, (val) =>
              setCountedValues((prev) => ({ ...prev, revenueGrowth: val }))
            );
            animateCount(30, (val) =>
              setCountedValues((prev) => ({ ...prev, categories: val }))
            );
          }
        });
      },
      { threshold: 0.3 }
    );

    const targetElement = document.getElementById("stats-section");
    if (targetElement) {
      observer.observe(targetElement);
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement);
      }
    };
  }, [hasCounted]);

  return (
    <main>
      <section className="bg-[#e1e7ec] pt-28 pb-12 bg-[url(/assets/img/bg-square.png)] bg-contain bg-center">
        <div className="container mx-auto px-4">
          <div className="py-10">
            <h1 className="lg:text-[45px] text-[25px] font-semibold text-center font-kanit leading-none">
              You need more resources
              <br className="lg:block hidden" />
              You need <span className="text-[#c4262e]">ELEANTZ</span>{" "}
            </h1>

            <p className="text-center text-[14px] lg:text-[20px] font-inter mt-8">
              We're a full-service agency that specializes in helping retailers
              grow their business through retail media.
            </p>
          </div>
          <div
            className="flex justify-center transition-all duration-300 ease-out mb-10"
            style={isLargeScreen ? { gap: `${gap}px` } : { gap: "16px" }}
          >
            <div className="bg-[#f8fafc] w-16 h-16 rounded-2xl p-4 flex items-center justify-center hover:translate-y-[-10px] transition-all duration-300 ease-out">
              <Image
                src="/assets/icons/carrot.svg"
                alt="icon"
                width={40}
                height={40}
              />
            </div>
            <div className="bg-[#f8fafc] w-16 h-16 rounded-2xl p-4 flex items-center justify-center hover:translate-y-[-10px] transition-all duration-300 ease-out">
              <Image
                src="/assets/icons/shapes.svg"
                alt="icon"
                width={40}
                height={40}
              />
            </div>
            <div className="bg-[#f8fafc] w-16 h-16 rounded-2xl p-4 flex items-center justify-center hover:translate-y-[-10px] transition-all duration-300 ease-out">
              <Image
                src="/assets/icons/amazon.svg"
                alt="icon"
                width={40}
                height={40}
              />
            </div>
            <div className="bg-[#f8fafc] w-16 h-16 rounded-2xl p-4 flex items-center justify-center hover:translate-y-[-10px] transition-all duration-300 ease-out">
              <Image
                src="/assets/icons/target.svg"
                alt="icon"
                width={40}
                height={40}
              />
            </div>
            <div className="bg-[#f8fafc] w-16 h-16 rounded-2xl p-4 flex items-center justify-center hover:translate-y-[-10px] transition-all duration-300 ease-out">
              <Image
                src="/assets/icons/cocl.svg"
                alt="icon"
                width={40}
                height={40}
              />
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Link
              href="/"
              className="text-[16px] font-inter font-semibold bg-[#c4262e] text-white px-4 py-2 rounded-full"
            >
              The Team
            </Link>
            <Link
              href="/"
              className="text-[16px] font-inter font-semibold bg-[#000000] text-white px-4 py-2 rounded-full"
            >
              The Result
            </Link>
          </div>
        </div>
        <div
          className="mt-10"
          style={{
            width: "auto",
            maxWidth: "none",
            height: "auto",
            marginLeft: "0",
            marginRight: "0",
            position: "relative",
            left: "0",
            overflow: "visible",
          }}
        >
          <div
            className="overflow-hidden"
            style={{
              gridColumnGap: "0.625rem",
              gridRowGap: "0.625rem",
              gridTemplateRows: "auto",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridAutoColumns: "1fr",
              justifyContent: "center",
              placeItems: "center stretch",
              width: "100%",
              maxWidth: "none",
              height: "auto",
              marginTop: "0",
              marginLeft: "0",
              marginRight: "0",
              display: "grid",
              position: "static",
              right: "-50%",
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            <div
              className="flex-none w-[150px] lg:w-[684px] max-w-full"
              style={{ zIndex: imageTransform.first > 0 ? 1 : 2 }}
            >
              <Image
                src="/assets/img/1.avif"
                alt="icon"
                width={800}
                height={500}
                style={{
                  transform: `translate3d(${
                    -imageTransform.first * 600
                  }px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
                  transition: "transform 0.05s ease-out",
                }}
              />
            </div>
            <div
              className="flex-none w-[250px] lg:w-[796px] max-w-full"
              style={{ zIndex: 3 }}
            >
              <Image
                src="/assets/img/2.avif"
                alt="icon"
                width={800}
                height={500}
              />
            </div>
            <div
              className="flex-none w-[150px] lg:w-[684px] max-w-full"
              style={{ zIndex: imageTransform.third > 0 ? 1 : 2 }}
            >
              <Image
                src="/assets/img/3.avif"
                alt="icon"
                width={800}
                height={500}
                style={{
                  transform: `translate3d(${
                    imageTransform.third * 600
                  }px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
                  transition: "transform 0.05s ease-out",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="stats-section" className="bg-[#f8fafc] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-full w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Statistics */}
              <div className="grid grid-cols-2 gap-6">
                {/* Managed Ad Spend */}
                <div className="stat-box rounded-2xl p-6 lg:p-8 bg-white border-2 border-transparent hover:shadow-[-5px_5px_10px_0px_rgba(0,0,0,0.3)] transition-all duration-1000" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="500">
                  <p className="text-[11px] lg:text-[13px] font-inter uppercase tracking-wide text-black mb-3">
                    MANAGED AD SPEND
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[32px] lg:text-[48px] font-bold text-black font-kanit">
                      {countedValues.managedSpend}
                    </span>
                    <span className="text-[14px] lg:text-[18px] font-bold text-black font-kanit">
                      MILLION
                    </span>
                  </div>
                </div>

                {/* Average Revenue Growth */}
                <div className="stat-box rounded-2xl p-6 lg:p-8 bg-white border-2 border-transparent hover:shadow-[-5px_5px_10px_0px_rgba(0,0,0,0.3)] transition-all duration-1000" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="800">
                  <p className="text-[11px] lg:text-[13px] font-inter uppercase tracking-wide text-black mb-3">
                    AVERAGE REVENUE GROWTH
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[32px] lg:text-[48px] font-bold text-black font-kanit">
                      {countedValues.revenueGrowth}%
                    </span>
                    <span className="text-[14px] lg:text-[18px] font-bold text-black font-kanit">
                      YOY
                    </span>
                  </div>
                </div>

                {/* Worked In Categories */}
                <div className="stat-box rounded-2xl p-6 lg:p-8 bg-white col-span-2 border-2 border-transparent hover:shadow-[-5px_5px_10px_0px_rgba(0,0,0,0.3)] transition-all duration-1000" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1200">
                  <p className="text-[11px] lg:text-[13px] font-inter uppercase tracking-wide text-black mb-3">
                    WORKED IN
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[32px] lg:text-[48px] font-bold text-black font-kanit">
                      {countedValues.categories}+
                    </span>
                    <span className="text-[14px] lg:text-[18px] font-bold text-black font-kanit">
                      CATEGORIES
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side - About Us */}
              <div className="bg-[#c4262e] rounded-2xl p-8 lg:p-12 flex flex-col justify-center" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1500">
                <h2 className="text-[28px] lg:text-[42px] font-bold uppercase text-white font-kanit mb-6">
                  ABOUT US
                </h2>
                <p className="text-white text-[16px] lg:text-[18px] font-inter leading-relaxed">
                  We're not your typical Marketing Agency.
                </p>
                <p className="text-white text-[16px] lg:text-[18px] font-inter leading-relaxed mt-4">
                  We're your dedicated full-service growth partner, turning
                  clicks into conversions in a crowded marketplace. As an
                  extension of your marketing team, we simplify your path to
                  profitability on Amazon, so you can focus on growing your
                  business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12 relative z-1 bg-linear-to-b from-[#f8fafc] to-[#f8fafc00] before:content-[''] before:absolute before:top-0 before:left-0 before:w-[100px] before:h-full before:bg-linear-to-r before:from-[#fefefe] before:to-[#f8fafc00] before:z-10 after:content-[''] after:absolute after:top-0 after:right-0 after:w-[100px] after:h-full after:bg-linear-to-l after:from-[#fefefe] after:to-[#f8fafc00] after:z-10">
        <h2 className="text-[25px] lg:text-[35px] font-bold leading-none text-center font-kanit pb-10">Out Clients</h2>
        <Splide
          ref={splideRef}
          aria-label="Client Logos"
          extensions={{ AutoScroll }}
          options={{
            type: "loop",
            perPage: 6,
            perMove: 1,
            gap: ".5rem",
            drag: true,
            direction: "ltr",
            trimSpace: true,
            live: true,
            arrows: false,
            pagination: false,
            autoScroll: {
              speed: 1,
              pauseOnHover: true,
              pauseOnFocus: false,
            },
            breakpoints: {
              1024: {
                perPage: 3,
                perMove: 1,
              },
            },
          }}
        >
          {clientLogo.map((item) => (
            <SplideSlide key={item.id}>
              <Image
                className="mx-auto w-[90px] lg:w-[120px]"
                src={item.image}
                alt={item.name}
                width={126}
                height={90}
              />
            </SplideSlide>
          ))}
        </Splide>
      </section>

      {/*  <section className="bg-[#e1e7ec] pt-12 pb-20">
        <div className="container mx-auto px-4">
          <div className="mt-10 max-w-full w-[1200px] mx-auto bg-[#ecf2f6] bg-[url(/assets/img/bg-square.png)] bg-cover bg-center rounded-2xl p-10">
            <div className="relative max-w-full w-[800px] h-auto mx-auto">
              <Image
                className="mx-auto"
                src="/assets/img/dashboard.avif"
                alt="icon"
                width={800}
                height={500}
              />
              <Image
                className="absolute bottom-0 left-0 w-[100px] md:w-[173px] animate-bounce ease-in-out"
                src="/assets/img/retention.avif"
                alt="icon"
                width={173}
                height={406}
              />
              <Image
                className="absolute top-0 right-0 w-[100px] md:w-[173px] animate-translate-y"
                src="/assets/img/nexus.avif"
                alt="icon"
                width={173}
                height={164}
              />
            </div>
            <div className="mt-10">
              <h2 className="lg:text-[45px] text-[25px] font-semibold text-center font-kanit leading-none">
                You’re in <span className="text-orange-400">Good Company</span>
              </h2>
              <p className="text-center text-[14px] lg:text-[25px] font-inter mt-8">
                We’ve built our reputation on two things: results that matter
                and relationships that last. A 95% average retention rate says
                we’re doing something right.
              </p>
            </div>
            <div className="flex flex-wrap gap-y-3 mt-10">
                <div className="w-full md:w-[33.33%] lg:w-[20%] px-1.5">
                    <div className="bg-white rounded-2xl px-2 py-5 flex justify-center flex-col gap-y-3" data-aos="fade-up"  data-aos-anchor-placement="top-bottom" data-aos-duration="500">
                       <Image className="mx-auto" src="/assets/icons/logo-container.svg" alt="icon" width={150} height={100} />
                       <div className="flex justify-center">
                          <Link href='' className="text-orange-400 border border-orange-400 px-3 py-1 rounded-xl">Case Study</Link>
                       </div>
                    </div>
                </div>
                <div className="w-full md:w-[33.33%] lg:w-[20%] px-1.5">
                    <div className="bg-white rounded-2xl px-2 py-5 flex justify-center flex-col gap-y-3" data-aos="fade-up"  data-aos-anchor-placement="top-bottom" data-aos-duration="1000">
                       <Image className="mx-auto" src="/assets/icons/logo-container.svg" alt="icon" width={150} height={100} />
                       <div className="flex justify-center">
                          <Link href='' className="text-orange-400 border border-orange-400 px-3 py-1 rounded-xl">Case Study</Link>
                       </div>
                    </div>
                </div>
                <div className="w-full md:w-[33.33%] lg:w-[20%] px-1.5">
                    <div className="bg-white rounded-2xl px-2 py-5 flex justify-center flex-col gap-y-3" data-aos="fade-up"  data-aos-anchor-placement="top-bottom" data-aos-duration="1500">
                       <Image className="mx-auto" src="/assets/icons/logo-container.svg" alt="icon" width={150} height={100} />
                       <div className="flex justify-center">
                          <Link href='' className="text-orange-400 border border-orange-400 px-3 py-1 rounded-xl">Case Study</Link>
                       </div>
                    </div>
                </div>
                <div className="w-full md:w-[33.33%] lg:w-[20%] px-1.5">
                    <div className="bg-white rounded-2xl px-2 py-5 flex justify-center flex-col gap-y-3" data-aos="fade-up"  data-aos-anchor-placement="top-bottom" data-aos-duration="2000">
                       <Image className="mx-auto" src="/assets/icons/logo-container.svg" alt="icon" width={150} height={100} />
                       <div className="flex justify-center">
                          <Link href='' className="text-orange-400 border border-orange-400 px-3 py-1 rounded-xl">Case Study</Link>
                       </div>
                    </div>
                </div>
                <div className="w-full md:w-[33.33%] lg:w-[20%] px-1.5">
                    <div className="bg-white rounded-2xl px-2 py-5 flex justify-center flex-col gap-y-3" data-aos="fade-up"  data-aos-anchor-placement="top-bottom" data-aos-duration="3000">
                       <Image className="mx-auto" src="/assets/icons/logo-container.svg" alt="icon" width={150} height={100} />
                       <div className="flex justify-center">
                          <Link href='' className="text-orange-400 border border-orange-400 px-3 py-1 rounded-xl">Case Study</Link>
                       </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="bg-[#ecf2f6] bg-[url(/assets/img/bg-square.png)] bg-cover bg-center py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-full w-[1100px] mx-auto">
            <p className="text-[11px] lg:text-[18px] font-semibold text-center font-inter uppercase tracking-wide text-black mb-3">Our Services</p>
            <h2 className="lg:text-[45px] text-[25px] font-semibold text-center font-kanit leading-none">
              Built by a team that cares about the work{" "}
              <span className="text-[#c4262e]">and the people behind it.</span>
            </h2>
            <p className="text-center text-[14px] lg:text-[25px] font-inter mt-8">
              The values below shape everything we do. From how we hire, to how
              we show up for each other, to how we show up for our partners.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-y-4 max-w-full w-[1300px] mx-auto">
            <div className="w-full md:w-[50%] lg:w-[25%] px-2">
              <div
                className="bg-white rounded-2xl p-10"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="500"
              >
                <Image
                  className="me-auto"
                  src="/assets/icons/pemium.svg"
                  alt="icon"
                  width={40}
                  height={40}
                />
                <Image
                  className="mx-auto"
                  src="/assets/img/tts.avif"
                  alt="icon"
                  width={200}
                  height={229}
                />
                <div className="mt-10">
                  <h4 className="text-[20px] lg:text-[25px] font-bold leading-tight">
                    Marketing  
                  </h4>
                  <h4 className="text-[20px] lg:text-[25px] text-[#c4262e] font-bold leading-tight">
                    & Advertising
                  </h4>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[50%] lg:w-[25%] px-2">
              <div
                className="bg-white rounded-2xl p-10"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="1000"
              >
                <Image
                  className="me-auto"
                  src="/assets/icons/pemium.svg"
                  alt="icon"
                  width={40}
                  height={40}
                />
                <Image
                  className="mx-auto"
                  src="/assets/img/tts.avif"
                  alt="icon"
                  width={200}
                  height={229}
                />
                <div className="mt-10">
                    <h4 className="text-[20px] lg:text-[25px] font-bold leading-tight">
                    Listings
                  </h4>
                  <h4 className="text-[20px] lg:text-[25px] text-[#c4262e] font-bold leading-tight">
                    Management
                  </h4>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[50%] lg:w-[25%] px-2">
              <div
                className="bg-white rounded-2xl p-10"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="1500"
              >
                <Image
                  className="me-auto"
                  src="/assets/icons/pemium.svg"
                  alt="icon"
                  width={40}
                  height={40}
                />
                <Image
                  className="mx-auto"
                  src="/assets/img/tts.avif"
                  alt="icon"
                  width={200}
                  height={229}
                />
                <div className="mt-10">
                  <h4 className="text-[20px] lg:text-[25px] font-bold leading-tight">
                  Operations
                  </h4>
                  <h4 className="text-[20px] lg:text-[25px] text-[#c4262e] font-bold leading-tight">
                    Management
                  </h4>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[50%] lg:w-[25%] px-2">
              <div
                className="bg-white rounded-2xl p-10"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="2000"
              >
                <Image
                  className="me-auto"
                  src="/assets/icons/pemium.svg"
                  alt="icon"
                  width={40}
                  height={40}
                />
                <Image
                  className="mx-auto"
                  src="/assets/img/tts.avif"
                  alt="icon"
                  width={200}
                  height={229}
                />
                <div className="mt-10">
                  <h4 className="text-[20px] lg:text-[25px] font-bold leading-tight">
                    Sales 
                  </h4>
                  <h4 className="text-[20px] lg:text-[25px] text-[#c4262e] font-bold leading-tight">
                    & Analytics
                  </h4>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[50%] lg:w-[25%] px-2">
              <div
                className="bg-white rounded-2xl p-10"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="500"
              >
                <Image
                  className="me-auto"
                  src="/assets/icons/pemium.svg"
                  alt="icon"
                  width={40}
                  height={40}
                />
                <Image
                  className="mx-auto"
                  src="/assets/img/tts.avif"
                  alt="icon"
                  width={200}
                  height={229}
                />
                <div className="mt-10">
                  <h4 className="text-[20px] lg:text-[25px] font-bold leading-tight">
                    Creative Strategy
                  </h4>
                  <h4 className="text-[20px] lg:text-[25px] text-[#c4262e] font-bold leading-tight">
                    & Building
                  </h4>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[50%] lg:w-[25%] px-2">
              <div
                className="bg-white rounded-2xl p-10"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="1000"
              >
                <Image
                  className="me-auto"
                  src="/assets/icons/pemium.svg"
                  alt="icon"
                  width={40}
                  height={40}
                />
                <Image
                  className="mx-auto"
                  src="/assets/img/tts.avif"
                  alt="icon"
                  width={200}
                  height={229}
                />
                <div className="mt-10">
                  <h4 className="text-[20px] lg:text-[25px] font-bold leading-tight">
                    Marketplace
                  </h4>
                  <h4 className="text-[20px] lg:text-[25px] text-[#c4262e] font-bold leading-tight">
                    Reimbursements
                  </h4>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[50%] lg:w-[25%] px-2">
              <div
                className="bg-white rounded-2xl p-10"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="1500"
              >
                <Image
                  className="me-auto"
                  src="/assets/icons/pemium.svg"
                  alt="icon"
                  width={40}
                  height={40}
                />
                <Image
                  className="mx-auto"
                  src="/assets/img/tts.avif"
                  alt="icon"
                  width={200}
                  height={229}
                />
                <div className="mt-10">
                  <h4 className="text-[20px] lg:text-[25px] font-bold leading-tight">
                    Global Selling
                  </h4>
                  <h4 className="text-[20px] lg:text-[25px] text-[#c4262e] font-bold leading-tight">
                    Management
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#f8fafc]">
        <div className="container mx-auto px-4">
          <div className="max-w-full w-[1100px] mx-auto">
            <h2 className="text-[25px] lg:text-[46px] font-semibold text-center font-kanit leading-none">
              Retail media{" "}
              <span className="text-orange-400">isn’t one-size-fits-all.</span>
            </h2>
            <p className="text-[14px] lg:text-[23px] font-inter mt-8 text-center">
              No two retailers are the same. That’s why we customize every
              approach from strategy, to creative, and data are built for how
              each platform actually works.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-y-3 mt-10">
            <div className="w-full md:w-[50%] lg:w-[33.33%] px-2">
              <div
                className="bg-[#e1e7ec] rounded-2xl p-10 flex justify-center flex-col gap-y-5"
                data-aos="fade-right"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="500"
              >
                <div>
                  <Image
                    src="/assets/icons/amazon_l.svg"
                    alt="icon"
                    width={100}
                    height={40}
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Amazon Advertising</h4>
                  <p className="text-[16px]">
                    Amazon’s where we started and still where we go the deepest.
                    From search to DSP to AMC, we use data to find what matters
                    and act fast on it.
                  </p>
                </div>
                <div className="flex justify-end">
                  <Link href="#" className="border px-3 py-1 rounded">
                    See More
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[50%] lg:w-[33.33%] px-2">
              <div
                className="bg-[#e1e7ec] rounded-2xl p-10 flex justify-center flex-col gap-y-5"
                data-aos="fade-right"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="1000"
              >
                <div>
                  <Image
                    src="/assets/icons/amazon_l.svg"
                    alt="icon"
                    width={100}
                    height={40}
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Amazon Advertising</h4>
                  <p className="text-[16px]">
                    Amazon’s where we started and still where we go the deepest.
                    From search to DSP to AMC, we use data to find what matters
                    and act fast on it.
                  </p>
                </div>
                <div className="flex justify-end">
                  <Link href="#" className="border px-3 py-1 rounded">
                    See More
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[50%] lg:w-[33.33%] px-2">
              <div
                className="bg-[#e1e7ec] rounded-2xl p-10 flex justify-center flex-col gap-y-5"
                data-aos="fade-right"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="1500"
              >
                <div>
                  <Image
                    src="/assets/icons/amazon_l.svg"
                    alt="icon"
                    width={100}
                    height={40}
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Amazon Advertising</h4>
                  <p className="text-[16px]">
                    Amazon’s where we started and still where we go the deepest.
                    From search to DSP to AMC, we use data to find what matters
                    and act fast on it.
                  </p>
                </div>
                <div className="flex justify-end">
                  <Link href="#" className="border px-3 py-1 rounded">
                    See More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e1e7ec] py-20">
        <div className="max-w-full w-[1100px] mx-auto mb-10 px-4">
        <p className="text-[11px] lg:text-[18px] font-semibold text-center font-inter uppercase tracking-wide text-black mb-3">Testimonials</p>
          <h2 className="lg:text-[45px] text-[25px] font-bold text-center font-kanit leading-none mb-3">
            Tech that came from{" "}
            <span className="text-[#c4262e]">doing the work.</span>
          </h2>
          <p className="text-[14px] lg:text-[23px] text-center">
            Our Head of Product, Dustin, wasn’t a developer. He just saw a gap
            and decided to build what didn’t exist. That project became Nexus,
            our in-house tech that keeps growing with our team and the partners
            we support every day.
          </p>
          {/* <div className="flex justify-center mt-5">
            <Link
              href="#"
              className="bg-[#c4262e] text-white font-bold px-5 py-3 rounded-full"
            >
              Explore Our Tech
            </Link>
          </div> */}
        </div>
        <div>
          <Splide
            aria-label="My Favorite Images"
            options={{
              type: "loop",
              padding: "20rem",
              perPage: 1,
              perMove: 1,
              gap: "4rem",
              breakpoints: {
                1024: {
                  perPage: 1,
                  perMove: 1,
                  padding: "1rem",
                },
              },
            }}
          >
            {
              testimonialData.map((item) => (
                <SplideSlide key={item.id}>
                  <div className="relative w-full h-auto lg:h-[400px] bg-[#ecf2f6] bg-[url('/assets/img/bg-square.png')] bg-cover bg-center rounded-2xl py-5 px-5 flex justify-center flex-col">
                    <div>
                      <Image
                      className=""
                          src={item.image}
                        alt="Image 1"
                        width={50}
                        height={50}
                      />
                      <div>
                        <p className="text-[14px] lg:text-[20px] font-inter italic my-5">
                          {item.text}
                        </p>
                        <span className="text-[20px] text-[#c4262e] font-semibold">{item.company}</span>
                      </div>
                    </div>
                  </div>
                </SplideSlide>
              ))
            }
          </Splide>
        </div>
      </section>
    </main>
  );
}
