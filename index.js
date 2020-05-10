const puppeteer = require('puppeteer')

main()

async function main () {
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()

  await page.goto('https://10fastfingers.com/typing-test/english')

  console.log('waiting for navigation')
  await page.waitForNavigation({ waitUntil: ['networkidle0'] }).catch(Function.prototype)
  console.log('waited for navigation')
  console.log('waiting for word selector')
  await page.waitForSelector('[wordnr].highlight').catch(Function.prototype)
  console.log('waited for word selector')

  let word, timer
  do {
    word = await page.evaluate(() => {
      const el = document.querySelector('[wordnr].highlight')
      if (el) return el.textContent
    })
    timer = await page.evaluate(() => {
      const el = document.querySelector('#timer')
      if (el) return el.textContent
    })
    if (word) {
      console.log('typing', word)
      await page.type('#inputfield', word)
      await page.type('#inputfield', ' ')
    }
    // await page.waitFor(100)
  } while(word && timer !== '0:00')
}