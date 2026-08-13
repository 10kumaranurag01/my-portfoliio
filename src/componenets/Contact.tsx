import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { SectionShell, Window } from "./crt";
import { protocols } from "../data/resume";

const inputClass =
  "w-full border border-line bg-carbon-sunk px-2 py-1 text-sm text-phosphor placeholder:text-mute transition-colors focus:border-cyan";

const submitClass =
  "self-start border border-line px-3 py-1 text-2xs uppercase tracking-widest text-phosphor-dim transition-colors hover:border-cyan hover:text-cyan hover:shadow-glow-cyan disabled:cursor-not-allowed disabled:text-mute disabled:hover:border-line disabled:hover:text-mute disabled:hover:shadow-none";

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
    } catch (error) {
      toast.error("Error");
      console.error(error);
    } finally {
      setDisableBtn(false);
    }
  };

  return (
    <SectionShell id="contact" index="04" label="CONTACT">
      <div className="grid grid-cols-2 gap-4 mq-900:grid-cols-1">
        <Window title="~/protocols">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-2xs tracking-widest text-phosphor-dim">
                <th scope="col" className="py-2 pr-4 font-medium">
                  PROTOCOL
                </th>
                <th scope="col" className="py-2 font-medium">
                  ADDRESS
                </th>
              </tr>
            </thead>
            <tbody>
              {protocols.map((entry) => (
                <tr
                  key={entry.protocol}
                  className="border-b border-line last:border-b-0"
                >
                  <td className="py-2 pr-4 align-top text-cyan">
                    {entry.protocol}
                  </td>
                  <td className="break-all py-2 align-top text-phosphor">
                    {entry.href ? (
                      <a
                        href={entry.href}
                        className="hover:text-cyan hover:underline"
                      >
                        {entry.value}
                      </a>
                    ) : (
                      entry.value
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Window>

        <Window title="~/transmit">
          <form onSubmit={submitHandler} className="flex flex-col gap-3">
            <div>
              <label htmlFor="contact-name" className="sr-only">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="sr-only">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="Your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="sr-only">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                placeholder="Your message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={inputClass}
              />
            </div>

            <button type="submit" disabled={disableBtn} className={submitClass}>
              {disableBtn ? "[ SENDING... ]" : "[ TRANSMIT ]"}
            </button>
          </form>
        </Window>
      </div>
    </SectionShell>
  );
};

export default Contact;
