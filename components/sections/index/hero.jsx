import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { m } from "framer-motion";

import Section from "../../structure/section";
import Container from "../../structure/container";

import space from "../../utils/spacing.util";

import Icon from "../../utils/icon.util";

import HeroBg from "../../blocks/hero.bg/bg-color-1";

import hero from "../../../styles/sections/index/hero.module.scss";
import button from "../../../styles/blocks/button.module.scss";

import content from "../../../content/index/hero.json";

// import resume from "../../../public/img/resume.pdf";

/**
 * TO DO LIST
 *
 * - Create a typog.modules.scss
 *   Load this module onto every component, and use predefined typography classes to keep typography consistent
 *
 * - space.modules.scss
 *   Load this module onto every component, and use predefined spacial classes to keep geometry consistent
 */

export default function Hero() {
  const [typingStatus, setTypingStatus] = useState("Initializing");

  return (
    <Section classProp={`${hero.section}`}>
      <Container spacing={"VerticalXXXL"}>
        <TypeAnimation
          className={`${hero.preHeader}`}
          sequence={[
            content.intro.startDelay,
            () => {
              setTypingStatus("typing");
            },
            content.intro.start,
            () => {
              setTypingStatus("typed");
            },
            content.intro.deleteDelay,
            () => {
              setTypingStatus("deleting");
            },
            content.intro.end,
            () => {
              setTypingStatus("deleted");
            },
            content.intro.restartDelay,
          ]}
          speed={content.intro.speed}
          deletionSpeed={content.intro.deletionSpeed}
          wrapper={content.intro.wrapper}
          repeat={Infinity}
        />
        <section>
          <h1 className={hero.header}>{content.header.name}</h1>
          <h1 className={`${hero.header} ${hero.primaryDim}`}>
            {content.header.usp}
          </h1>
        </section>
        <section>
          <p
            className={`${hero.primaryBright} subtitle ${space([
              "verticalLrg",
            ])}`}
          >
            {content.paragraph}
          </p>
        </section>
        <section>
          <button
            className={`button ${button.primary} leaveSite`}
            onClick={() => window.open(content.buttons.primary.url, "_blank")}
          >
            {content.buttons.primary.title}
          </button>
            <button  className={`button ${button.secondary} leaveSite`}
            onClick={()=>window.open(content.buttons.tertiary.url, "_blank")}
            >{content.buttons.tertiary.title}</button>
        </section>
        <m.section
          className={hero.stats}
          initial="hidden"
          animate="visible"
          variants={statContainer}
        >
          {stats.map(({ value, label }) => (
            <m.div key={label} className={hero.stat} variants={statItem}>
              <span className={hero.statValue}>{value}</span>
              <span className={hero.statLabel}>{label}</span>
            </m.div>
          ))}
        </m.section>
      </Container>
      <HeroBg theme="bg-color-1" />
    </Section>
  );
}

const stats = [
  { value: "4+", label: "Years of experience" },
  { value: "3", label: "Fintech platforms shipped" },
  { value: "~75%", label: "Fewer re-renders, option chain" },
  { value: "~40%", label: "Faster page loads, IPO/NCD" },
];

const statContainer = {
  hidden: {},
  visible: {
    transition: { delayChildren: 1.1, staggerChildren: 0.12 },
  },
};

const statItem = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "tween", ease: "easeOut", duration: 0.5 },
  },
};
