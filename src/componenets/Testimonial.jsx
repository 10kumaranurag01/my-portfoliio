import React from "react";

const Testimonial = () => {
  return (
    <div id="testimonial">
      <h2>Testimonials</h2>
      <section>
        <TestimonialCard
          name={"Abhisekh"}
          feedback={"Your skills are so good."}
        />

        <TestimonialCard
          name={"Dibyajyoti"}
          feedback={"Your CSS concepts are really strong."}
        />

        <TestimonialCard
          name={"Priya"}
          feedback={"Wow! This portfolio will get you hired easily."}
        />
      </section>
    </div>
  );
};

const TestimonialCard = ({ name, feedback }) => (
  <article>
    <img
      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
      alt="User"
    />
    <h4>{name}</h4>
    <p>{feedback}</p>
  </article>
);

export default Testimonial;
