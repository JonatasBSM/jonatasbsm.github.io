// Get the modal element
var modal = document.getElementById("modal");

// Get the <span> element that closes the modal
var closeBtn = document.querySelector("#modal .close");

// Get all custom boxes inside the projects section
var projectCustomBoxes = document.querySelectorAll("#projects .custom-box");

// Add click event listener to each project custom box
projectCustomBoxes.forEach(function(customBox) {
  customBox.addEventListener("click", openModal);
});

// Function to open the modal
function openModal(event) {
  // Prevent event bubbling from skill custom boxes
  event.stopPropagation();

  // Get the video player element and resume element inside the modal
  var videoPlayer = document.querySelector("#modal .video-player video");
  var resume = document.querySelector("#modal .resume");

  // Get the video URL and resume content from the clicked custom box
  var videoURL = this.dataset.video;
  var resumeContent = this.dataset.resume;

  // Set the source of the video player
  videoPlayer.src = videoURL;

  // Set the resume content
  resume.innerHTML = resumeContent;

  // Display the modal
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  // Hide the modal
  modal.style.display = "none";

  // Pause the video player
  var videoPlayer = document.querySelector("#modal .video-player video");
  videoPlayer.pause();
}

// Add click event listener to the close button

window.addEventListener('click', (event) => {
  if (event.target === modal) {
      closeModal()
  }
});

const sections = document.querySelectorAll("#welcome-section, section")

// Create a new Intersection Observer instance
let currentSectionIndex = 0;

// Function to handle the scroll event
function handleScroll(event) {
    const direction = event.deltaY > 0 ? 1 : -1; // Check scroll direction
    currentSectionIndex += direction;

    // Ensure the index stays within bounds
    currentSectionIndex = Math.min(Math.max(currentSectionIndex, 0), sections.length - 1);

    // Scroll to the next section
    sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });

    // Prevent default scrolling behavior
    event.preventDefault();
}

// Attach the scroll event listener to the document
document.addEventListener('wheel', handleScroll, { passive: false });


function typewriterEffect(element, text, speed) {
  let i = 0;
  const interval = setInterval(() => {
    element.innerHTML += text.charAt(i);
    i++;
    if (i > text.length) {
      clearInterval(interval);
    }
  }, speed);
}


var subheading = document.querySelector('.subheading .typing-text')
const subheadingContent = subheading.innerHTML

subheading.innerHTML = ''

typewriterEffect(subheading, subheadingContent, 50)


