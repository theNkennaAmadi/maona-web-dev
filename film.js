const filmWatch = document.querySelector("#film-watch");
const filmTrailer = document.querySelector("video");

const tlPlay = gsap.timeline({ paused: true });
tlPlay.to(".play-block", { opacity: 1, duration: 0.1 });
tlPlay.to(".pause-block", { opacity: 0, duration: 0.1 }, ">");

const tlPaused = gsap.timeline();
tlPaused.set(".pause-block", { opacity: 1, duration: 0.1 });
tlPaused.set(".play-block", { opacity: 0, duration: 0.1 }, ">");

const tlMute = gsap.timeline({ paused: true });
tlMute.to("#mute", { yPercent: -100, duration: 0.3 });
tlMute.to("#unmute", { yPercent: -100, duration: 0.3 }, "<");

filmWatch.addEventListener("click", () => {
  const tl = gsap.timeline();
  tl.to("#film-watch, #film-title", {
    yPercent: 120,
    duration: 1,
    ease: "power4.out",
  });
  tl.fromTo(
    ".film-bg-img img",
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      ease: "expo.inOut",
      duration: 1.5,
    },
    "<"
  );
  tl.to(".film-controls", { opacity: 1, duration: 0.5 }, ">");
  tl.to(".film-bg-text", { display: "none", duration: 0.2 }, "<");
  filmTrailer.play();
});

document.querySelector(".play-pause-block").addEventListener("click", () => {
  if (filmTrailer.paused) {
    tlPaused.play();
    filmTrailer.play();
  } else {
    tlPaused.reverse();
    filmTrailer.pause();
  }
});

filmTrailer.addEventListener("timeupdate", () => {
  const progress = filmTrailer.currentTime / filmTrailer.duration;
  gsap.to(".film-progress", {
    width: `${progress * 100}%`,
    ease: "expo.out",
  });
});

document.querySelector(".mute-wrapper").addEventListener("click", (e) => {
  if (filmTrailer.muted) {
    tlMute.reverse();
    filmTrailer.muted = false;
  } else {
    tlMute.play();
    filmTrailer.muted = true;
  }
});

const tlHeroScroll = gsap.timeline();
tlHeroScroll.to(".text-mask", { opacity: 1, ease: "power4.inOut" });
tlHeroScroll.to(
  "#film-watch, #film-title, .play-pause-block, .film-duration-wrapper, .mute-wrapper",
  {
    y: "10vh",
    ease: "power4.out",
  }
);
//tlHeroScroll.to(".film-controls", { opacity: 1, ease: "power4.inOut" });

ScrollTrigger.create({
  trigger: ".section.film-info",
  start: "top 99%",
  end: "+=99%",
  scrub: true,
  pin: ".section.hero.film",
  pinSpacing: false,
  animation: tlHeroScroll,
});

const tlPhoto = gsap.timeline({ paused: true });
tlPhoto.to(".films-photos-item:nth-child(even)", {
  yPercent: -20,
  duration: 0.5,
});
tlPhoto.to(
  ".films-photos-item:nth-child(odd)",
  { yPercent: 20, duration: 0.5 },
  "<"
);

ScrollTrigger.create({
  trigger: ".films-photos-wrapper",
  start: "top bottom",
  end: "bottom top",
  scrub: true,
  animation: tlPhoto,
});
