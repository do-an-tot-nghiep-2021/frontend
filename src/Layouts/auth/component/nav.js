import { NavLink } from "react-router-dom";
const NavAuth = () => {
  return (
    <>
      <nav className="col-md-2 d-none d-md-block bg-dark sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column nav nav-pills flex-column mb-auto">
            <li className="nav-item ">
              <NavLink
                to="/"
                className="nav-link text-white"
                activeClassName=" "
              >
                <i class="fas fa-tachometer-alt"></i> Home Page
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                to="/admin/dashboars"
                className="nav-link text-white"
                activeClassName="active"
              >
                <i class="fas fa-tachometer-alt"></i> DashBoars
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-white"
                to="/admin/products"
                activeClassName="active"
              >
                <span data-feather="shopping-cart" />
                <i class="fas fa-th"></i> Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-white"
                to="/admin/categories"
                activeClassName="active"
              >
                <span data-feather="shopping-cart" />
                <i class="fas fa-align-left"></i> Categories
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link text-white"
                to="/admin/orders"
                activeClassName="active"
              >
                <span data-feather="shopping-cart" />
                <i class="fas fa-table"></i> Order
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-white"
                to="/admin/building"
                activeClassName="active"
              >
                <span data-feather="users" />
                <i class="fas fa-user-circle"></i> Building
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-white"
                to="/admin/classroom"
                activeClassName="active"
              >
                <span data-feather="users" />
                <i class="far fa-image"></i> Classroom
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink
                className="nav-link text-white"
                to="/admin/toppings"
                activeClassName="active"
              >
                <span data-feather="users" />
                <i class="fas fa-coffee"></i> Topping
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-white"
                to="/admin/types"
                activeClassName="active"
              >
                <span data-feather="users" />
                <i class="fas fa-coffee"></i> types
              </NavLink>
            </li>            
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavAuth;
