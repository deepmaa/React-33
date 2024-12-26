import "flowbite";
import { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";

export const HomeCarousel = () => {
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      console.log("1st");
    }, 1000);
  });

  // useEffect(() => {
  //   console.log("2st time loading");
  // }, [loading]);

  // let [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel>
              <img
                src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                alt="..."
              />
              <img
                src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                alt="..."
              />
              <img
                src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                alt="..."
              />
              <img
                src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
                alt="..."
              />
              <img
                src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
                alt="..."
              />
            </Carousel>
          </div>
        </>
      )}
    </>
  );
};
