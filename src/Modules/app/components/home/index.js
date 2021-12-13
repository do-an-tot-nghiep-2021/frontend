import HomeScreen from "../../screens/home/homepage";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { allcategory } from "../../../../Api/category"
import { allproductkeword } from "../../../../Api/product";
import ReactPaginate from "react-paginate";

const HomePageComponentApp = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const [category, setSetCategory] = useState([]);
  const [cateId, setCateId] = useState('');
  const [filter, setFilter] = useState('');
  const [keySearch, setKeySearch] = useState('');
  const [perPage, setPerPage] = useState(6);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);

  const handleSearch = (e) => {
    setKeySearch(e.target.value)
  }

  const handleSelect = (e) => {
    setFilter(e.target.value);
  };

  const handlePageClick = (event) => {
    let page = event.selected;
    setPage(page)
  }

  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data } = await allcategory();
        setSetCategory(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);

  useEffect(() => {
    const item = {
      keyword: keySearch,
      cate_id: cateId,
      filter: filter,
    }
    const getProducts = async () => {
      try {
        const { data } = await allproductkeword(item);
        setPages(Math.ceil(data.length / perPage))
        const items = data.slice(page * perPage, (page + 1) * perPage);
        setProducts(items)
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();

  }, [keySearch, cateId, filter, page]);




  return (
    <>
      <section className="breadcrumb-nav">
        <div className="container">
          <div className="breadcrumb-nav-inner">
            <ul>
              <li className="active"><a>Trang chủ</a></li>
            </ul>
            <label className="now">TRANG CHỦ</label>
          </div>
        </div>
      </section>
      <section className="default-section shop-page">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-sm-12 col-lg-3">
              <div className="blog-left-section">
                <div className="blog-left-search blog-common-wide wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                  <input type="text" name="txt" placeholder="Tìm kiếm" onChange={handleSearch} />
                </div>
                <div className="blog-left-categories blog-common-wide wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                  <h5>DANH MỤC</h5>

                  <ul className="list">
                    <li><Link onClick={() => setCateId('')} className={cateId == '' ? 'active cate_menu_home' : 'cate_menu_home'}>Tất cả</Link></li>
                    {category && category.map((item) => (
                      <li><Link class={cateId == item.id ? 'active cate_menu_home' : 'cate_menu_home'} onClick={() => setCateId(item.id)}>{item.name}</Link></li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
            <div className="col-12 col-md-8 col-sm-12 col-lg-9">
              <div className="blog-right-section">
                <div className="shop-search wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                  <div className="row">
                    <div className="col-6 col-sm-6 col-md-6">
                      <div className="gallery-pagination">
                        <ReactPaginate
                          previousLabel={'PREV'}
                          nextLabel={'NEXT'}
                          pageCount={pages}
                          onPageChange={handlePageClick}
                          containerClassName={'gallery-pagination-inner'}
                          pageClassName={'page-item-layout'}
                          previousClassName={'pagination-prev'}
                          nextClassName={'pagination-next'}
                          pageLinkClassName={''}
                          activeClassName={'active'}
                        />
                      </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-6">
                      <select className="select-dropbox" onChange={handleSelect}>
                        <option value="">Mới nhất</option>
                        <option value="1">Lọc theo tên từ A đến Z</option>
                        <option value="2">Lọc theo tên từ Z đến A</option>
                        <option value="3">Lọc theo giá từ thấp đến cao</option>
                        <option value="4">Lọc theo giá từ cao đến thấp</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {products.map((product) => (
                    <HomeScreen key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

};

export default HomePageComponentApp;
