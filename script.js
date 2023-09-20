const sections = document.querySelectorAll("nav, #about, #skills, #project-home, #teambuilder-container, #mbya-container, #contact")

// Create a new Intersection Observer instance
var currentSectionIndex = 0;
let touchPoint = 0
let scrollStart = 0
let scrollEnd = 0

const navLinks = document.querySelectorAll("nav a")
navLinks.forEach((a) => {
  a.addEventListener("click", () => {
    currentSectionIndex = Array.from(sections).findIndex((section) => {
      return section.id == event.target.href.split("#").pop()
    })
    console.log(currentSectionIndex)
  })

})

// Function to handle the scroll event
function handleScroll(event, param1) {


    let direction = 0
  
    if(event.direction) {

      direction = event.direction
      event = event.originalEvent
      
      
    }

    else {
      direction = event.deltaY > 0 ? 1 : -1; // Check scroll direction
    }

    currentSectionIndex += direction;

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

function handleScrollWithParams(param1 = null) {

  return function(event) {
      handleScroll(event, param1);
  };
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

const throttledHandleScroll = throttle(handleScrollWithParams(), 500);

// Attach the scroll event listener to the document
document.addEventListener('wheel', throttledHandleScroll, { passive: false });
document.addEventListener('touchstart', (e) => {
  scrollStart = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
  scrollEnd = e.changedTouches[0].clientY;
  const deltaY = scrollEnd - scrollStart;

  let direction = 0;

    // Check the direction of the scroll
    if (deltaY > 0) {
       
      direction = -1;
      const eventWithDirection = { direction, originalEvent: e };
      throttledHandleScroll(eventWithDirection); 

    } else if (deltaY < 0) {
        // Scroll up
        direction = 1;
        const eventWithDirection = { direction, originalEvent: e };
        throttledHandleScroll(eventWithDirection); 
    }



});

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


