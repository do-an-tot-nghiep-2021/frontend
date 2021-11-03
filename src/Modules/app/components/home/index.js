import HomeScreen from "../../screens/home/homepage"
import { useProducts } from "../../../../hooks/useProducts";
import BannerApp from "../../../../Layouts/app/component/banner";

const HomePageComponentApp = () => {

    const { products } = useProducts()
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <h6 className="showing">Showing all 12 results</h6>
                </div>
            </div>
            <div className="row">
                {
                    products.map(product => (
                        <HomeScreen key={product.id} product={product} />
                    ))
                }
                
                <ul className="pagination home-product__pagination">
                    <li className="pagination-item">
                        <a href className="pagination-link_link">
                            <i className="pagination-item__icon fas fa-chevron-left" />
                        </a>
                    </li>
                    <li className="pagination-item pagination-item--active">
                        <a href className="pagination-link_link">1</a>
                    </li>
                    <li className="pagination-item ">
                        <a href className="pagination-link_link_link">2</a>
                    </li>
                    <li className="pagination-item ">
                        <a href className="pagination-link_link_link">3</a>
                    </li>
                    <li className="pagination-item ">
                        <a href className="pagination-link_link">
                            <i className="pagination-item__icon fas fa-chevron-right" />
                        </a>
                    </li>
                </ul>
            </div>

        </>
    )
}

export default HomePageComponentApp