export function getFooter() {
    const footerHTML = `
    
<footer class="footer">
  <div class="footer-container">

    <div class="footer-column">
      <h3>Kic 3D</h3>
      <p>Profesionalni 3D ispis, prototipiranje i modeliranje za industrijske i privatne projekte.</p>
    </div>

    <div class="footer-column">
      <h4>Brzi linkovi</h4>
      <ul>
        <li><a href="/">Početna</a></li>
        <li><a href="/usluge.html">Usluge</a></li>
        <li><a href="/galerija.html">Galerija</a></li>
        <li><a href="/contact.html">Kontakt</a></li>
      </ul>
    </div>

    <div class="footer-column">
      <h4>Kontakt</h4>
      <p>Email: kvukusic@ftrr.hr</p>
      <p>Telefon: +385 99 123 4567</p>
      <p>Požega, Hrvatska</p>
    </div>

  </div>

  <div class="footer-bottom">
    <p>© 2026 Kic3D. Sva prava pridržana.</p>
  </div>
</footer>
    `
    document.getElementById('footer-placeholder').innerHTML = footerHTML;
}