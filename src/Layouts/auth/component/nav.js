import { NavLink } from "react-router-dom";
const NavAuth = () => {
  return (
    <>
      <div id="m_aside_left" className="m-grid__item	m-aside-left  m-aside-left--skin-dark ">
        <div id="m_ver_menu" className="m-aside-menu  m-aside-menu--skin-dark m-aside-menu--submenu-skin-dark " m-menu-vertical={1} m-menu-scrollable={1} m-menu-dropdown-timeout={500} style={{ position: 'relative' }}>
          <ul className="m-menu__nav  m-menu__nav--dropdown-submenu-arrow ">
            <li className="m-menu__item " aria-haspopup="true">
              <NavLink to="/admin" className="m-menu__link " activeStyle={{color: '#0d6efd'}}>
                <i className="m-menu__link-icon flaticon-home-2" />
                <span className="m-menu__link-title">
                  <span className="m-menu__link-wrap">
                    <span className="m-menu__link-text">Dashboard</span>
                    {/* <span className="m-menu__link-badge">
                      <span className="m-badge m-badge--danger">2</span>
                    </span> */}
                  </span>
                </span>
              </NavLink>
            </li>
            <li className="m-menu__section ">
              <h4 className="m-menu__section-text">Thành phần</h4>
              <i className="m-menu__section-icon flaticon-more-v2" />
            </li>
            <li className="m-menu__item  m-menu__item--submenu">
              <NavLink to="/admin/categories" className="m-menu__link" activeStyle={{color: '#0d6efd'}}>
                <i className="m-menu__link-icon flaticon-interface-7" />
                <span className="m-menu__link-text">Danh mục</span>
              </NavLink>
            </li>
            <li className="m-menu__item  m-menu__item--submenu" >
              <NavLink to="/admin/products" className="m-menu__link m-menu__toggle">
                <i className="m-menu__link-icon flaticon-squares-3" />
                <span className="m-menu__link-text">Sản phẩm</span>
              </NavLink>
            </li>
            <li className="m-menu__item  m-menu__item--submenu">
              <NavLink to="/admin/orders" className="m-menu__link m-menu__toggle">
                <i className="m-menu__link-icon flaticon-notes" />
                <span className="m-menu__link-text">Đơn hàng</span>
              </NavLink>
            </li>
            <li className="m-menu__item  m-menu__item--submenu">
              <NavLink to="/admin/building" className="m-menu__link m-menu__toggle">
                <i className="m-menu__link-icon flaticon-buildings" />
                <span className="m-menu__link-text">Tòa nhà</span>
              </NavLink>
            </li>
            <li className="m-menu__item  m-menu__item--submenu">
              <NavLink to="/admin/classroom" className="m-menu__link m-menu__toggle">
                <i className="m-menu__link-icon flaticon-calendar-2" />
                <span className="m-menu__link-text">Phòng học</span>
              </NavLink>
            </li>
            <li className="m-menu__item  m-menu__item--submenu">
              <NavLink to="/admin/types" className="m-menu__link m-menu__toggle">
                <i className="m-menu__link-icon flaticon-interface-6" />
                <span className="m-menu__link-text">Thuộc tính</span>
              </NavLink>
            </li>
            <li className="m-menu__item  m-menu__item--submenu">
              <NavLink to="/admin/toppings" className="m-menu__link m-menu__toggle">
                <i className="m-menu__link-icon flaticon-apps" />
                <span className="m-menu__link-text">Topping</span>
              </NavLink>
            </li>
            <li className="m-menu__item  m-menu__item--submenu">
              <NavLink to="/admin/vouchers" className="m-menu__link m-menu__toggle">
                <i className="m-menu__link-icon flaticon-apps" />
                <span className="m-menu__link-text">Vouchers</span>
              </NavLink>
            </li>
            <li className="m-menu__item  m-menu__item--submenu">
              <NavLink to="/admin/users" className="m-menu__link m-menu__toggle">
                <i className="m-menu__link-icon flaticon-user" />
                <span className="m-menu__link-text">Tài khoản</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavAuth;
