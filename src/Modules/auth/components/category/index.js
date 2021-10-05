import { useEffect, useState } from "react";
import { all, remove } from "../../../../Api/category";
import CategoryScreenAuth from "../../screens/category/list";
import { Link } from "react-router-dom";

const CategoryListAuth = () => {

    const [Categories, setCategories] = useState([])
    useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await all();
                setCategories(data)
            } catch (error) {
                console.log(error)
            }

        };
        getCategories();
    }, [])

    console.log(Categories)
    const onHandleDelete = async (id) => {
        try {
          await remove(id);
          const newCategories = Categories.filter((item) => item.id !== id);
          setCategories(newCategories);
        } catch (error) {
          console.log(error)
        }
        
      }

    return (
        <>
            <Link to="/admin/categories/create" className="btn btn-primary mb-2" >Create</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col" width="200">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <CategoryScreenAuth data={Categories} onDelete={onHandleDelete} />
                </tbody>
            </table>

        </>
    )
}

export default CategoryListAuth
