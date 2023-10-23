import emailjs from "@emailjs/nodejs";

type EmailProps = {
  name: string;
  email: string;
  phone: number;
  message: string;
};

class EmailService {
  private static readonly PRIVATE_KEY = import.meta.env.EMAIL_PRIVATE_KEY;
  private static readonly PUBLIC_KEY = import.meta.env.EMAIL_PUBLIC_KEY;
  private static readonly SERVICE_ID = import.meta.env.EMAIL_SERVICE_ID;
  private static readonly TEMPLATE_ID = import.meta.env.EMAIL_TEMPLATE_ID;

  static async send(params: EmailProps) {
    return emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, params, {
      publicKey: this.PUBLIC_KEY,
      privateKey: this.PRIVATE_KEY,
    });
  }
}

export default EmailService;
