const tl = gsap.timeline();
tl.fromTo('.intro-heading', {clipPath: 'inset(0 100% 0 0)'}, {
    clipPath: 'inset(0 0% 0 0)',
    duration: 2,
    ease: 'power2.out'
});
tl.fromTo('.intro-link', {clipPath: 'inset(0 100% 0 0)'}, {clipPath: 'inset(0 0% 0 0)', duration: 0.5})
tl.fromTo('.lp', {clipPath: 'inset(0 100% 0 0)'}, {clipPath: 'inset(0 0% 0 0)', stagger: 0.25, duration: 1.2})
