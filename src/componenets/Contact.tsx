import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import vg from "../assets/vg.png";
import { Block } from "./UITheme";

const animations = {
  form: {
    initial: { x: "-100%", opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
  },
  button: {
    initial: { y: "-100%", opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    transition: { delay: 0.5 },
  },
};

const field = `m-2 w-[40%] border-none p-1 font-display text-[0.9rem] text-ink outline-none
  mq-1367:w-1/2 mq-1367:text-[0.8rem] mq-900:w-[65%]`;

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisableBtn(true);
    try {
      await addDoc(collection(db, "contacts"), { name, email, message });
      setName("");
      setEmail("");
      setMessage("");
      toast.success("Message Sent");
      setDisableBtn(false);
    } catch (error) {
      toast.error("Error");
      console.log(error);
      setDisableBtn(false);
    }
  };

  return (
    <Block
      id="contact"
      label="contact"
      className="grid min-h-[90vh] grid-cols-2 mq-600:grid-cols-1"
    >
      <section className="h-full w-full bg-[var(--ui-bg)]">
        <motion.form
          onSubmit={submitHandler}
          {...animations.form}
          className="flex h-full flex-col items-center justify-center"
        >
          <h2 className="m-4 text-center text-[2.7rem] font-thin uppercase tracking-[5px] mq-900:text-[2.3rem]">
            Contact Me
          </h2>

          <input
            type="text"
            placeholder="Your Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={field}
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={field}
          />
          <input
            type="text"
            placeholder="Your Message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={field}
          />

          <motion.button
            disabled={disableBtn}
            {...animations.button}
            type="submit"
            className={`m-6 w-[40%] border-none p-1 font-display text-base font-semibold
                        uppercase transition-colors mq-1367:w-1/2 mq-900:w-[65%]
                        ${
                          disableBtn
                            ? "cursor-not-allowed bg-mute text-ink"
                            : "cursor-pointer bg-accent text-white hover:bg-accent-hover"
                        }`}
          >
            Send
          </motion.button>
        </motion.form>
      </section>

      <aside className="grid h-full w-full place-items-center bg-slate mq-600:hidden">
        <img
          src={vg}
          alt=""
          className="h-[70%] w-[70%] animate-float-lg object-contain
                     [filter:drop-shadow(0_0_10px_rgba(0,0,0,0.322))_hue-rotate(150deg)]"
        />
      </aside>
    </Block>
  );
};

export default Contact;
