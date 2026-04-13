import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
// import "swiper/css/autoplay";

import { Autoplay } from "swiper/modules";
import {useFetch} from "../Hooks/useFetch"
import Recipecard from "../../../Components/Recipecard/Recipecard";
import { Clock, Loader } from "lucide-react";

const Recipeslider = ({ title, fetchUrl }) => {
  const { data, loading } = useFetch(fetchUrl);
  //  console.log("my meal data = ", data?.meals);
  const meals = data?.meals || [];

  if (loading)
    return (
      <div className="text-center p-8 text-gray-300">
        <Loader className="animate-spin inline-block mr-2 text-blue-400" />
        Loading {title}...
      </div>
    );

  return (
    <section className="mt-2 mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-100 mb-6 tracking-tight pl-4 flex items-center">
          <Clock className="w-6 h-6 mr-3 text-blue-500" />
          {title}
        </h2>

      <div className="w-[90%] mx-auto py-4">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          autoplay={{ delay: 2000 }}
          loop={true}
          breakpoints={{
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 }
          }}
        >
          {meals.map((meal) => (
            <SwiperSlide key={meal.idMeal}>
              <Recipecard meal={meal} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Recipeslider;