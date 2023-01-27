console.log("Hello world!");

const myName = "Jonas Schmedtmann";
const h1 = document.querySelector(".heading-primary");

console.log(myName);
console.log(h1);

// h1.addEventListener("click", function () {
//   h1.textContent = myName;
//   h1.style.backgroundColor = "red";
//   h1.style.padding = "5rem";
// });


///////////////////////////////////////////////////////////
// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
console.log(currentYear); // Not really necessary
yearEl.textContent = currentYear;


///////////////////////////////////////////////////////////
// Make mobile navigation work
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector("header");
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open"); // Classlist because we want to work with classes, and toggle means that with a click, we want to add it if it's not present, and remove it if it's there. So in that way we can open and close the mob nav
});


///////////////////////////////////////////////////////////
// Smooth scrolling animation
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  // We could call the function anything we want, wa called it link
  link.addEventListener("click", function (e) {
    // The e stands for event, we called it that way
    e.preventDefault(); // Need to remove the default behaviour of going to the anchor element
    const href = link.getAttribute("href"); // So it selects the attribute of #cta for example, so the anchor element that we put based on the id

    // Scroll back on top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" }); // We couldn't use scrollTo like before because we didn't know which pixel value from the top we wanted to scroll to, before it was easy because we needed the start of the page so top: 0
    }

    // Close mobile navigation. Because when we click on a link to a section, if we scroll up, the mobile menu is still there
    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});


///////////////////////////////////////////////////////////
// Sticky navigation
const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0]; // An array of entries, there will be one entries for each threshold value,  but here we have only one. So we enter the value which is 0. So the event that occured, was that the threshold is 0, which also means that:
    // console.log(ent); we saw that moving down the viewport, when the hero section disappeared, a new event started, where it said "isIntersecting: false"
    if (ent.isIntersecting === false)
      document.body.classList.add("sticky");
    if (ent.isIntersecting === true)
      document.body.classList.remove("sticky");
  },
  {
    root: null, // In the viewport
    threshold: 0, // This event will appear as soon as 0% of the hero section is inside of the viewport
    rootMargin: '-80px' // That's the height of the sticky nav bar, we need this so that the sticky appears not after the end of the hero section, covering a piece of the features sections, but a little above that, by the height of the sticky nav bar. That's why it's useful to set a set height to the sticky nav bar
  }
);
obs.observe(sectionHeroEl);


///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
