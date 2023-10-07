import puppeteer from 'puppeteer-core'
import axios from 'axios';

process.on('message',function(msg){
    console.log(msg)
    let init = function(){
        scrapeData();
    }.bind(this)();

    async function scrapeData(){
        let ip='localhost'
        let port=3001
        let profileID=msg.dolphinID
        const executionTimeInSeconds = msg.timer||100;



        const sleep = (ms) => {
            return new Promise((resolve) => setTimeout(resolve, ms));
        };
        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        let browser; // Declare the browser variable here
        // Start a timer to stop the execution after the specified time
        const timer = setTimeout(() => {
            console.log('Execution timed out. Stopping...');
            browser.close(); // Close the Puppeteer browser instance
            process.exit(0); // Exit the Node.js process
        }, executionTimeInSeconds * 1000);

        try{
            axios.get(`http://${ip}:${port}/v1.0/browser_profiles/${profileID}/start?automation=1`).then(async res => {
                let SNAPCHAT_ID='snap'

                let messages=[
                    "hii how are you <name>? add me on snap i love your profile picture! you should add me on snap:) ",
                    "you look like a lot of fun <name>:) here is my snap ",
                    "hi hi <name> how are you? here's my snap btw ",
                    "yayy hi <name>! you should add me on snap:) ",
                    "hello:) you seem fun <name>, add me on snap ",
                    "hi hi you seem fun, add me on snap <name>:) ",
                    "you look like a funny guy, i had to message first. add me on snap <name>:) ",
                    "no way haha, hi! add me on snap <name>:) ",
                    "how are you <name>? You should add me on snap ",
                    "<name> how are you? you seem fun, here's my snap ",
                    "helloo:) you should add me on snap <name> im pretty bored ",
                    "yayy hi <name>, you should add me on snap:) ",
                    "helloo hi <name>, heres my snap ",
                    "you seem like a fun guy, hi! add me on snap <name> ",
                    "<name> hi hi how are you? you should add me on snap:) ",
                    "i love your profile pic haha, add me on snap <name>:) ",
                    "how r you <name>? add me on snap:) ",
                    "hello! do you have snap? add me:) ",
                    "hi hello <name>:) u use snap? add me ",
                    "hii <name> do you like icecream? add me on snap ",
                    "Heyy you seem like a funny guy! add me on snap <name>:) ",
                    "helloo you seem fun:) you should add me on snap ",
                    "do you like icecream <name>? you seem fun, add me on snap:) ",
                    "you're cute:) do you use snap <name>? here's mine, add me ",
                    "hi hi how are you <name>? you should add me on snap:) ",
                    "hiii hi <name>:) you should add me on snap💕 ",
                    "hi how are you <name>?💕 add me on my snap ",
                    "do you have snap <name>? add me:) ",
                    "hi helloo <name> do you have snap? here is mine ",
                    "hi hi <name> do u use snap? here is mine, you should add me:) ",
                    "<name> do you have snap? you should add me there you're cute:) ",
                    "hi hi you're cute 🙈 you should add me on snap <name>:) ",
                    "hi <name> what are you up to? add me on snap! ",
                    "hii what are you doing right now? anything interesting <name>? you should add me on snap:) ",
                    "hello hows your day goiing?:)) you should add me on snap <name>:) ",
                    "hi hi you seem like a super nice guy:) you should add me on snap <name>! :) ",
                    "hi you're cute:) you seem like a nice guy, add me on snap:) ",
                    "<name> do you have snap by any chance? you should add me there, you're cute:) ",
                    "hi hii <name>:) what are you up to? add me on my snap ",
                    "helloo what are you doing rn <name>? you should add me on snap btw ",
                    "hii how are you? you seem cute, add me on your snap <name>:)) ",
                    "hi hi <name> are you here? if not, you should add me on snap:)) ",
                    "yayy hi i thought you would match me, maybe add me on your snap <name>:)) ",
                    "how's your day <name>?:) you can add me on snap if you want:) ",
                    "hi yayy nice to meet you, you're cute!:) you should add me on your snap:) ",
                    "hi <name> do you prefer icecream or coffee? add me on snap by the way:)) ",
                    "helloo i like you, you're cute <name>:) why don't you add me on snap? ",
                    "hi hi i like your name <name> haha:)) add me on snap:) ",
                    "yayy helloo how are you <name>? i like your name haha its cute, add me on snap!:) "
                ]

                
                let messages_len=messages.length
                
                const port = res.data.automation.port; 

                const wsEndpoint = res.data.automation.wsEndpoint; 

                browser = await puppeteer.connect({
                    browserWSEndpoint: `ws://127.0.0.1:${port}${wsEndpoint}`,
                    defaultViewport: null
                });

                const page = await browser.newPage();

                await page.goto('https://bumble.com',{waitUntil:"networkidle2",timeout:0});
                await page.waitForSelector('.button.button--block.button--secondary.js-event-link',{visible:true});
                await sleep(3000)
                await page.$eval('.button.button--block.button--secondary.js-event-link', el => {
                    if(el){
                        el.click()
                    }
                });
                await sleep(10000)
                await page.waitForSelector('[data-qa-role="carousel-contact"]', { visible: true ,timeout:0});
                let carouselItems = await page.$$('[data-qa-role="carousel-contact"]');
                let remainingIndexes=new Array(carouselItems.length )
                for(let i=0;i<remainingIndexes.length;i++){
                    remainingIndexes[i]=i
                }
                async function clickRandomIndex(){
                    carouselItems = await page.$$('[data-qa-role="carousel-contact"]');
                    let selectedIndex=Math.floor(Math.random()*(remainingIndexes.length-1))
                    await sleep(5000)
                    await carouselItems[remainingIndexes[selectedIndex]].click()

                    remainingIndexes.splice(selectedIndex,1)
                }
                for(let i=0;i<messages_len;i++){
                    try{
                        if(!remainingIndexes.length){
                            break
                        }
                        await sleep(1500)
                        await clickRandomIndex()
                        
                        sleep(randomIntFromInterval(1000,2000))
                        
                        try {
                            await page.waitForSelector('.textarea__input',{visible:true});
                            let selectedIndex=Math.floor(Math.random()*(messages.length-1))
                            const name = await page.evaluate(() => {
                                const element = document.querySelector('.messages-header__name.is-clickable .header-2');
                                return element ? element.textContent : null;
                            });
                            let msg=messages[selectedIndex]
                            msg=msg.replace('<name>',name)
                            msg=msg.trim()
                            await page.focus('.textarea__input');
                            await sleep(2000)
                            for (let j = 0; j < msg.length; j++) {
                                const char = msg.charAt(j);
                                //Keyboard Typing Delay
                                await sleep(100)
                                await page.keyboard.type(char);
                            }
                            messages.splice(selectedIndex,1)

                            //Second Message
                            
                            await page.waitForSelector(`.message-field__send`, { visible: true });
                            await sleep(1500)
                            await page.click(`.message-field__send`);

                            await page.focus('.textarea__input');
                            await sleep(2000)
                            for (let j = 0; j < SNAPCHAT_ID.length; j++) {
                                const char = SNAPCHAT_ID.charAt(j);
                                //Keyboard Typing Delay
                                await sleep(100)
                                await page.keyboard.type(char);
                            }
                            
                            await page.waitForSelector(`.message-field__send`, { visible: true });
                            await sleep(1500)
                            await page.click(`.message-field__send`);
                            await sleep(5000)
                        } catch (error) {
                            i--
                            
                        }
                    }catch(e){
                        console.log(e)
                        i--
                        
                    }
                    
                } 
                
            })

        }catch(e){
            console.log(e);
            // Clear the timer if an error occurs
            clearTimeout(timer);
        }
        process.send({ status: 'Done Scrapping' });
            
        process.disconnect(); 
    }
});

process.on('uncaughtException',function(err){
    console.log("Error happened: " + err.message + "\n" + err.stack + ".\n");
});




  

    
        
