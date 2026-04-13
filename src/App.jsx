import React, { useCallback, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Recipedetailview from "./Features/Recipes/Pages/Recipedetailview";
import Searchview from "./Features/Recipes/Pages/Searchview";
import Cuisine from "./Components/Cuisine/Cuisine";
import Homeview from "./Features/Recipes/Pages/Homeview";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

const App = () => {
  const [searchResult, setsearchResult] = useState([]);
  const [searchLoading, setsearchLoading] = useState(false);

  const filterRecipe = useCallback(async (query, filterType) => {
    setsearchResult([]);
    setsearchLoading(true);

    try {
      const res = await fetch(`${API_URL}filter.php?${filterType}=${query}`);
      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const result = await res.json();
      setsearchResult(result?.meals || []);
    } catch (error) {
      console.log(error);
    } finally {
      setsearchLoading(false);
    }
  }, []);

  // filter by category
  const filterByCategory = useCallback(
    (category) => {
      filterRecipe(category, "c");
    },
    [filterRecipe]
  );

  // filter by area
  const filterByArea = useCallback(
    (area) => {
      filterRecipe(area, "a");
    },
    [filterRecipe]
  );


  const handelSearch = useCallback(async (query) => {
    setsearchResult([]);
    setsearchLoading(true);

    try {
      const res = await fetch(`${API_URL}search.php?s=${query}`);

      if (!res.ok) throw new error(`Error: ${res.status}`);

      const result = await res.json();
      setsearchResult(result?.meals || [])
    } catch (error) {
      console.log(error);

    } finally {
      setsearchLoading(false);
    }
  }, []);

  return (
    <Router>
      <div className='min-h-screen bg-gray-950 font-sans text-gray-100'>
        <Navbar handelSearch={handelSearch} />
        <Cuisine filterByArea={filterByArea}/>
        <Routes>
          <Route path='/' element={<Homeview filterByCategory={filterByCategory}/>} />
          <Route path='/recipe/:id' element={<Recipedetailview />} />
          <Route path='/search/:query' element={<Searchview meals={searchResult} loading={searchLoading} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
