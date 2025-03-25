document.addEventListener("DOMContentLoaded", function () { 
    const searchButton = document.getElementById("searchButton");
    const profileSearch = document.getElementById("profileSearch");
    const keywordSearch = document.getElementById("searchJob");
    const locationSearch = document.getElementById("locationSearch");
    const remoteCheckbox = document.getElementById("remote");
    const hybridCheckbox = document.getElementById("hybrid");
    const onsiteCheckbox = document.getElementById("onsite");
    const clearFiltersButton = document.getElementById("clearFilters");
    const jobCountElement = document.getElementById("jobCount");
    
    // Salary filter elements
    const minSalary = document.getElementById("minSalary");
    const maxSalary = document.getElementById("maxSalary");
    const minSalaryValue = document.getElementById("minSalaryValue");
    const maxSalaryValue = document.getElementById("maxSalaryValue");

    // Function to update salary values
    function updateSalaryValues() {
        if (parseFloat(minSalary.value) > parseFloat(maxSalary.value)) {
            minSalary.value = maxSalary.value;
        }
        minSalaryValue.textContent = `${minSalary.value} LPA`;
        maxSalaryValue.textContent = `${maxSalary.value} LPA`;
        filterJobs(); // Call filter function when salary is updated
    }

    // Function to update job count dynamically
    function updateJobCount() {
        let visibleJobs = document.querySelectorAll(".job:not([style*='display: none'])").length;
        jobCountElement.textContent = `${visibleJobs} Jobs`;
    }
    
    // Function to filter jobs based on user input
    function filterJobs() {
        const profile = profileSearch.value.toLowerCase();
        const location = locationSearch.value.toLowerCase();
        const keyword = keywordSearch.value.toLowerCase();
        const isRemote = remoteCheckbox.checked;
        const isHybrid = hybridCheckbox.checked;
        const isOnsite = onsiteCheckbox.checked;
        const minSalaryFilter = parseFloat(minSalary.value);
        const maxSalaryFilter = parseFloat(maxSalary.value);

        let jobCount = 0;
        document.querySelectorAll(".job").forEach(job => {
            let jobTitle = job.querySelector("h3").textContent.toLowerCase();
            let jobLocation = job.querySelector("p:nth-child(3)").textContent.toLowerCase();
            let jobText = job.textContent.toLowerCase();
            let salaryText = job.querySelector("p:nth-child(4)").textContent;
            let salaryMatch = salaryText.match(/₹([\d,]+) - ([\d,]+)/);

            let minJobSalary = salaryMatch ? parseInt(salaryMatch[1].replace(/,/g, "")) / 100000 : 0;
            let maxJobSalary = salaryMatch ? parseInt(salaryMatch[2].replace(/,/g, "")) / 100000 : 20;

            let matchesProfile = !profile || jobTitle.includes(profile);
            let matchesLocation = !location || jobLocation.includes(location);
            let matchesKeyword = !keyword || jobText.includes(keyword);
            let matchesSalary = minJobSalary >= minSalaryFilter && maxJobSalary <= maxSalaryFilter;
            let matchesType = (!isRemote && !isHybrid && !isOnsite) || 
                             (isRemote && jobText.includes("remote")) || 
                             (isHybrid && jobText.includes("hybrid")) || 
                             (isOnsite && jobText.includes("onsite"));

            if (matchesProfile && matchesLocation && matchesKeyword && matchesSalary && matchesType) {
                job.style.display = "block";
                jobCount++;
            } else {
                job.style.display = "none";
            }
        });

        updateJobCount();
    }

    // Function to clear all filters and reset job listings
    function clearFilters() {
        profileSearch.value = "";
        locationSearch.value = "";
        keywordSearch.value = "";
        remoteCheckbox.checked = false;
        hybridCheckbox.checked = false;
        onsiteCheckbox.checked = false;
        minSalary.value = 0;
        maxSalary.value = 20;
        updateSalaryValues();

        document.querySelectorAll(".job").forEach(job => {
            job.style.display = "block";
        });

        updateJobCount();
    }

    // Function to trigger filtering when pressing "Enter"
    function handleEnterKey(event) {
        if (event.key === "Enter") {
            filterJobs();
        }
    }

    // Attach event listeners for text input fields
    profileSearch.addEventListener("keypress", handleEnterKey);
    locationSearch.addEventListener("keypress", handleEnterKey);
    keywordSearch.addEventListener("keypress", handleEnterKey);
    minSalary.addEventListener("input", updateSalaryValues);
    maxSalary.addEventListener("input", updateSalaryValues);

    // Attach event listeners for checkboxes (trigger filter on "Enter")
    [remoteCheckbox, hybridCheckbox, onsiteCheckbox].forEach(checkbox => {
        checkbox.addEventListener("keypress", handleEnterKey);
        checkbox.addEventListener("change", filterJobs); // Trigger filter on checkbox click
    });

    // Trigger search when clicking the button
    searchButton.addEventListener("click", filterJobs);

    // Clear all filters when clicking the "Clear All" button
    clearFiltersButton.addEventListener("click", clearFilters);

    // Update job count on page load with total jobs before filtering
    updateJobCount();
});

