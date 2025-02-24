document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach((section) => observer.observe(section));
});
document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formData = new FormData(form);
    const statusMessage = document.getElementById("form-status");

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            statusMessage.textContent = "Thank you! Your message has been sent.";
            statusMessage.style.color = "green";
            form.reset();
        } else {
            throw new Error("Something went wrong.");
        }
    } catch (error) {
        statusMessage.textContent = "Oops! Something went wrong. Please try again.";
        statusMessage.style.color = "red";
    }
});
