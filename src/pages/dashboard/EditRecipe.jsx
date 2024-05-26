import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditRecipe = () => {
  const { id } = useParams();

  const [recipeDetails, setRecipeDetails] = useState();
  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await axios.get(
          "http://localhost:3000/categories"
        );
        if (categoriesData?.status === 200) {
          setCategories(categoriesData?.data);
        }

        const recipeData = await axios.get(
          `http://localhost:3000/recipes/${id}`
        );
        if (recipeData?.status === 200) {
          setRecipeDetails(recipeData?.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdateRecipe = async (e) => {
    e.preventDefault();

    const shouldUpdate = window.confirm(
      "Are you sure you want to update this recipe?"
    );
    if (!shouldUpdate) {
      return;
    }

    const form = e.target;
    const title = form.title.value;
    const price = form.price.value;
    const category = form.category.value;
    const description = form.description.value;

    try {
      const recipeData = {
        id,
        title,
        price,
        category,
        description,
      };

      await axios.patch(`http://localhost:3000/recipes/${id}`, recipeData);
      toast.success("Recipe updated successfully!");
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <div className="w-full px-16">
      <h1 className="text-4xl mb-4">Edit Recipe</h1>
      <form onSubmit={handleUpdateRecipe} className="w-full">
        <div className="mb-4">
          <label htmlFor="">Title</label>
          <input
            defaultValue={recipeDetails?.title}
            type="text"
            name="title"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="">Price</label>
          <input
            defaultValue={recipeDetails?.price}
            type="number"
            name="price"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="">Category</label>
          <select name="category" className="w-full py-3 px-5 border">
            {categories?.map((category) => (
              <option
                key={category?.title}
                selected={category?.title === recipeDetails?.category}
                value={category?.title}
              >
                {category?.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="">Description</label>
          <textarea
            defaultValue={recipeDetails?.description}
            name="description"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <input
            type="submit"
            value={"Update Recipe"}
            className="w-full btn py-3 px-5 border btn-neutral"
          />
        </div>
      </form>
    </div>
  );
};

export default EditRecipe;
