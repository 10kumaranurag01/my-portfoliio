import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import data from "../assets/data.json";

const Work = () => {
  return (
    <div id="work">
      <h2>WORK</h2>
      <section>
        <article>
          <div className="workItem">
            <div className="imageWrapper">
              <img
                src="https://cdn.pixabay.com/photo/2018/06/07/16/49/virtual-3460451_960_720.jpg"
                alt="TECHY STAR"
              />
            </div>

            <aside>
              <h3>TECHY STAR</h3>
              <p>
                This is my first react app. I learned many new things while
                building this website like sass, react-dom, react-responsive,
                vercel, react-router etc. React is amazing!
              </p>
              <a target="blank" href="https://reactone-wine-ten.vercel.app/">
                View Demo
              </a>
            </aside>
          </div>
          <div className="workItem">
            <div className="imageWrapper">
              <img
                src="https://cdn.pixabay.com/photo/2016/11/21/12/51/mobile-phone-1845233__340.jpg"
                alt="VIDEO HUB"
              />
            </div>

            <aside>
              <h3>VIDEO HUB</h3>
              <p>
                This is a basic video streaming web app made using React.js.
                Only the frontend is made with React. I used Chakra UI to design
                UI elements in this app
              </p>
              <a target="blank" href="https://reacttwo-mauve.vercel.app/">
                View Demo
              </a>
            </aside>
          </div>
          <div className="workItem">
            <div className="imageWrapper">
              <img
                src="https://cdn.pixabay.com/photo/2017/12/12/12/44/bitcoin-3014614_960_720.jpg"
                alt="XCrypto"
              />
            </div>

            <aside>
              <h3>XCrypto</h3>
              <p>
                This is crypto webapp made using ReactJS. I used ChakraUI for UI
                elements and ChartJS for crypto coin stats. This app fetches
                real time data from an API.
              </p>
              <a
                target="blank"
                href="https://react-crypto-app-ruddy.vercel.app/"
              >
                View Demo
              </a>
            </aside>
          </div>
          <div className="workItem">
            <div className="imageWrapper">
              <img
                src="https://cdn.pixabay.com/photo/2019/12/14/08/36/shopping-4694470_960_720.jpg"
                alt="REACT CART"
              />
            </div>

            <aside>
              <h3>REACT CART</h3>
              <p>
                This is a simple cart app, with dummy data. Basically while
                building this project I learned about Redux Toolkit. I learned
                about store, reducers, action and payload.
              </p>
              <a target="blank" href="https://react-cart-app-eta.vercel.app/">
                View Demo
              </a>
            </aside>
          </div>
          <div className="workItem">
            <div className="imageWrapper">
              <img
                src="https://cdn.pixabay.com/photo/2020/03/19/21/25/cactus-4948833_960_720.jpg"
                alt="PORTFOLIO"
              />
            </div>

            <aside>
              <h3>PORTFOLIO</h3>
              <p>
                This is my portfolio which I made to showcase my skills and it
                also has a contact form which uses firebase to store all the
                messages.
              </p>
              <a target="blank" href="/">
                View Demo
              </a>
            </aside>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Work;
