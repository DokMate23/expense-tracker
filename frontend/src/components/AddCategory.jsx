import { addCategory } from "../services/Services";

export default function AddCategory({ onNewCategory }) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name: e.target.name.value,
            }
            const res = await addCategory(payload);
            if (onNewCategory) onNewCategory(res.data.data);
            e.target.name.value = "";
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Category Name" required />
                <button type="submit">Add Category</button>
            </form>
        </div>
    )
}