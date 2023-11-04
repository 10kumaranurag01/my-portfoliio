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
                src="https://media.istockphoto.com/id/1498577422/photo/hand-of-businessman-holding-phone-with-smart-robot-enters-command-to-create-something.jpg?s=2048x2048&w=is&k=20&c=9ygFs5hc2Zw3wd0ydqDAH2qcGCJ2uXnb-WOs0SickpA="
                alt="TECHY STAR"
              />
            </div>

            <aside>
              <h3>PROMPTOPIA</h3>
              <p>
                While building this project i learned a little bit of backend
                where i used MongoDB for database and most importantly i used
                NEXT.js to build this app which made developing really easy.
              </p>
              <a
                target="blank"
                href="https://promptopia-a7sb2hx2l-10kumaranurag01.vercel.app/"
              >
                View Demo
              </a>
            </aside>
          </div>
          <div className="workItem">
            <div className="imageWrapper">
              <img
                src="https://cdn.pixabay.com/photo/2020/11/22/04/10/youtube-5765608_1280.png "
                alt="VIDEO HUB"
              />
            </div>

            <aside>
              <h3>KASMedia</h3>
              <p>
                I made a Youtube clone using reactJS, it has livestream feature
                to interact with viewers and the host can join as separately. It
                fetches actual youtube data from youtube API from rapidAPI.
              </p>
              <a
                target="blank"
                href="https://yt-clone-lgutq3wn4-10kumaranurag01.vercel.app/"
              >
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
