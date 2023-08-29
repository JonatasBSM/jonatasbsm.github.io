


const sections = document.querySelectorAll("nav, section, #projects .content")

// Create a new Intersection Observer instance
let currentSectionIndex = 0;

// Function to handle the scroll event
function handleScroll(event) {
    const direction = event.deltaY > 0 ? 1 : -1; // Check scroll direction

    currentSectionIndex += direction;
    console.log(currentSectionIndex)

    if (currentSectionIndex == 4 && direction == -1 || currentSectionIndex == 5 && direction == -1) {
      navigateToProject(currentProjectIndex -1)
    }

    if(currentSectionIndex == 4 && direction == 1 || currentSectionIndex == 5 && direction == 1) {
      navigateToProject(currentProjectIndex + 1)
    }

    else {
      // Ensure the index stays within bounds
      currentSectionIndex = Math.min(Math.max(currentSectionIndex, 0), sections.length - 1);
  
      // Scroll to the next section
      sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
  
      // Prevent default scrolling behavior
      event.preventDefault();
    }
}

// Attach the scroll event listener to the document
document.addEventListener('wheel', handleScroll, { passive: false });

const projectContainers = document.querySelectorAll('.project-home, .teambuilder-container, .mbya-container');
const projectsSection = document.getElementById('projects');
const progressPoints = document.querySelectorAll('.progress-point');
let currentProjectIndex = 0;
let dragStartX = 0;
let isDragging = false;

function navigateToProject(index) {
  currentProjectIndex = Math.max(Math.min(index, projectContainers.length - 1), 0);
  scrollToCurrentProject();
  updateProgress();
}

function scrollToCurrentProject() {
  const container = projectContainers[currentProjectIndex];
  projectsSection.scrollLeft = container.offsetLeft;
}

function updateProgress() {
  progressPoints.forEach((point, index) => {
    if (index === currentProjectIndex || index === currentProjectIndex + 3 || index === currentProjectIndex + 6) {
      point.classList.add('active');
    } else {
      point.classList.remove('active');
    }
  });
}

function handleDragStart(event) {
  isDragging = true;
  dragStartX = event.clientX;
  projectsSection.style.cursor = 'grabbing'; // Change cursor to grabbing
  event.preventDefault(); // Prevent text selection
}

function handleDragMove(event) {
  if (!isDragging) return;

  const dragDistance = dragStartX - event.clientX;
  const containerWidth = projectContainers[0].offsetWidth;

  if (dragDistance > containerWidth / 2) {
    navigateToProject(currentProjectIndex + 1);
    isDragging = false;
  } else if (dragDistance < -containerWidth / 2) {
    navigateToProject(currentProjectIndex - 1);
    isDragging = false;
  }
}

function handleDragEnd() {
  isDragging = false;
  projectsSection.style.cursor = 'grab'; // Change cursor back to grab
}

projectsSection.addEventListener('mousedown', handleDragStart);
document.addEventListener('mousemove', handleDragMove); // Use document to capture movement anywhere
document.addEventListener('mouseup', handleDragEnd);
document.addEventListener('mouseleave', handleDragEnd);

// Initial update of progress and position
scrollToCurrentProject();

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


