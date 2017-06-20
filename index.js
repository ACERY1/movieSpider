// 导入依赖
let cheerio = require("cheerio");
let http = require("http");
let iconv = require("iconv-lite");
let fs = require("fs");

let baseUrl = "http://www.ygdy8.net/html/gndy/dyzz/list_23_"; // 爬取的URL地址
let index = 1;
let urls = [];


let getTitle = (idx, url) => {
    http.get(url + idx + ".html", (res) => {
        console.log("get from: " + url + idx + ".html")
        let chunks = [];
        res.on('data', (chunk) => {
            chunks.push(chunk);
        });
        res.on("end", () => {
            let html = iconv.decode(Buffer.concat(chunks), 'gb2312');
            let $ = cheerio.load(html, { decodeEntities: false });
            $('.co_content8 .ulink').each(function (idx, element) {
                let $element = $(element);
                fs.appendFileSync('./output.txt', $element.html() + '\n');
                fs.appendFileSync('./output2.txt', $element.html()+" : "+$element.attr("href")+'\n')
                // urls.push({
                //   title: $element.attr('href')
                // })
            })
        })
    });
}


for (let i = 0; i < 4; i++) {
    getTitle(i, baseUrl);
}


