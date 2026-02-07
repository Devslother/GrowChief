import Image from "next/image";

const Features = () => {
  return (
    <section
      id="features"
      className="layout-shell pt-[100px] pb-[52px] max-lg:pt-[80px] max-lg:pb-20 max-md:pt-[60px] max-md:pb-[60px]"
    >
      <div className="flex flex-col gap-10 max-w-[1120px] mx-auto w-full">
        <h2 className="font-headline-2 text-start">
          You&apos;re always
          <br className="md:hidden" /> in control
        </h2>
        {/* Desktop: 2x2 grid */}
        <div className="max-lg:hidden flex flex-col gap-4">
          {/* Первый ряд: широкий, узкий */}
          <div className="lg:grid lg:grid-cols-[1.414fr_1fr] lg:gap-4">
            <Image
              src="/images/features/desktop-1.png"
              alt="Feature 1"
              width={717}
              height={400}
              className="w-full h-auto rounded-3xl"
            />
            <Image
              src="/images/features/desktop-2.png"
              alt="Feature 2"
              width={507}
              height={400}
              className="w-full h-auto rounded-3xl"
            />
          </div>
          {/* Второй ряд: узкий, широкий */}
          <div className="lg:grid lg:grid-cols-[1fr_1.414fr] lg:gap-4">
            <Image
              src="/images/features/desktop-3.png"
              alt="Feature 3"
              width={507}
              height={400}
              className="w-full h-auto rounded-3xl"
            />
            <Image
              src="/images/features/desktop-4.png"
              alt="Feature 4"
              width={717}
              height={400}
              className="w-full h-auto rounded-3xl"
            />
          </div>
        </div>

        {/* Tablet: flex-col */}
        <div className="hidden md:flex lg:hidden flex-col gap-4">
          <Image
            src="/images/features/tablet-1.png"
            alt="Feature 1"
            width={708}
            height={400}
            className="w-full h-auto rounded-3xl"
          />
          <Image
            src="/images/features/tablet-2.png"
            alt="Feature 2"
            width={708}
            height={400}
            className="w-full h-auto rounded-3xl"
          />
          <Image
            src="/images/features/tablet-3.png"
            alt="Feature 3"
            width={708}
            height={400}
            className="w-full h-auto rounded-3xl"
          />
          <Image
            src="/images/features/tablet-4.png"
            alt="Feature 4"
            width={708}
            height={400}
            className="w-full h-auto rounded-3xl"
          />
        </div>

        {/* Mobile: flex-col */}
        <div className="flex md:hidden flex-col gap-4">
          <Image
            src="/images/features/mobile-1.png"
            alt="Feature 1"
            width={335}
            height={420}
            sizes="(max-width: 480px) 100vw, 425px"
            className="w-full h-auto rounded-3xl"
          />
          <Image
            src="/images/features/mobile-2.png"
            alt="Feature 2"
            width={335}
            height={420}
            sizes="(max-width: 480px) 100vw, 425px"
            className="w-full h-auto rounded-3xl"
          />
          <Image
            src="/images/features/mobile-3.png"
            alt="Feature 3"
            width={335}
            height={420}
            sizes="(max-width: 480px) 100vw, 425px"
            className="w-full h-auto rounded-3xl"
          />
          <Image
            src="/images/features/mobile-4.png"
            alt="Feature 4"
            width={335}
            height={420}
            sizes="(max-width: 480px) 100vw, 425px"
            className="w-full h-auto rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
