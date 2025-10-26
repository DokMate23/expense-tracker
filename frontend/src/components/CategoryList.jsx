export default function CategoryList({ categories }) {
    return (
        <div>
            <h2>Categories</h2>
            <ol>
                {categories.map((category) => (
                    <li key={category._id}>{category.name}</li>
                ))}
            </ol>
        </div>
    )
}