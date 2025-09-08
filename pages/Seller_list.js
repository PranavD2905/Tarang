const featureSection = document.querySelector(".feature-section");
const popupOverlay = document.getElementById("popupOverlay");
const popupBox = document.getElementById("popupBox");
const popupContent = document.getElementById("popupContent");
const popupClose = document.getElementById("popupClose");

// ✅ NAV COLOR CHANGE ON SCROLL
window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY + nav.offsetHeight;

  const whoTop = whoWeAreSection.offsetTop;
  const whoBottom = whoTop + whoWeAreSection.offsetHeight;

  const servicesTop = servicesSection.offsetTop;
  const servicesBottom = servicesTop + servicesSection.offsetHeight;

  const featureTop = featureSection.offsetTop;
  const featureBottom = featureTop + featureSection.offsetHeight;

  if (
    (scrollPos >= whoTop && scrollPos <= whoBottom) ||
    (scrollPos >= servicesTop && scrollPos <= servicesBottom) ||
    (scrollPos >= featureTop && scrollPos <= featureBottom)
  ) {
    nav.classList.add("dark");
  } else {
    nav.classList.remove("dark");
  }
});

document.querySelectorAll(".feature-card").forEach((card, index) => {
  card.addEventListener("click", () => {
    let selectedForm = "";

    if (index === 0) {
      selectedForm = document.getElementById("formCard1").innerHTML;
    } else if (index === 1) {
      selectedForm = document.getElementById("formCard2").innerHTML;
    } else if (index === 2) {
      selectedForm = document.getElementById("formCard3").innerHTML;
    }

    popupContent.innerHTML = selectedForm;
    popupOverlay.style.display = "flex";

    gsap.fromTo(popupBox, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 });
  });
});


popupClose.addEventListener("click", closePopup);
popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) closePopup();
});


document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && popupOverlay.style.display === "flex") closePopup();
});

function closePopup() {
  gsap.to(popupBox, {
    scale: 0.8,
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      popupOverlay.style.display = "none";
      popupContent.innerHTML = ""; // clear form to reset fields next open
    }
  });
}


window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const gradientFollowImg = document.querySelector(".cursor-follow-image");
  const gradientSection = document.querySelector(".gradient-text-section1");

  gradientSection.addEventListener("mousemove", (e) => {
    gsap.to(gradientFollowImg, {
      x: e.clientX,
      y: e.clientY,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  gradientSection.addEventListener("mouseleave", () => {
    gsap.to(gradientFollowImg, {
      opacity: 0,
      duration: 0.3
    });
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: ".gradient-text-section1",
      start: "top 80%",
      toggleActions: "play none none none"
    },
    defaults: { ease: "power2.out", duration: 1 }
  }).from(".gradient-text-section1 p", { y: 30, opacity: 0, stagger: 0.2 });
});


