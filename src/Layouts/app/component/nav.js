import { Link } from "react-router-dom";
import { formatNumber } from "../../../Helpers/utils";
import { useCart } from '../../../hooks/useCart';

const NavApp = () => {
  const { itemCount, total } = useCart();
  return (
    <>
      <header className="header-area dfoody-header dfdV2">
        <div className="dfoody-header-box">
          <div className="container">
            <div className="row">
              <div className="col-3 col-md-3">
                <div className="logo-wrapper">
                  <Link to="/">
                    <img src={process.env.PUBLIC_URL + '/logo-site.png'} alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-9 col-md-9">
                <div className="gm-box">
                  <div className="gmb-contact">
                    <p>Call Now: <a href="tel:8883875000">888.387.8888</a></p>
                  </div>
                  <div className="dfoody-menu-wrapper">
                    <input id="dfoodyMenu-state" type="checkbox" />
                    <label className="dfoodyMenu-btn" htmlFor="dfoodyMenu-state">
                      <span className="dfoodyMenu-btn-icon" />
                    </label>
                    <ul id="dfoodyMenu" className="sm sm-simple dfoody-menu">
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li><a href="about.html">About</a></li>
                      <li>
                        <a href="reservation.html">Reservation</a>
                      </li>
                      <li>
                        <a href="foodmenu.html">Menu</a>
                      </li>
                      <li>
                        <a href="blog.html">Blog</a>
                        <ul>
                          <li>
                            <a href="blog.html">Blog</a>
                          </li>
                          <li>
                            <a href="blog-2.html">Blog 2</a>
                          </li>
                          <li>
                            <a href="blog-details.html">Blog Single</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#">Pages</a>
                        <ul>
                          <li>
                            <a href="contact.html">Contact</a>
                          </li>
                          <li>
                            <a href="gallery-1.html">Gallery 1</a>
                          </li>
                          <li>
                            <a href="gallery-2.html">Gallery 2</a>
                          </li>
                          <li>
                            <a href="shop.html">Shop</a>
                          </li>
                          <li>
                            <a href="cart.html">Cart</a>
                          </li>
                          <li>
                            <a href="checkout.html">Checkout</a>
                          </li>
                          <li>
                            <a href="faq.html">FAQ</a>
                          </li>
                          <li>
                            <a href="404.html">404</a>
                          </li>
                          <li>
                            <a href="coming-soon.html">Coming Soon</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-icons">
                    <ul className="mti-list">
                      <li>
                        <span className="searchIcon">
                          {/* <i className="flaticon-search" /> */}
                          <i class="fas fa-search"></i>
                        </span>
                        <div className="hSearchBox">
                          <form id="search" action="#" method="post">
                            <div className="search-o-group">
                              <input type="text" name="search-terms" id="search-terms" placeholder="Enter search terms..." />
                              <button type="submit" className="osearch-btn"><i className="fa fa-search" aria-hidden="true" /></button>
                            </div>
                          </form>
                        </div>
                      </li>
                      <li>
                        <Link to="/cart">
                          <span id="cart">
                          {/* <i className="flaticon-shopping-cart" /> */}
                          <i class="fas fa-shopping-cart"></i>
                          <span className="badge">{itemCount}</span>
                          </span>
                          </Link>
                        <div className="shopping-cart">
                          <div className="shopping-cart-header">
                            <div className="shopping-cart-total">
                              <span className="lighter-text">Total:</span>
                              <span className="main-color-text total">$461.15</span>
                            </div>
                          </div>
                          <ul className="shopping-cart-items">
                            <li>
                              <img src="assets/img/food-menu/mpfood-1.jpg" alt="" />
                              <span className="item-name">XMREDTREE</span>
                              <span className="item-price">$49.50</span>
                              <span className="item-quantity">Quantity: 01</span>
                              <span className="cartProduct-remove">
                                <i className="fa fa-times" aria-hidden="true" />
                              </span>
                            </li>
                            <li>
                              <img src="assets/img/food-menu/mpfood-2.jpg" alt="" />
                              <span className="item-name">XMWHREIN</span>
                              <span className="item-price">$34.06</span>
                              <span className="item-quantity">Quantity: 10</span>
                              <span className="cartProduct-remove">
                                <i className="fa fa-times" aria-hidden="true" />
                              </span>
                            </li>
                            <li>
                              <img src="assets/img/food-menu/mpfood-3.jpg" alt="" />
                              <span className="item-name">XMJBRR</span>
                              <span className="item-price">$14.21</span>
                              <span className="item-quantity">Quantity: 5</span>
                              <span className="cartProduct-remove">
                                <i className="fa fa-times" aria-hidden="true" />
                              </span>
                            </li>
                          </ul>
                          <a href="#" className="button">Checkout</a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>


      {/* <nav className="site-header sticky-top py-1">
        <div className="container d-flex flex-column flex-md-row justify-content-between">
          <a className="py-2" href="#" aria-label="Product">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="d-block mx-auto"
              role="img"
              viewBox="0 0 24 24"
              focusable="false"
            >
              <title>Product</title>
              <circle cx={12} cy={12} r={10} />
              <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94" />
            </svg>
          </a>
          <Link className="py-2 d-none d-md-inline-block" to="/">
            Home
          </Link>
          <Link className="py-2 d-none d-md-inline-block" to="/login/account">
            Login
          </Link>
          <Link className="py-2 d-none d-md-inline-block" to="/checkorder">
            Checkorder
          </Link>
          <a className="py-2 d-none d-md-inline-block" href="#">
            Enterprise
          </a>
          <a className="py-2 d-none d-md-inline-block" href="#">
            Support
          </a>
          <Link className="py-2 d-none d-md-inline-block" to="/admin">
            Admin
          </Link>
          <Link className="py-2 d-none d-md-inline-block" to="/cart">
            Cart 
            <span className="bg-danger text-light pl-1 pr-1 rounded">{itemCount}</span>
            <span>total price: {formatNumber(total)}</span>
          </Link>
        </div>
      </nav> */}
    </>
  );
};

export default NavApp;
