window.onload = function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", async function (e) {
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
            debugger;
            alert("Mensaje enviado.");
          },
          function (error) {
            debugger;
            console.error(error);
            alert("Error");
          }
        );
    });
};
