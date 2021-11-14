import { Link } from "react-router-dom";
import { formatNumber } from "../../../Helpers/utils";
import { useCart } from '../../../hooks/useCart';

const NavApp = () => {
  const {  itemCount, total } = useCart();
  return (
    <>
      <nav className="site-header sticky-top py-1">
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
      </nav>
    </>
  );
};

export default NavApp;
