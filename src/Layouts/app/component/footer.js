import { Link } from "react-router-dom"
const FooterApp = () => {
    return (
        <>
            <footer className="footer-area">
                <div className="footer-widget-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="f-widget footer-logo-info">
                                    <img src={process.env.PUBLIC_URL + '/text-logo-footer.png'}  alt="" />
                                    <div className="fw-contact">
                                        <p><i className="fa fa-map-marker" aria-hidden="true" />Materfront avenue, street 2005F, USA</p>
                                        <a href="#"><i className="fa fa-phone" aria-hidden="true" />+1 888.387.5000</a>
                                        <a href="#">+1 888.387.5000</a>
                                        <a href="#" className="fmail">
                                            <i className="fa fa-envelope" aria-hidden="true" />
                                            <span className="__cf_email__">
                                                theanhpham@fpt.edu.vn
                                            </span>
                                        </a>
                                    </div>
                                </div>
                                <div className="footer-social-widget">
                                    <h4>Follow Us :</h4>
                                    <ul className="footer-social">
                                        <li>
                                            <a href="https://twitter.com/voidcoders"><i class="fab fa-twitter"></i></a>
                                        </li>
                                        <li>
                                            <a href="https://www.facebook.com/voidcoders/"><i class="fab fa-facebook-f"></i></a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com/voidcoders/"><i class="fab fa-instagram"></i></a>
                                        </li>
                                        <li>
                                            <a href="https://www.linkedin.com/company/voidcoders/about/"><i class="fab fa-youtube"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="f-widget">
                                            <h4>Usefull Links</h4>
                                            <ul className="fw-links">
                                                <li><a href="#">Home</a></li>
                                                <li><a href="#">About</a></li>
                                                <li><a href="#">reservation</a></li>
                                                <li><a href="#">Contacts</a></li>
                                                <li><a href="#">Our Menu</a></li>
                                                <li><a href="#">Blog</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="f-widget">
                                            <h4>Extras</h4>
                                            <ul className="fw-links">
                                                <li><Link to="/checkorder">My Order</Link></li>
                                                <li><Link to="/voucher">Voucher</Link></li>
                                                <li><a href="#">Catering</a></li>
                                                <li><a href="#">Our Locations</a></li>
                                                <li><a href="#">Privacy Policy</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="f-widget f-instawiget">
                                    <h4>Instagram</h4>
                                    <ul className="fw-instagram">
                                        <li>
                                            <a data-fancybox="gallery" href="assets/img/gallery/insta-1.jpg"><img src="assets/img/gallery/insta-1.jpg" alt="" /></a>
                                        </li>
                                        <li>
                                            <a data-fancybox="gallery" href="assets/img/gallery/insta-2.jpg"><img src="assets/img/gallery/insta-2.jpg" alt="" /></a>
                                        </li>
                                        <li>
                                            <a data-fancybox="gallery" href="assets/img/gallery/insta-3.jpg"><img src="assets/img/gallery/insta-3.jpg" alt="" /></a>
                                        </li>
                                        <li>
                                            <a data-fancybox="gallery" href="assets/img/gallery/insta-4.jpg"><img src="assets/img/gallery/insta-4.jpg" alt="" /></a>
                                        </li>
                                        <li>
                                            <a data-fancybox="gallery" href="assets/img/gallery/insta-5.jpg"><img src="assets/img/gallery/insta-5.jpg" alt="" /></a>
                                        </li>
                                        <li>
                                            <a data-fancybox="gallery" href="assets/img/gallery/insta-6.jpg"><img src="assets/img/gallery/insta-6.jpg" alt="" /></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="copyright-text">
                                    <p>© 2020 Dfoody! All Rights Reserved By <a href="#">VoidCoders</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default FooterApp
