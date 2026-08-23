import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore/lite";
import { db } from "../firebase";
import { SectionShell, Window, triggerClass } from "./crt";
import { protocols, isExternalProtocol } from "../data/resume";

// border-line-strong, not border-line: the sunk fill sits 1.04:1 against the
// window it's inside, so the border is the field's only boundary and has to
// clear WCAG 1.4.11's 3:1 on its own.
const inputClass =
  "w-full border border-line-strong bg-carbon-sunk px-2 py-1 text-sm text-phosphor transition-colors focus:border-cyan";

// text-phosphor, not -dim: a field label is functional text, not meta, and
// phosphor-dim is contracted to the page centre — this Window sits at the
// right-hand gutter, under the unmasked edge of the CRT vignette.
const labelClass =
  "mb-0.5 block text-2xs uppercase tracking-widest text-phosphor";

const submitClass = `${triggerClass} self-start disabled:cursor-not-allowed disabled:text-mute disabled:hover:border-line-strong disabled:hover:text-mute disabled:hover:shadow-none`;

// The write fails for ordinary reasons (offline, corporate proxy, security
// rules), so the failure toast has to hand back a route in rather than just
// saying "Error". Address comes from resume.ts like every other string.
const mailtoAddress = protocols.find((p) => p.protocol === "mailto")?.value;
const failureToast = mailtoAddress
  ? `TRANSMIT FAILED. Mail ${mailtoAddress} instead.`
  : "TRANSMIT FAILED. Use a protocol from the list.";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [nonce, setNonce] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Honeypot: display:none, so anything in it is a bot. Drop silently rather
    // than reporting, so the bot learns nothing. This is a spam floor only —
    // Firestore security rules remain the real access control on the public
    // `contacts` collection.
    //
    // The warn is the only trace of this branch: no toast (that would teach a
    // bot it was caught), so if autofill ever populates the field a real
    // visitor sees [ TRANSMIT ] do nothing and the console is the one place
    // that says why.
    if (nonce) {
      console.warn("Submission dropped: honeypot field `tx-nonce` was filled.");
      return;
    }
    setDisableBtn(true);
    try {
      await addDoc(collection(db, "contacts"), { name, email, message });
      setName("");
      setEmail("");
      setMessage("");
      toast.success("TRANSMIT OK. Message logged.");
    } catch (error) {
      toast.error(failureToast);
      console.error(error);
    } finally {
      setDisableBtn(false);
    }
  };

  return (
    <SectionShell id="contact" index="03" label="CONTACT">
      <div className="grid grid-cols-2 gap-4 mq-900:grid-cols-1">
        <Window title="~/protocols">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">Contact protocols</caption>
            <thead>
              <tr className="border-b border-line text-2xs tracking-widest text-phosphor">
                <th scope="col" className="py-2 pr-4 font-medium">
                  CHANNEL
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
                  {/* `label`, not `protocol`: the machine key stays the key,
                      but a recruiter should not have to know that "geo" means
                      an address and "https" means a website. */}
                  <td className="py-2 pr-4 align-top text-cyan">
                    {entry.label}
                  </td>
                  <td className="break-all py-2 align-top text-phosphor">
                    {entry.href ? (
                      <a
                        href={entry.href}
                        target={
                          isExternalProtocol(entry.protocol)
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          isExternalProtocol(entry.protocol)
                            ? "noreferrer"
                            : undefined
                        }
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
              <label htmlFor="contact-name" className={labelClass}>
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="contact-email" className={labelClass}>
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="contact-message" className={labelClass}>
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* `hidden` (display:none), not `sr-only`: aria-hidden already
                takes it out of the accessibility tree, so sr-only bought
                nothing and left a real, fillable field in the layout. The name
                is deliberately not "company" — that is the exact heuristic
                password managers and Chrome's `organization` autofill match
                on (autocomplete="off" is widely ignored for those), and a
                real visitor whose manager filled it got a [ TRANSMIT ] button
                that silently did nothing forever. */}
            <input
              id="contact-tx-nonce"
              name="tx-nonce"
              type="text"
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              value={nonce}
              onChange={(e) => setNonce(e.target.value)}
              className="hidden"
            />

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
