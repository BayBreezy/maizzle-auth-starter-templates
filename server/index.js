import nodemailer from "nodemailer";
import fs from "fs";
import { join, dirname } from "path";
import mustache from "mustache";
import { faker } from "@faker-js/faker";
import os from "os";
import { fileURLToPath } from "url";
import { htmlToText } from "nodemailer-html-to-text";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const __dirname = dirname(fileURLToPath(import.meta.url));

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  requireTLS: false,
});

transporter.use("compile", htmlToText());

const templateData = {
  username: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  otp: faker.helpers.fromRegExp(/[0-9]{4}-[0-9]{4}/),
  link: faker.internet.url(),
  device: os.platform(),
  location: `${faker.location.city()}, ${faker.location.country()}`,
  datetime: faker.date.recent(),
  newEmail: faker.internet.email().toLowerCase(),
  teamName: faker.company.name(),
  organizationName: faker.company.name(),
  inviter: faker.person.fullName(),
  inviterEmail: faker.internet.email().toLowerCase(),
};

const main = async () => {
  // get each file in the folder & loop over each and send the email
  const templates = await fs.promises.readdir(join(__dirname, "../build_production"));
  for (const template of templates) {
    const html = await fs.promises.readFile(
      join(__dirname, "../build_production", template),
      "utf8",
    );
    const rendered = mustache.render(html, templateData);
    await transporter.sendMail({
      from: faker.internet.email().toLowerCase(),
      to: faker.internet.email().toLowerCase(),
      subject: template.replace(".html", "").replace(/-/g, " "),
      html: rendered,
    });
  }
  console.log("Emails sent successfully");
};

main().catch(console.error);
