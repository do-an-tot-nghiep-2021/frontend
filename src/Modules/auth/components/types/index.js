import { useEffect, useState } from "react";
import { alltype, removetype } from "../../../../Api/types";
import { Link } from "react-router-dom";
import TypesScreenAuth from "../../screens/types/list";
import Swal from "sweetalert2";
import { TokenAccount, SetUser } from "../../../../hooks/useAccount";

const ListTypesComponent = () => {
  const [Types, setTypes] = useState([]);
  useEffect(() => {
    const getTypes = async () => {
      try {
        const { data } = await alltype();
        setTypes(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTypes();
  }, []);

  const onHandleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Bạn có muốn xóa thuộc tính này?',
        showCancelButton: true,
        confirmButtonText: 'Xóa!',
      }).then((result) => {
        if (result.isConfirmed) {
          const item = {
            id: id,
            token: TokenAccount.getToken(),
            user: SetUser.getUser()
          }
          removetype(item);
          const newTypes = Types.filter((items) => items.id !== id);
          Swal.fire('Thành công!', '', 'success')
          setTypes(newTypes);
          
          
        } 
      })
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Link to="/admin/types/create" className="btn btn-primary mb-2">
        Create
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
         
            <th scope="col" width="150">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <TypesScreenAuth data={Types} onDelete={onHandleDelete} />
        </tbody>
      </table>
    </>
  );
};
export default ListTypesComponent;
