import { Application } from "./components/application/application.component";

const form = document.forms[0];

if (form) {
  new Application(form);
}
