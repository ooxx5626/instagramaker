const puppeteer = require('puppeteer');
var fs = require('fs')
function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

(async() => {
var count = parseInt(fs.readFileSync('account.txt','utf8'))
        i = count
        j = i+6
    for (var i ; i<j;i++){
        const browser = await puppeteer.launch({headless:true});// false 有顯示視窗(無法用pdf 但可用 screenshot)
        const page = await browser.newPage();
        await page.goto('https://www.instagram.com');
        console.log(`第${i-count+1}個帳號`);
        const email = await page.$('input[name=emailOrPhone]')
        await page.focus('input[name=emailOrPhone]')
        await page.keyboard.type(`21namsse${i}@mail.ww`, {delay: 1})
        const fullName = await page.$('input[name=fullName]')
        await fullName.type(`21namsse${i}`)
        // await page.keyboard.type('Worlssd', {delay: 1})
        const username = await page.$('input[name=username]')
        await username.type(`21namsse${i}`)
        // const password = await page.$('input[name=password]')
        // await password.type('a12345')
        await page.focus('input[name=password]')
        await page.keyboard.type(`pass${i}@pass.pass`, {delay: 1})
        await page.keyboard.press('Enter')
        console.log(`送出驗證中...`);
        // await delay(3000);
        const Regicon = '#react-root > div > div > div:nth-child(1) > section > section > div > div._g4jnt > span'
        try{
            await page.waitForSelector(Regicon, {timeout:8500})
            console.log(`21namsse${i}@mail.ww 辦好了`)
        }catch(err){
            try{
                const log = await page.$('#ssfErrorAlert')
                const innerText = await page.evaluate(() =>//撈出錯誤
                document.body.querySelector('#ssfErrorAlert').innerText);
                console.log(`${innerText}`)
            }catch(err){
                const html = await page.content()
                console.log(`已註冊過`)
            }
            console.log(`21namsse${i}@mail.ww 無法使用`)
        }
        if(i + 1 == j){ //重設IP
        console.log(`5隻帳號已辦完重設IP...`);
        await fs.writeFileSync('account.txt', j)
        await page.goto('http://192.168.0.1/login.asp');
        await page.waitForSelector('input[name=Password]')
        await page.focus('input[name=Password]')
        await page.keyboard.type('password')
        await page.keyboard.press('Enter')
        await page.waitForSelector('#submit_ok')
        await page.focus('#submit_ok')
        await page.keyboard.press('Enter')
        await delay(2000);
        page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.accept();
          });
        console.log(`重設完畢`);
        }
        await browser.close();
}
})();