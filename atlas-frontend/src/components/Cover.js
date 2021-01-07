import React from "react";

export default function Cover() {
  return (
    <div>
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          <div className="container">
            <div className="masthead clearfix">
              <div className="container inner">
                <h3 className="masthead-brand">WELCOME TO ATLAS</h3>
                <h4 className="masthead-slogan" >
                  THE WHOLE WORLD IN YOUR HANDS
                </h4>
                <nav>
                  <ul className="nav masthead-nav">
                    <li>
                      <a href="/home">Map</a>
                    </li>
                    <li>
                      <a href="/login">Login</a>
                    </li>
                    <li>
                      <a href="/signup">SignUp</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
