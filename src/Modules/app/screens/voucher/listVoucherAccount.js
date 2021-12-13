import NumberFormat from "react-number-format"
const ListVoucherAccountScreenApp = ({ data }) => {
    console.log(data)
    return (
        <div className="row">
            {data && data.map((item, index) => (
                <div className="col-4 voucher mt-3" key={index}>
                    <div className="row">
                        <div className="col-5">
                            <img src={item.voucher.image} />
                        </div>
                        <div className="col-7">
                            <div className="content-voucher">
                                <h5>{item.voucher.name}</h5>
                                <p className="point">
                                    <span className="text-dark">Số điểm yêu cầu: </span> <br />
                                    <NumberFormat value={item.voucher.point} displayType={'text'} thousandSeparator={true} /> điểm
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListVoucherAccountScreenApp
