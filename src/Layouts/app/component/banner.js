const BannerApp = () => {
  return (
    <>
      <div className="col-md-3 col-sm-4 col-xs-12 blog-left-section">
        <div className="button-navbar">
          <input type="text" name="txt" placeholder="Search" />
        </div>
        <div className="blog-left-categories blog-common-wide">
          <h5>Categories</h5>
          <ul className="list">
            <li>
              <a href="#">Catering</a>
            </li>
            <li>
              <a href="#">Community</a>
            </li>
            <li>
              <a href="#">Employment</a>
            </li>
            <li>
              <a href="#">Franchise</a>
            </li>
            <li>
              <a href="#">Kids Corner</a>
            </li>
            <li>
              <a href="#">Our Recipes</a>
            </li>
          </ul>
        </div>
        <div className="blog-left-filter blog-common-wide ">
          <h5>Filter</h5>
          <p>Price: $40 — $350</p>
          <div className="slider slider-horizontal" id>
            <div className="slider-track">
              <div
                className="slider-track-low"
                style={{ left: "0px", width: "3.22581%" }}
              />
              <div
                className="slider-selection"
                style={{ left: "3.22581%", width: "96.7742%" }}
              />
              <div
                className="slider-track-high"
                style={{ right: "0px", width: "0%" }}
              />
            </div>
            <div
              className="tooltip tooltip-main top"
              role="presentation"
              style={{ left: "51.6129%", marginLeft: "-30px" }}
            >
              <div className="tooltip-arrow" />
              <div className="tooltip-inner">50 : 350</div>
            </div>
            <div
              className="tooltip tooltip-min top"
              role="presentation"
              style={{
                left: "3.22581%",
                marginLeft: "0px",
                display: "none",
              }}
            >
              <div className="tooltip-arrow" />
              <div className="tooltip-inner">50</div>
            </div>
            <div
              className="tooltip tooltip-max top"
              role="presentation"
              style={{ left: "100%", marginLeft: "0px", display: "none" }}
            >
              <div className="tooltip-arrow" />
              <div className="tooltip-inner">350</div>
            </div>
            <div
              className="slider-handle min-slider-handle round"
              role="slider"
              aria-valuemin={40}
              aria-valuemax={350}
              aria-valuenow={50}
              tabIndex={0}
              style={{ left: "3.22581%" }}
            />
            <div
              className="slider-handle max-slider-handle round"
              role="slider"
              aria-valuemin={40}
              aria-valuemax={350}
              aria-valuenow={350}
              tabIndex={0}
              style={{ left: "100%" }}
            />
          </div>
          <input
            id="ex2"
            type="text"
            className="span2"
            defaultValue="50,350"
            data-slider-min={40}
            data-slider-max={350}
            data-slider-step={5}
            data-slider-value="[50,200]"
            data-value="50,350"
            style={{ display: "none" }}
          />
          <a href="#" className="filter-btn">
            FILTER
          </a>
        </div>
        <div className="best-deals-product">
          <h5>BEST DEALS</h5>
          <div className="best-deal-blog">
            <div className="best-deal-left">
              <img src="/img/img20.png" alt="" />
            </div>
            <div className="best-deal-right">
              <p>Lasal Cheese</p>
              <p>
                <strong>15.000</strong>
              </p>
            </div>
          </div>
          <div className="best-deal-blog">
            <div className="best-deal-left">
              <img src="/img/img20.png" alt="" />
            </div>
            <div className="best-deal-right">
              <p>Lasal Cheese</p>
              <p>
                <strong>15.000</strong>
              </p>
            </div>
          </div>
          <div className="best-deal-blog">
            <div className="best-deal-left">
              <img src="/img/img20.png" alt="" />
            </div>
            <div className="best-deal-right">
              <p>Lasal Cheese</p>
              <p>
                <strong>15.000</strong>
              </p>
            </div>
          </div>
        </div>
        <div className="popular-tag blog-common-wide">
          <h5>Popular Tags</h5>
          <a href="#">Audio</a>
          <a href="#">Service</a>
          <a href="#">Online Order</a>
          <a href="#">Contact</a>
          <a href="#">Cupcake</a>
        </div>
      </div>
    </>
  );
};

export default BannerApp;
