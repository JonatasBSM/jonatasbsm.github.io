


const sections = document.querySelectorAll("nav, section")

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

const projectContainers = document.querySelectorAll('.project-home, .teambuilder-container, .mbya-container');
const prevProjectBtns = document.querySelectorAll('.prevProjectBtn');
const nextProjectBtns = document.querySelectorAll('.nextProjectBtn');
const projectsSection = document.getElementById('projects');
const progressPoints = document.querySelectorAll('.progress-point'); // Add this line
let currentProjectIndex = 0;

function navigateToProject(index) {
  currentProjectIndex = Math.max(Math.min(index, projectContainers.length - 1), 0);
  scrollToCurrentProject();
  updateProgress(); // Add this line
}

function scrollToCurrentProject() {
  const container = projectContainers[currentProjectIndex];
  projectsSection.scrollLeft = container.offsetLeft;
}

function updateProgress() {
  progressPoints.forEach((point, index) => {

    if (index === currentProjectIndex) {
      point.classList.add('active');
    } else {
      point.classList.remove('active');
    }
  });
}

prevProjectBtns.forEach(button => {
  button.addEventListener('click', () => navigateToProject(currentProjectIndex - 1));
});

nextProjectBtns.forEach(button => {
  button.addEventListener('click', () => navigateToProject(currentProjectIndex + 1));
});

updateProgress();

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


