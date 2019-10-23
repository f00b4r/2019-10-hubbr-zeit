import chromeAws from "chrome-aws-lambda";
const puppeteer = chromeAws.puppeteer as any;

export async function getImage(source: string): Promise<string> {
  let content = null;
  let browser = null;
  let page = null;

  try {
    browser = await puppeteer.launch({
      args: chromeAws.args,
      defaultViewport: chromeAws.defaultViewport,
      executablePath: await chromeAws.executablePath,
      headless: chromeAws.headless,
    });

    page = await browser.newPage();
    await page.setContent(source);

    await page.emulateMedia("screen");
    // content = await page.screenshot();

    const badge = await page.$('#badge');
    content = await badge.screenshot();
  } catch (error) {
    throw error;
  } finally {
    if (page !== null) {
      await page.close();
    }
    if (browser !== null) {
      await browser.close();
    }
  }

  return content;
}
