import { useEffect } from "react";
import Banner from "../components/home/Banner";
import { useState } from "react";
import RecepiCard from "../components/cards/RecepiCard";
import CategoryCard from "../components/cards/CategoryCard";
import Skeleton from "../components/cards/Skeleton";

export default function Home() {
  const [recipes, setRescipes] = useState();
  const [categoris, setCategories] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function load() {
      //get recipies
      const recipeRes = await fetch("http://localhost:3000/recipes");
      const recipeData = await recipeRes.json();
      setRescipes(recipeData);
      //get categories

      const categoryRes = await fetch("http://localhost:3000/categories");
      const categoryData = await categoryRes.json();

      setCategories(categoryData);
    }
    load();

    // fetch("http://localhost:3000/categories")
    //   .then((res) => res.json())
    //   .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <Banner />

      <div className="mx-16">
        <h1 className="text-4xl my-20 text-center">Our Recipe Categories </h1>
        <div className="flex gap-4">
          {categoris?.map((category) => (
            <CategoryCard key={category?.id} category={category} />
          ))}
        </div>
      </div>

      <div className="mx-16">
        <h1 className="text-4xl my-20 text-center">Our Newest Recipes </h1>
        <div className="grid grid-cols-4 gap-6">
          {recipes
            ?.reverse()
            ?.slice(0, 4)
            ?.map((recipe) =>
              loading ? (
                <Skeleton key={recipe._id} />
              ) : (
                <RecepiCard key={recipe?.id} recipe={recipe} />
              )
            )}
        </div>
      </div>
    </div>
  );
}
