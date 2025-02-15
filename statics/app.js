document.addEventListener("DOMContentLoaded", function () {
    // Include components files
    function includeHTML() {
        const includes = document.querySelectorAll('[data-include]');
        includes.forEach(el => {
            const file = el.getAttribute("data-include");
            fetch(file)
            .then(response => response.text())
            .then(data => el.innerHTML = data)
            .catch(err => console.log("Error loading file:", err));
        });
    }

    window.onload = includeHTML;
    
    // navlinks changing color when click
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    // Create the Intersection Observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute("id");
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

            // Only modify the active class if the navLink exists
            if (navLink) {
                if (entry.isIntersecting) {
                    navLink.classList.add("active");
                } else {
                    navLink.classList.remove("active");
                }
            }
        });
    }, { threshold: 0.5 }); // Adjust threshold as needed

    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });

    // Handle clicks on navigation links
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
});
