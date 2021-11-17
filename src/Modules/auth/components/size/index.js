import { useEffect, useState } from "react";
import { allsize, removesize } from "../../../../Api/size";
import { Link } from "react-router-dom";
import SizeScreenAuth from "../../screens/size/list";
import { TokenAccount, SetUser } from "../../../../hooks/useAccount";
import Swal from "sweetalert2";

const ListSizeComponent = () => {
  const [sizes, setSizes] = useState([]);
  useEffect(() => {
    const getSizes = async () => {
      try {
        const { data } = await allsize();
        setSizes(data);
      } catch (error) {
        console.log(error);
      }
    };
    getSizes();
  }, []);

  const onHandleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Bạn có chắc chắn muốn xóa size?',
        showCancelButton: true,
        confirmButtonText: 'Xóa!',
      }).then((result) => {
        if (result.isConfirmed) {
          const item = {
            id: id,
            token: TokenAccount.getToken(),
            user: SetUser.getUser()
          }
          removesize(item)
          Swal.fire('Thành công!', '', 'success')
          const newSizes = sizes.filter((items) => items.id !== id);
          setSizes(newSizes);
          
        } 
      })
      
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Link to="/admin/size/create" className="btn btn-primary mb-2">
        Create
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col" width="150">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <SizeScreenAuth data={sizes} onDelete={onHandleDelete} />
        </tbody>
      </table>
    </>
  );
};
export default ListSizeComponent;
