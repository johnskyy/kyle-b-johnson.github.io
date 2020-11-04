
/**
 * Get array of all Document objects containing a data-src
 */
const images = document.querySelectorAll("img[data-src]");
  
/**
 * Pre-load the actual, intended source of the img object
 * @param {HTMLImageElement} image 
 */
function preloadImage(image) {
  const imageSource = image.getAttribute("data-src");
  if (!imageSource) return;

  image.src = imageSource;
  image.removeAttribute("data-src");
}

// 
function entryIntersections(entry) {
  if (entry.isIntersecting) {
    preloadImage(entry.target);
    imageObservation.unobserve(entry.target);
  }
}

function observerCallback(entries, imageObservation) {
  entries.forEach(entryIntersections);
}

const observerOptions = {};

const imageObservation = new IntersectionObserver(observerCallback, observerOptions);

function observeImage(image) {
    imageObservation.observe(image);
}

images.forEach(observeImage);