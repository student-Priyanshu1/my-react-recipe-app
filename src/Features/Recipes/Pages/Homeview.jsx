import React from "react";

import Recipeslider from "../components/Recipesilder";
import Trendingrecipe from "../components/Trendingrecipe";
import Categoryselection from "../../../Components/Categoryselection/Categoryselection"

import { API_URL } from "../Hooks/useFetch";

const HomeView = ({ filterByCategory}) => {
  return (
    <>
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Recipeslider
          title="Staff Curated Picks"
          fetchUrl={`${API_URL}search.php?f=a`}
        />

        <Trendingrecipe
          title="Quick & Easy Meals"
          fetchUrl={`${API_URL}filter.php?a=Canadian`}
        />

        <Categoryselection filterByCategory={filterByCategory} />
      </main>
    </>
  );
};

export default HomeView;