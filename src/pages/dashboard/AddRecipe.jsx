import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRecipe = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    }

    load();
  }, []);

  const handleCreateRecipe = async (e) => {
    e.preventDefault();

    const shouldAdd = window.confirm(
      "Are you sure you want to add this recipe?"
    );

    if (!shouldAdd) {
      return;
    }

    const form = e.target;
    const id = form.id.value;
    const title = form.title.value;
    const price = form.price.value;
    const category = form.category.value;
    const description = form.description.value;

    const recipeData = {
      id,
      title,
      price,
      category,
      description,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/recipes",
        recipeData
      );
      if (response.status === 201) {
        toast.success("Recipe added successfully!");
        form.reset(); // Clear the form fields on success
      } else {
        toast.error("Failed to add recipe. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to add recipe. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-center">Add Recipe</h1>
      <form onSubmit={handleCreateRecipe} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="id" className="block text-gray-700">
            Id
          </label>
          <input
            type="text"
            name="id"
            className="w-full py-3 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="w-full py-3 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            className="w-full py-3 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">
            Category
          </label>
          <select
            name="category"
            className="w-full py-3 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            className="w-full py-3 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300"
          >
            Add Recipe
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddRecipe;
