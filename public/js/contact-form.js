window.addEventListener("load", () => {
  const contactForm = document.getElementById("contact-form");
  async function handleEvent(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };
    // these IDs from the previous steps
    emailjs
      .send(
        "service_rozuq1n",
        "template_c46cg49",
        formDataObject,
        "GfJtBCARK4fLYu-3n"
      )
      .then(
        function () {
          alert("Mensaje enviado.");
        },
        function (error) {
          console.error(error);
          alert("Error");
        }
      );
  }

  contactForm.addEventListener("submit", handleEvent);
});
