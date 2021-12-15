import { formatNumber } from "../../../../Helpers/utils";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
const DashListCancelData = ({ data }) => {
    const [dataItems, setDataItems] = useState([]);
    const [perPage, setPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(0);

    console.log(dataItems)
    const handlePageClick = (event) => {
        let page = event.selected;
        setPage(page)
    }

    useEffect(() => {
        const getData = async () => {
            try {
                setPages(Math.ceil(data && data.length / perPage))
                const items =  data.slice(page * perPage, (page + 1) * perPage);
                setDataItems(items)

            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [page, data]);

    return (
        <div className="m-portlet__body">
            <div class="d-flex justify-content-between">
                <div>
                    <h5>ĐƠN HÀNG MỚI CHƯA XỬ LÍ
                        <span className="m-menu__link-badge">
                            <span className="m-badge m-badge--danger ml-2 mb-2">{data.length}</span>
                        </span>
                    </h5>
                </div>
                <div>
                    {pages < 2 ? "" :
                        <ReactPaginate
                            previousLabel={'<'}
                            nextLabel={'>'}
                            pageCount={pages}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination-cancel'}
                            pageClassName={'page-item-cancel'}
                            previousClassName={'page-item-cancel'}
                            nextClassName={'page-item-cancel'}
                            pageLinkClassName={'page-link-cancel'}
                            activeClassName={'active-page'}
                        />
                    }
                </div>
            </div>

            {dataItems && dataItems.map((items, index) => (
                <div className="row m-2" key={index}>
                    <div className="col-12">
                        <img src={items.user.image} style={{ borderRadius: '50px', width: '30px' }} />
                        <span className="mr-1 ml-2" style={{ fontWeight: '500' }}>{items.user.name}</span> đặt hàng
                        {items.products.map((item) => (
                            <span style={{ fontWeight: '500' }} key={item.id}> {item.name},</span>
                        ))}
                        <span> đặt vào lúc</span><span style={{ fontWeight: '500' }}> {items.time_create}, {items.date_create}</span>
                        <span> .Tổng hóa đơn :</span><span style={{ fontWeight: '500' }}> {formatNumber(items.price_total)}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DashListCancelData
