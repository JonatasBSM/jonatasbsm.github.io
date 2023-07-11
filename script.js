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
window.addEventListener("click", closeModal);

const sections = document.querySelectorAll("#welcome-section, section")

// Create a new Intersection Observer instance
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    } else {
      entry.target.classList.remove("active");
    }
  });
}, { threshold: 0.5 }); // Adjust the threshold value as desired

// Function to enable or disable the observer
function toggleObserver(enable) {
  if (enable) {
    sections.forEach((section) => {
      observer.observe(section);
    });
  } else {
    sections.forEach((section) => {
      observer.unobserve(section);
      section.classList.remove("active");
    });
  }
}

// Call toggleObserver(true) to enable the observer initially
toggleObserver(true);