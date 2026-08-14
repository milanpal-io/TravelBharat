import { Link } from "react-router-dom";

function CategoryCard({ category, icon, description }) {
  return (
    <Link
      to={`/categories/${category.toLowerCase()}`}
      className="group block overflow-hidden rounded-2xl bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="mb-5 text-5xl">
        {icon}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-orange-500">
        {category}
      </h2>

      <p className="mt-3 leading-relaxed text-gray-600">
        {description}
      </p>

      <div className="mt-6 font-semibold text-orange-500">
        Explore {category} →
      </div>
    </Link>
  );
}

export default CategoryCard;