import { getFullSlug } from "../util/path";

const checkboxId = (index: number) => `${getFullSlug(window)}-checkbox-${index}`;

const setupCheckboxes = () => {
  const checkboxes = document.querySelectorAll(
    "input.checkbox-toggle",
  ) as NodeListOf<HTMLInputElement>;
  checkboxes.forEach((el, index) => {
    const elId = checkboxId(index);

    const switchState = (e: Event) => {
      const newCheckboxState = (e.target as HTMLInputElement)?.checked ? "true" : "false";
      localStorage.setItem(elId, newCheckboxState);
    };

    el.addEventListener("change", switchState);
    window.addCleanup(() => el.removeEventListener("change", switchState));
    if (localStorage.getItem(elId) === "true") {
      el.checked = true;
    }
  });
};

document.addEventListener("nav", setupCheckboxes);
document.addEventListener("render", setupCheckboxes);
