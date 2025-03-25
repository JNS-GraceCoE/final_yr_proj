document.addEventListener("DOMContentLoaded", function () {
    // Fix for dropdown navigation clicking issue
    document.querySelectorAll(".dropdown > .main-link").forEach(link => {
        link.addEventListener("click", function (event) {
            // Allow navigation when clicked
            window.location.href = this.href;
        });
    });

    // Dropdown toggle for mobile clicks
    document.querySelectorAll(".dropdown > a").forEach(dropdown => {
        dropdown.addEventListener("click", (event) => {
            event.preventDefault();
            let menu = dropdown.nextElementSibling;
            menu.style.display = menu.style.display === "block" ? "none" : "block";
        });
    });

    // Close dropdown if clicked outside
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".dropdown")) {
            document.querySelectorAll(".dropdown-menu").forEach(menu => {
                menu.style.display = "none";
            });
        }
    });

    // Search Bar Functionality
    document.querySelector(".search-bar button").addEventListener("click", () => {
        let query = document.querySelector(".search-bar input").value.trim();
        if (query) {
            alert("Searching for: " + query);
        }
    });

    // Auto-Sliding Functionality
    function moveSlide(sliderId, direction) {
        let slider = document.getElementById(sliderId);
        let cards = slider.children;
        let currentOffset = slider.style.transform ? parseInt(slider.style.transform.replace('translateX(', '').replace('px)', '')) : 0;
        let cardWidth = cards[0].offsetWidth + 20; // 20px for margin

        // Calculate new offset
        let newOffset = currentOffset - direction * cardWidth;

        // Check boundaries
        let maxOffset = -cardWidth * (cards.length - 1);
        if (newOffset < maxOffset) newOffset = 0; // Restart from first
        if (newOffset > 0) newOffset = maxOffset; // Go to last

        slider.style.transform = `translateX(${newOffset}px)`;
    }

    // Different speeds for each section
    function autoSlide(sliderId, interval) {
        setInterval(() => {
            moveSlide(sliderId, 1);
        }, interval);
    }

    // Start auto-slide with different speeds
    autoSlide("internship-slider", 3000); // 3 sec for internships
    autoSlide("job-slider", 5000); // 5 sec for jobs
    autoSlide("course-slider", 7000); // 7 sec for courses
});
