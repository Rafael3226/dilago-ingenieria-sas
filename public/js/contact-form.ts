import EmailService, { type EmailProps } from "../../src/services/EmailService";

const formId = "contact-form";
const form = document.getElementById(formId);

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const formDataObject: EmailProps = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    message: formData.get("message") as string,
  };
  EmailService.send(formDataObject);
};

form.addEventListener("submit", handleSubmit);
