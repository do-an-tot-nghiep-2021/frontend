import { useEffect, useState } from "react";
import { allvoucher, redeemvoucher } from "../../../../Api/voucher";
import ListVoucherScreenApp from "../../screens/voucher/list";
import { SetUserGoogle } from "../../../../hooks/useAccount";
import Swal from "sweetalert2";

const VoucherComponentApp = () => {
  const [Vouchers, setVoucher] = useState([]);
  useEffect(() => {
    const getVoucher = async () => {
      try {
        const { data } = await allvoucher();
        setVoucher(data);
      } catch (error) {
        console.log(error);
      }
    };
    getVoucher();
  }, []);

  const onHandleAdd = async (id) => {
    try {
      Swal.fire({
        title: "Bạn có muốn thêm voucher này không??",
        showCancelButton: true,
        confirmButtonText: "Xac nhan!!",
      }).then((result) => {
        if (result.isConfirmed) {
          const item = {
            id: id,
            google_id: SetUserGoogle.getUserGoogle().google_id,
            user_id: SetUserGoogle.getUserGoogle().id,
          };
          console.log(item)
          redeemvoucher(item).then(response => {
            if (!response.data.status) {
              Swal.fire(response.data.message, '', 'error')
            }
            if (response.data.status) {
              Swal.fire('Thành công!', '', 'success')
            }
          })
        }
      });
    } catch (error) {
      Swal.fire('Không thể gửi request', '', 'error')
    }
  };

  return (
    <>
      {SetUserGoogle.getUserGoogle() ?
        <ListVoucherScreenApp data={Vouchers} onAdd={onHandleAdd} />
        : <p className="text-danger text-center">Bạn chưa đăng nhập hãy đăng nhập</p>}
    </>
  )
}

export default VoucherComponentApp
