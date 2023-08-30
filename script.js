const sections = document.querySelectorAll("nav, #about, #skills, #project-home, #teambuilder-container, #mbya-container, #contact")
console.log(sections)

// Create a new Intersection Observer instance
let currentSectionIndex = 0;

// Function to handle the scroll event
function handleScroll(event) {
    const direction = event.deltaY > 0 ? 1 : -1; // Check scroll direction

    currentSectionIndex += direction;
    console.log(currentSectionIndex)

    if ( currentSectionIndex == 3 && direction == -1 || currentSectionIndex == 4 && direction == -1) {
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

function throttle(func, limit) {
  let inThrottle;
  return function() {
      const context = this;
      const args = arguments;
      if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
      }
  };
}

const throttledHandleScroll = throttle(handleScroll, 500);

// Attach the scroll event listener to the document
document.addEventListener('wheel', throttledHandleScroll, { passive: false });

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


