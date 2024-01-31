let selector = document.querySelector(".nav-highlight");
const navLinks = [...document.querySelectorAll(".nav-link")];
navLinks.map((link) => {
  link.addEventListener("mouseenter", () => {
    let state = Flip.getState(selector);
    link.append(selector);
    Flip.from(state, {
      duration: 0.6,
      ease: "expo.out",
    });
    selector.style.display = "block";
  });
  link.addEventListener("mouseleave", () => {
    selector.style.display = "none";
  });
});

window.addEventListener("load", () => {
  gsap.to(".page-wrapper", { autoAlpha: 1, duration: 0.5 });
});

let mobileMenuState = false;

let mm = gsap.matchMedia();
console.log("hello");

let tlNav = gsap.timeline({ paused: true });
tlNav.to(".nav", { borderRadius: "0.5rem", duration: 0.5 });
tlNav.fromTo(
  ".nav-projects",
  { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
  { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1 }
);
mm.add("(max-width: 479px)", () => {
  tlNav.to(".nav", { minWidth: "70vw", marginLeft: "11%", duration: 0.5 }, "<");
});
tlNav.to(
  ".nav-menu-icon",
  {
    display: "flex",
    x: "2.25rem",
    duration: 0.75,
    ease: "expo.inOut",
  },
  "<0.1"
);

const showFeaturedNav = () => {
  window.setTimeout(() => {
    tlNav.timeScale(1);
    if (!mobileMenuState) {
      tlNav.play();
    }
  }, 10000);
};
showFeaturedNav();

document.querySelector(".nav-menu-icon").addEventListener("click", () => {
  tlNav.timeScale(1.5);
  tlNav.reverse();
});

const mobileNav = gsap.timeline({ paused: true });

mobileNav.to(".nav-main-container", {
  display: "flex",
});

document.querySelector(".mobile-menu-wrapper").addEventListener("click", () => {
  if (!mobileMenuState) {
    mobileNav.play();
  } else {
    mobileNav.reverse();
  }
  mobileMenuState = !mobileMenuState;
});
