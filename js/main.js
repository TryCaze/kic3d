import { getNavbar } from "../components/nav.js";
import { getFooter } from "../components/footer.js";
import { getInventory } from "../components/produkti.js";

document.addEventListener('DOMContentLoaded', () => {
    getNavbar(),
    getFooter(),
    getInventory()
})