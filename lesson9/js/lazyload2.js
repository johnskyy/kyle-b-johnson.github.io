// Get array of all Document objects containing a data-src
const images = document.querySelectorAll("[data-src]");

/* Pre-load the actual, intended source of the img object
    then assign the data-src as the image src attribute  */  
function preloadImage(image) {
  const imageSource = image.getAttribute("data-src");
  if (!imageSource) return;

  image.src = imageSource;
}

// Create observer to check if  