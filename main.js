gsap.registerPlugin(ScrollTrigger);
Splitting();

lenis.stop();

const startScroll = () => {
  lenis.start();
};

const date = new Date();
const year = date.getFullYear();
document.querySelector("#footer-year").innerHTML = Number(year);

window.addEventListener("load", () => {
  if (localStorage.getItem("hasCodeRunBefore") === null) {
    const tl = gsap.timeline({
      onComplete: () => {
        startScroll();
      },
    });
    tl.to(".loader-progress", {
      width: "100%",
      duration: 3,
      ease: "power2.out",
    });
    tl.to(
      ".loader-icon",
      { x: "86vw", rotate: 360, duration: 3, ease: "power1.out" },
      "<"
    );
    tl.to(".loader-progress", {
      transformOrigin: "100% 50%",
      width: "0%",
      duration: 1,
      ease: "expo.inOut",
    });
    tl.to(
      ".loader-icon",
      { y: "30vh", duration: 1, ease: "power1.out" },
      "<0.4"
    );
    tl.fromTo(
      ".preloader-wrapper",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "expo.inOut",
        duration: 1.5,
      },
      "<0.5"
    );
    localStorage.setItem("hasCodeRunBefore", true);
  } else {
    document.querySelector(".preloader-wrapper").style.display = "none";
    lenis.start();
  }
});

const leftItems = [
  document.querySelector(".home-film-gallery-item:nth-child(1)"),
  document.querySelector(".home-film-gallery-item:nth-child(4)"),
  document.querySelector(".home-film-gallery-item:nth-child(7)"),
  document.querySelector(".home-film-gallery-item:nth-child(3)"),
  document.querySelector(".home-film-gallery-item:nth-child(6)"),
  document.querySelector(".home-film-gallery-item:nth-child(9)"),
];
const middleItems = [
  document.querySelector(
    ".home-film-gallery-item:nth-child(2) .home-film-img-wrap"
  ),
  document.querySelector(
    ".home-film-gallery-item:nth-child(8) .home-film-img-wrap"
  ),
];

const tlGallery = gsap.timeline();
tlGallery.fromTo(
  ".home-film-gallery-list",
  { scale: 0.75 },
  {
    scale: 3.2,
  }
);
tlGallery.to(leftItems, { yPercent: 20 }, "<");
tlGallery.to(middleItems, { scaleX: 0.7 }, "<");

ScrollTrigger.create({
  trigger: ".home-film-gallery-list",
  start: "center center",
  end: "+=300%",
  scrub: true,
  pin: true,
  animation: tlGallery,
});

const words = [...document.querySelectorAll(".word")];

words.map((word) => {
  // create wrapper container
  var wrapper = document.createElement("span");
  wrapper.classList.add("char-wrap");
  // insert wrapper before el in the DOM tree
  word.parentNode.insertBefore(wrapper, word);
  // move el into wrapper
  wrapper.appendChild(word);
});

/**
 * Text fade up animation
 */

const dataText = [...document.querySelectorAll("[data-splitting]")];
dataText.forEach((text) => {
  gsap.fromTo(text.querySelectorAll(".word"), { y: "120%" }, { y: "0%" });
});

if (dataText.length !== 0) {
  dataText.forEach((title) => {
    if (!title.hasAttribute("no-instance")) {
      const chars = title.querySelectorAll(".word");
      gsap.fromTo(
        chars,
        {
          "will-change": "transform",
          transformOrigin: "0% 50%",
          yPercent: 120,
        },
        {
          duration: 2.5,
          ease: "expo",
          yPercent: 0,
          scrollTrigger: {
            trigger: title,
            start: "top 95%",
            end: "bottom bottom",
            //scrub: true,
            toggleActions: "play resume resume reset",
            //markers: true
          },
        }
      );
    }
  });
}
