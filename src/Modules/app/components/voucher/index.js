import { useEffect, useState, useCallback } from "react";
import { allvoucher, redeemvoucher } from "../../../../Api/voucher";
import ListVoucherScreenApp from "../../screens/voucher/list";
import { SetUserGoogle } from "../../../../hooks/useAccount";
import Swal from "sweetalert2";
import { getprofileidgoogle } from "../../../../Api/user";
import { Link } from "react-router-dom";

const VoucherComponentApp = () => {
  const [Vouchers, setVoucher] = useState([]);
  const [pointUser, setPointUser] = useState();

  const refresh = useCallback(() => {
    const getPoint = async () => {
        try {
          const newItems = {
            google_id : SetUserGoogle.getUserGoogle().google_id,
            id: SetUserGoogle.getUserGoogle().id
        }
        const respons = await getprofileidgoogle(newItems);
        const userGoogle = respons.data;
        setPointUser(userGoogle.point)
        } catch (error) {
            console.log(error);
        }
    };
    getPoint();
}, [])

  useEffect(async () => {
    if (SetUserGoogle.getUserGoogle()) {
        const newItems = {
            google_id : SetUserGoogle.getUserGoogle().google_id,
            id: SetUserGoogle.getUserGoogle().id
        }
        const respons = await getprofileidgoogle(newItems);
        const userGoogle = respons.data;
        setPointUser(userGoogle.point)
    }
}, [pointUser]);

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
              refresh()
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
    <section className="breadcrumb-nav">
                <div className="container">
                    <div className="breadcrumb-nav-inner">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li className="active"><a >Ưu đãi</a></li>
                        </ul>
                        <label className="now">ƯU ĐÃI</label>
                    </div>
                </div>
            </section>
      {SetUserGoogle.getUserGoogle() ?
        <ListVoucherScreenApp data={Vouchers} onAdd={onHandleAdd} point={pointUser} />
        : 
        <section className="default-section shop-cart bg-grey">
                <div className="container">
                <div className="order-complete-box wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                    <img src="https://cdn.tecotecshop.com/assets/img/no-cart.png" style={{width : "400px", height : "300px"}} alt="" />
                    <p>Bạn chưa đăng nhập! <br /> Bây giờ, hãy đăng nhập tài khoản google của bạn để mua đồ uống tại BeeCoffee nhé.</p>
                </div>
                </div>
            </section>
        }
    </>
  )
}

export default VoucherComponentApp
