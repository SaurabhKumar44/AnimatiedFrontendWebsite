const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
var timeout;

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#miniCircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}
function firstPageAnim() {
  var tl = gsap.timeline();
  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingElem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1.2,
      stagger: 0.2,
    })
    .from("#homePageFooter", {
      y: "-10",
      opacity: 0,
      duration: 1.5,
      delay: -1.4,
      ease: Expo.easeInOut,
    });
}
function circleSkew() {
  var xscale = 1;
  var yscale = 1;
  var xprev = 0;
  var yprev = 0;
  document.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(1, 1.3, dets.clientX - xprev);
    yscale = gsap.utils.clamp(1, 1.3, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);
    timeout = setTimeout(function () {
      document.querySelector(
        "#miniCircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

circleMouseFollower();
firstPageAnim();
circleSkew();
document.querySelectorAll(".elem").forEach(function (elem) {
  var diffrot = 0;
  var rotate = 0;
  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });
  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    // elem.querySelector("img")
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-22, 24, diffrot),
    });
  });
});
