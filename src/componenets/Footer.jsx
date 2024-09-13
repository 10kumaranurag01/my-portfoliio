import React from "react";
import {
  AiOutlineArrowUp,
  AiFillLinkedin,
  AiFillInstagram,
  AiFillGithub,
} from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <footer>
        <div>
          <img
            src={
              "https://avatars.githubusercontent.com/u/81381360?s=400&u=63d7eda0704449fd4878de3d2768bb288ea1416a&v=4"
            }
            alt="Founder"
          />

          <h2>Kumar Anurag Sahu</h2>
          <p>Direction is more important than speed.</p>
        </div>
        <aside>
          <h2>Social Media</h2>

          <article>
            <a
              href="https://www.linkedin.com/in/kumar-anurag-858948207/"
              target="blank"
            >
              <AiFillLinkedin />
            </a>
            <a href="https://github.com/10kumaranurag01" target="blank">
              <AiFillGithub />
            </a>
            <a href="https://www.instagram.com/kumar_._anurag/" target="blank">
              <AiFillInstagram />
            </a>
          </article>
        </aside>
        <a href="#home">
          <AiOutlineArrowUp />
        </a>
      </footer>
      <div className="updatedDate">
        <p>Last Updated: 13th Sept 2024</p>
      </div>
    </>
  );
};

export default Footer;
