const Tesseract = require('tesseract.js')
const playwright = require('playwright-aws-lambda');

(async () => {
    let browser = null

    try {
        browser = await playwright.launchChromium({ headless: true })
        const contextClp = await browser.newContext()
        const page = await contextClp.newPage()

        await page.goto(
            'https://p2p.binance.com/es/trade/all-payments/USDT?fiat=CLP'
        )

        //Chile Input Amount
        await page.waitForLoadState('domcontentloaded')
        await page.waitForSelector('#C2Csearchamount_searchbox_amount')
        await page.click('#C2Csearchamount_searchbox_amount')
        await page.type('#C2Csearchamount_searchbox_amount', '10000', {
            delay: 500,
        })

        //Chile select Fiat CLP
        await page.click('#C2Cfiatfilter_searchbox_fiat')
        await page.waitForSelector(
            '#C2Cfiatfilter_searchbox_fiat > div.bn-sdd-dropdown.showing.css-fxluzf > div > div > input'
        )
        await page.type(
            '#C2Cfiatfilter_searchbox_fiat > div.bn-sdd-dropdown.showing.css-fxluzf > div > div > input',
            'CLP'
        )
        await page.waitForSelector('#CLP')
        await page.waitForTimeout(2000)
        await page.click('#CLP')
        await page.waitForTimeout(5000)
        //Chile Take Screenshot
        const USDTCLPImg = await page.screenshot({
            clip: {
                height: 40,
                width: 70,
                x: 350,
                y: 630,
            } /* , path:'src/images/clp.png' */,
        })

        const USDTCLPRate = await Tesseract.recognize(USDTCLPImg, 'eng').then(
            ({ data: { text } }) => text
        )
        console.log('USDTCLPRate: ', USDTCLPRate)

        //Venezuela Select Sell
        await page.click(
            '#__APP > div.layout__Container-sc-1v4mjny-0.hFTMle.scroll-container > main > div.css-15owl46 > div.css-hom7ao > div.css-3tldoo > div > div > div:nth-child(1) > div > div > div.css-yxrkwa'
        )
        await page.waitForTimeout(3000)
        //Venezuela Input Amount
        await page.waitForSelector('#C2Csearchamount_searchbox_amount')
        await page.click('#C2Csearchamount_searchbox_amount')
        await page.keyboard.press('Backspace')
        await page.keyboard.press('Backspace')
        await page.keyboard.press('Backspace')
        await page.keyboard.press('Backspace')
        await page.keyboard.press('Backspace')
        await page.type('#C2Csearchamount_searchbox_amount', '250', { delay: 100 })
        //Venezuela select Fiat VES
        await page.click('#C2Cfiatfilter_searchbox_fiat')
        await page.waitForSelector(
            '#C2Cfiatfilter_searchbox_fiat > div.bn-sdd-dropdown.showing.css-fxluzf > div > div > input'
        )
        await page.type(
            '#C2Cfiatfilter_searchbox_fiat > div.bn-sdd-dropdown.showing.css-fxluzf > div > div > input',
            'VES'
        )
        await page.waitForSelector('#VES')
        await page.waitForTimeout(2000)
        await page.click('#VES')
        await page.waitForTimeout(2000)
        //Tipo de pago
        await page.click('#C2Cpaymentfilter_searchbox_payment > div.css-uf3q7d')
        await page.waitForSelector(
            '#C2Cpaymentfilter_searchbox_payment > div.bn-sdd-dropdown.showing.css-fxluzf > div > div > input'
        )
        await page.type(
            '#C2Cpaymentfilter_searchbox_payment > div.bn-sdd-dropdown.showing.css-fxluzf > div > div > input',
            'pago movil',
            { delay: 100 }
        )
        await page.keyboard.press('Enter')
        await page.waitForTimeout(7000)

        //Venezuela take screenshot
        const USDTVESImg = await page.screenshot({
            clip: {
                height: 40,
                width: 70,
                x: 350,
                y: 630,
            } /* , path:'src/images/ves.png' */,
        })
        await page.waitForTimeout(2000)

        const USDTVESRate = await Tesseract.recognize(USDTVESImg, 'eng').then(
            ({ data: { text } }) => text
        )
        console.log('USDTVESRate: ', USDTVESRate)

        const convertToDecimal = (numStr) => {
            return numStr.includes('.')
                ? numStr
                : `${numStr.substring(0, 2)}.${numStr.substring(2, numStr.length)}`
        }

        console.log('Current Rate: ', convertToDecimal(USDTVESRate) / USDTCLPRate)
        console.log(
            'Current Rate profit 5%: ',
            (convertToDecimal(USDTVESRate) / USDTCLPRate) * 0.95
        )
        console.log(
            'Current Rate profit 6%: ',
            (convertToDecimal(USDTVESRate) / USDTCLPRate) * 0.94
        )
        console.log(
            'Current Rate profit 7%: ',
            (convertToDecimal(USDTVESRate) / USDTCLPRate) * 0.93
        )
        console.log(
            'Current Rate profit 8%: ',
            (convertToDecimal(USDTVESRate) / USDTCLPRate) * 0.92
        )
        console.log(
            'Current Rate profit 9%: ',
            (convertToDecimal(USDTVESRate) / USDTCLPRate) * 0.91
        )
        console.log(
            'Current Rate profit 10%: ',
            (convertToDecimal(USDTVESRate) / USDTCLPRate) * 0.9
        )
    } catch (error) {
        throw error
    } finally {
        if (browser) {
            console.log('fin proceso')
            await browser.close()
        }
    }
})()
