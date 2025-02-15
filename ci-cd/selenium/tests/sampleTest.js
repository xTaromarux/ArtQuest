const { Builder, By, until } = require('selenium-webdriver');

(async function sampleTest() {
  // Ustaw URL WebDrivera: 
  // Jeśli testy uruchamiasz w ramach Docker Compose i Selenium jest w tej samej sieci,
  // użyj "http://selenium:4444/wd/hub". Jeśli lokalnie, użyj "http://localhost:4444/wd/hub".
  const seleniumUrl = process.env.SELENIUM_URL || 'http://localhost:4444/wd/hub';

  let driver = await new Builder()
    .usingServer(seleniumUrl)
    .forBrowser('chrome')
    .build();

  try {
    // Otwieramy stronę frontendową (np. Expo Web, port 19006)
    await driver.get('http://localhost:19006');

    // Czekamy na element zawierający tekst "Witamy"
    let element = await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Witamy')]")), 10000);
    console.log('Element znaleziony:', await element.getText());
  } catch (error) {
    console.error('Błąd testu Selenium:', error);
    process.exit(1);
  } finally {
    await driver.quit();
  }
})();
