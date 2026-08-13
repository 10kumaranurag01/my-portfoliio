import { Block } from "./UITheme";

// Project cards. Same content as before, hoisted out of the markup so the card
// chrome is written once.
const projects = [
  {
    title: "To-Do Done",
    img: "https://i.ibb.co/V35MwRm/Screenshot-from-2024-10-01-16-57-55.png",
    url: "https://todo-done.anuragg.top/",
    blurb:
      "A full-stack app with two main screens: a task list screen and a Kanban board screen. The frontend is powered by ShadCN , which helped keep the design clean and responsive.",
  },
  {
    title: "Medeum",
    img: "https://i.ibb.co/r7Fjk4X/medeumpng.png",
    url: "https://medeum.anuragg.top",
    blurb:
      "While building this project i learned a PostgreSQL, cloudflare workers, database connection pooling, custom react hooks and Prisma ORM, which gave me deep insights about full stack development.",
  },
  {
    title: "PROMPTOPIA",
    img: "https://media.istockphoto.com/id/1498577422/photo/hand-of-businessman-holding-phone-with-smart-robot-enters-command-to-create-something.jpg?s=2048x2048&w=is&k=20&c=9ygFs5hc2Zw3wd0ydqDAH2qcGCJ2uXnb-WOs0SickpA=",
    url: "https://promptopia-a7sb2hx2l-10kumaranurag01.vercel.app/",
    blurb:
      "While building this project i learned a little bit of backend where i used MongoDB for database and most importantly i used NEXT.js to build this app which made developing really easy.",
  },
  {
    title: "KASMedia",
    img: "https://cdn.pixabay.com/photo/2020/11/22/04/10/youtube-5765608_1280.png",
    url: "https://yt-clone-lgutq3wn4-10kumaranurag01.vercel.app/",
    blurb:
      "I made a Youtube clone using reactJS, it has livestream feature to interact with viewers and the host can join as separately. It fetches actual youtube data from youtube API from rapidAPI.",
  },
  {
    title: "XCrypto",
    img: "https://cdn.pixabay.com/photo/2017/12/12/12/44/bitcoin-3014614_960_720.jpg",
    url: "https://react-crypto-app-ruddy.vercel.app/",
    blurb:
      "This is crypto webapp made using ReactJS. I used ChakraUI for UI elements and ChartJS for crypto coin stats. This app fetches real time data from an API.",
  },
  {
    title: "REACT CART",
    img: "https://cdn.pixabay.com/photo/2019/12/14/08/36/shopping-4694470_960_720.jpg",
    url: "https://react-cart-app-eta.vercel.app/",
    blurb:
      "This is a simple cart app, with dummy data. Basically while building this project I learned about Redux Toolkit. I learned about store, reducers, action and payload.",
  },
];

const card = `m-1 flex h-[28rem] w-[25rem] flex-col items-center justify-evenly
  rounded-[10px] border-2 border-accent bg-canvas-sunk p-2
  dev:border-[var(--ui-line)] dev:bg-[var(--ui-panel)]
  mq-1367:h-[25rem] mq-1367:w-[22rem] mq-1100:h-[24rem] mq-1100:w-[18rem]
  mq-900:h-[22rem] mq-900:w-[16rem] mq-786:h-[22rem] mq-786:w-[18rem]
  mq-600:h-[28rem] mq-600:w-[80%] mq-425:h-[25rem]`;

const Work = () => (
  <Block
    id="work"
    label="work"
    className="flex h-[150vh] w-full flex-col items-center justify-center overflow-hidden
               mq-1367:px-page-md mq-1367:py-16 mq-1100:px-page-base
               mq-900:h-[130vh] mq-900:px-0 mq-786:h-[180vh]
               mq-600:h-[380vh] mq-425:h-[340vh]"
  >
    <h2 className="mb-2 border-b-[3px] border-rule text-[2rem] font-semibold">
      WORK
    </h2>

    <section className="mq-786:w-full">
      <article className="grid grid-cols-3 place-items-center overflow-y-hidden mq-786:grid-cols-2 mq-600:grid-cols-1">
        {projects.map(({ title, img, url, blurb }) => (
          <div key={title} className={card}>
            <div className="flex h-1/2 items-center justify-center">
              <img
                src={img}
                alt={title}
                className="block h-[12rem] w-full object-cover
                           mq-1367:h-[9rem] mq-1100:h-[7rem] mq-900:h-[6rem]
                           mq-786:h-[6.5rem] mq-600:h-[10rem] mq-425:h-[8rem]"
              />
            </div>

            <aside className="flex h-1/2 flex-col items-center justify-center p-2 text-center">
              <h3 className="text-[1.5rem] font-semibold mq-1367:mt-2 mq-1100:text-[1.2rem] mq-900:text-[1.1rem] mq-786:text-[1.3rem] mq-600:text-[1.8rem] mq-425:text-[1.5rem]">
                {title}
              </h3>
              <p className="mb-2 py-1 text-base tracking-[0.5px] mq-1367:text-[0.9rem] mq-1100:text-[0.8rem] mq-900:text-[0.7rem] mq-786:text-[0.75rem] mq-600:text-base mq-425:text-[0.85rem]">
                {blurb}
              </p>
              <a
                target="blank"
                href={url}
                className="bg-accent px-2 py-1 text-canvas transition-colors hover:bg-accent-hover mq-1367:mb-4 mq-1367:text-[0.8rem] mq-900:text-[0.7rem] mq-600:text-[0.9rem] mq-425:text-[0.85rem]"
              >
                View Demo
              </a>
            </aside>
          </div>
        ))}
      </article>
    </section>
  </Block>
);

export default Work;
