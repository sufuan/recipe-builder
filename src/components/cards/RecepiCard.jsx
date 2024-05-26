import pizza from "../../assets/pizza.webp";

const RecepiCard = ({ recipe }) => {
  return (
    <div className="bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative">
      <figure>
        <img src={pizza} alt="food" className="max-w-50" />
      </figure>
      <div className="flex flex-col items-center my-3 space-y-2">
        <h1 className="text-gray-900 poppins text-lg">{recipe?.title}</h1>
        <p>
          {recipe?.description?.length > 30
            ? recipe?.description?.slice(0, 30)
            : recipe?.description}
        </p>
      </div>
    </div>
  );
};

export default RecepiCard;
