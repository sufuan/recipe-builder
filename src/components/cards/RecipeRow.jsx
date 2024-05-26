import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
export default function RecipeRow({ recipe }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (shouldDelete) {
      // Simulate deletion with a timeout
      setIsDeleting(true);
      setTimeout(() => {
        // Here you would delete the recipe using an API call
        toast.success("Recipe deleted successfully!");
        setIsDeleting(false);
      }, 1000);
    }
  };

  return (
    <tr>
      <th>{recipe?.id}</th>
      <td>{recipe?.title}</td>
      <td>{recipe?.price}</td>
      <td>{recipe?.category}</td>
      <td className="flex gap-4">
        <Link
          to={`/dashboard/edit-recipe/${recipe?.id}`}
          className="btn btn-xs btn-neutral"
        >
          Edit
        </Link>
        <button
          className="btn btn-xs btn-error"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </td>
    </tr>
  );
}
