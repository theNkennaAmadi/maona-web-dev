gsap.registerPlugin(Observer);

let sections = document.querySelectorAll(".films-cc-item"),
  images = document.querySelectorAll(".films-cc-item > img"),
  //titles = [...document.querySelectorAll(".properties-main-name-item")],
  //titleWrapper = document.querySelector(".properties-main-name-list"),
  // mainText = document.querySelectorAll(".properties-main-text-item"),
  //splitText = document.querySelectorAll("[data-splitting]"),
  //headings = gsap.utils.toArray(".section-heading"),
  outerWrappers = gsap.utils.toArray(".outer"),
  innerWrappers = gsap.utils.toArray(".inner"),
  //splitHeadings = headings.map(heading => new SplitText(heading, { type: "chars,words,lines", linesClass: "clip-text" })),
  currentIndex = -1,
  wrap = gsap.utils.wrap(0, sections.length),
  animating;

gsap.set(outerWrappers, { yPercent: 100 });
gsap.set(innerWrappers, { yPercent: -100 });

function gotoSection(index, direction) {
  // make sure it's valid
  index = wrap(index);
  animating = true;
  let fromTop = direction === -1,
    dFactor = fromTop ? -1 : 1,
    tl = gsap.timeline({
      defaults: { duration: 1, ease: "power1.inOut" },
      onComplete: () => (animating = false),
    });
  console.log(currentIndex, index);
  if (currentIndex >= 0) {
    // The first time this function runs, current is -1
    gsap.set(sections[currentIndex], { zIndex: 0 });
    tl.to(images[currentIndex], { yPercent: -15 * dFactor }).set(
      sections[currentIndex],
      { autoAlpha: 0 }
    );
    // gsap.to(mainText[currentIndex], { display: "none" });
    //let chars = splitText[currentIndex].querySelectorAll(".word");
    /*
    gsap.to([chars, mainText[currentIndex].querySelectorAll(".main-btn")], {
      "will-change": "transform",
      transformOrigin: "0% 50%",
      yPercent: 120,
      ease: "expo",
    });

       */
  }
  gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
  /*
  gsap.to(titleWrapper, {
    y: () => -getTotalHeight(index),
    ease: "expo.out",
    duration: 1,
  });
  gsap.to(titles, {
    opacity: (i) => (i === index ? 1 : 0.4),
    ease: "expo.out",
    duration: 1,
  });
  gsap.to(mainText[index], { display: "grid" });
  let chars = splitText[index].querySelectorAll(".word");
  gsap.fromTo(
    [chars, mainText[index].querySelectorAll(".main-btn")],
    {
      "will-change": "transform",
      transformOrigin: "0% 50%",
      yPercent: 120,
    },
    {
      duration: 1,
      ease: "expo",
      yPercent: 0,
      delay: 0.6,
    }
  );

   */
  tl.fromTo(
    [outerWrappers[index], innerWrappers[index]],
    {
      yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
    },
    {
      yPercent: 0,
    },
    0
  ).fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);

  currentIndex = index;
}

ScrollTrigger.observe({
  type: "wheel,touch,pointer",
  wheelSpeed: -1,
  onDown: () => !animating && gotoSection(currentIndex - 1, -1),
  onUp: () => !animating && gotoSection(currentIndex + 1, 1),
  tolerance: 10,
  preventDefault: true,
});

gotoSection(0, 1);
