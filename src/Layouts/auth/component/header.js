import { Link } from "react-router-dom"
import { useHistory } from "react-router";
import { logout } from "../../../Api/account";
import { TokenAccount, SetUser } from "../../../hooks/useAccount";
const HeaderAuth = ({ user }) => {
    const history = useHistory();
    const logoutToken = async () => {
        try {
            const tokenLogout = {
                token: TokenAccount.getToken()
            }
            TokenAccount.removeToken()
            SetUser.removeUser()
            await logout(tokenLogout)
            history.push("/login/account")
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            <header id="m_header" className="m-grid__item    m-header " m-minimize-offset={200} m-minimize-mobile-offset={200}>
                <div className="m-container m-container--fluid m-container--full-height">
                    <div className="m-stack m-stack--ver m-stack--desktop">
                        {/* BEGIN: Brand */}
                        <div className="m-stack__item m-brand  m-brand--skin-dark ">
                            <div className="m-stack m-stack--ver m-stack--general">
                                <div className="m-stack__item m-stack__item--middle m-brand__logo">
                                    <a href="index.html" className="m-brand__logo-wrapper">
                                        <img alt src="assets/demo/default/media/img/logo/logo_default_dark.png" />
                                    </a>
                                </div>
                                <div className="m-stack__item m-stack__item--middle m-brand__tools">
                                    {/* BEGIN: Left Aside Minimize Toggle */}
                                    <a href="javascript:;" id="m_aside_left_minimize_toggle" className="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-desktop-inline-block  ">
                                        <span />
                                    </a>
                                    {/* END */}
                                    {/* BEGIN: Responsive Aside Left Menu Toggler */}
                                    <a href="javascript:;" id="m_aside_left_offcanvas_toggle" className="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-tablet-and-mobile-inline-block">
                                        <span />
                                    </a>
                                    {/* END */}
                                    {/* BEGIN: Responsive Header Menu Toggler */}
                                    <a id="m_aside_header_menu_mobile_toggle" href="javascript:;" className="m-brand__icon m-brand__toggler m--visible-tablet-and-mobile-inline-block">
                                        <span />
                                    </a>
                                    {/* END */}
                                    {/* BEGIN: Topbar Toggler */}
                                    <a id="m_aside_header_topbar_mobile_toggle" href="javascript:;" className="m-brand__icon m--visible-tablet-and-mobile-inline-block">
                                        <i className="flaticon-more" />
                                    </a>
                                    {/* BEGIN: Topbar Toggler */}
                                </div>
                            </div>
                        </div>
                        {/* END: Brand */}
                        <div className="m-stack__item m-stack__item--fluid m-header-head" id="m_header_nav">
                            {/* BEGIN: Horizontal Menu */}
                            <button className="m-aside-header-menu-mobile-close  m-aside-header-menu-mobile-close--skin-dark " id="m_aside_header_menu_mobile_close_btn"><i className="la la-close" /></button>
                            <div id="m_header_menu" className="m-header-menu m-aside-header-menu-mobile m-aside-header-menu-mobile--offcanvas  m-header-menu--skin-light m-header-menu--submenu-skin-light m-aside-header-menu-mobile--skin-dark m-aside-header-menu-mobile--submenu-skin-dark ">

                            </div>
                            {/* END: Horizontal Menu */}
                            {/* BEGIN: Topbar */}
                            <div id="m_header_topbar" className="m-topbar  m-stack m-stack--ver m-stack--general m-stack--fluid">
                                <div className="m-stack__item m-topbar__nav-wrapper">
                                    <ul className="m-topbar__nav m-nav m-nav--inline">
                                        <li className="m-nav__item m-dropdown m-dropdown--large m-dropdown--arrow m-dropdown--align-center m-dropdown--mobile-full-width m-dropdown--skin-light	m-list-search m-list-search--skin-light" m-dropdown-toggle="click" id="m_quicksearch" m-quicksearch-mode="dropdown" m-dropdown-persistent={1}>
                                            <a href="#" className="m-nav__link m-dropdown__toggle">
                                                <span className="m-nav__link-icon"><i className="flaticon-search-1" /></span>
                                            </a>
                                            <div className="m-dropdown__wrapper">
                                                <span className="m-dropdown__arrow m-dropdown__arrow--center" />
                                                <div className="m-dropdown__inner ">
                                                    <div className="m-dropdown__header">
                                                        <form className="m-list-search__form">
                                                            <div className="m-list-search__form-wrapper">
                                                                <span className="m-list-search__form-input-wrapper">
                                                                    <input id="m_quicksearch_input" autoComplete="off" type="text" name="q" className="m-list-search__form-input" defaultValue placeholder="Search..." />
                                                                </span>
                                                                <span className="m-list-search__form-icon-close" id="m_quicksearch_close">
                                                                    <i className="la la-remove" />
                                                                </span>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="m-dropdown__body">
                                                        <div className="m-dropdown__scrollable m-scrollable" data-scrollable="true" data-height={300} data-mobile-height={200}>
                                                            <div className="m-dropdown__content">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="m-nav__item m-topbar__user-profile m-topbar__user-profile--img  m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light" m-dropdown-toggle="click">
                                            <a href="#" className="m-nav__link m-dropdown__toggle">
                                                <span className="m-topbar__userpic">
                                                    <img src={user.image} className="m--img-rounded m--marginless" style={{width : '41px', height : '41px', objectFit : 'cover'}} alt />
                                                </span>
                                                <span className="m-topbar__username m--hide">Nick</span>
                                            </a>
                                            <div className="m-dropdown__wrapper">
                                                <span className="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust" />
                                                <div className="m-dropdown__inner">
                                                    <div className="m-dropdown__header m--align-center" style={{ background: 'url(assets/app/media/img/misc/user_profile_bg.jpg)', backgroundSize: 'cover' }}>
                                                        <div className="m-card-user m-card-user--skin-dark">
                                                            <div className="m-card-user__pic">
                                                                <img src={user.image} className="m--img-rounded m--marginless" style={{width : '41px', height : '41px', objectFit : 'cover'}} alt />
                                                                {/*
						<span class="m-type m-type--lg m--bg-danger"><span class="m--font-light">S<span><span>
						*/}
                                                            </div>
                                                            <div className="m-card-user__details">
                                                                <span className="m-card-user__name m--font-weight-500">{user.name}</span>
                                                                <a href className="m-card-user__email m--font-weight-300 m-link">{user.email}</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="m-dropdown__body">
                                                        <div className="m-dropdown__content">
                                                            <ul className="m-nav m-nav--skin-light">
                                                                <li className="m-nav__section m--hide">
                                                                    <span className="m-nav__section-text">Section</span>
                                                                </li>
                                                                <li className="m-nav__item">
                                                                    <a href="header/profile.html" className="m-nav__link">
                                                                        <i className="m-nav__link-icon flaticon-profile-1" />
                                                                        <span className="m-nav__link-title">
                                                                            <span className="m-nav__link-wrap">
                                                                                <span className="m-nav__link-text">My Profile</span>
                                                                                <span className="m-nav__link-badge"><span className="m-badge m-badge--success">2</span></span>
                                                                            </span>
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                                <li className="m-nav__item">
                                                                    <a href="header/profile.html" className="m-nav__link">
                                                                        <i className="m-nav__link-icon flaticon-share" />
                                                                        <span className="m-nav__link-text">Activity</span>
                                                                    </a>
                                                                </li>
                                                                <li className="m-nav__item">
                                                                    <a href="header/profile.html" className="m-nav__link">
                                                                        <i className="m-nav__link-icon flaticon-chat-1" />
                                                                        <span className="m-nav__link-text">Messages</span>
                                                                    </a>
                                                                </li>
                                                                <li className="m-nav__separator m-nav__separator--fit">
                                                                </li>
                                                                <li className="m-nav__item">
                                                                    <a href="header/profile.html" className="m-nav__link">
                                                                        <i className="m-nav__link-icon flaticon-info" />
                                                                        <span className="m-nav__link-text">FAQ</span>
                                                                    </a>
                                                                </li>
                                                                <li className="m-nav__item">
                                                                    <a href="header/profile.html" className="m-nav__link">
                                                                        <i className="m-nav__link-icon flaticon-lifebuoy" />
                                                                        <span className="m-nav__link-text">Support</span>
                                                                    </a>
                                                                </li>
                                                                <li className="m-nav__separator m-nav__separator--fit">
                                                                </li>
                                                                <li className="m-nav__item">
                                                                    <a  className="btn m-btn--pill btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder" onClick={logoutToken}>Logout</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        {/* <li id="m_quick_sidebar_toggle" className="m-nav__item">
                                            <a href="#" className="m-nav__link m-dropdown__toggle">
                                                <span className="m-nav__link-icon"><i className="flaticon-grid-menu" /></span>
                                            </a>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                            {/* END: Topbar */}
                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}

export default HeaderAuth
