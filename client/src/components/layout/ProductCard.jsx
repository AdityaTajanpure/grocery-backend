import React from "react";

function FoodStoreCard() {
  return (
    <div id="food-store-card-page">
      <div className="card" style={{ width: "18rem" }}>
        <div className="p-5 offers">20% OFF</div>
        <img
          src={
            "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=480,h=480/app/images/products/sliding_image/3493a.jpg"
          }
          className="card-img-top card-image"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title f-16">Go Plane cheese sandwitch</h5>
          <div className="mt-2 grey-value">479g</div>
          <div className="row">
            <div>
              <div className="row">
                <div className="col-sm-6 md-6 lg-6 ">
                  <div className="f-14">&#8377;247</div>
                  <div className="grey-value">
                    <del>&#8377;560</del>
                  </div>
                </div>
                <div className="col-sm-6 md-6 lg-6 f-14 add-button">
                  <a href="#" className="btn btn-outline-success">
                    add
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodStoreCard;
