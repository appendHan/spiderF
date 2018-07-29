package taobao

import (
	"github.com/parnurzeal/gorequest"
	"log"
	"net/http"
	"strings"
	"golang.org/x/text/encoding/simplifiedchinese"
)

func Do() {
	req := gorequest.New()
	req.DoNotClearSuperAgent = true
	//req.Proxy("http://127.0.0.1:8888")
	cookieStr := "_cc_=VT5L2FSpdA%3D%3D;_l_g_=Ug%3D%3D;_nk_=tb2137735;_tb_token_=fe6081b61eb7b;cna=+Y4qEzeYgHcCAXTj+xFjWnvN;cookie1=UINKJRSWtkhmAdTkm79J%2FgE48yMcCE0eGWUaElV537g%3D;cookie17=VAYrGGU3QpOZ;cookie2=1424568bc60d1aac29c6e4b97d1d5413;csg=ccf3dc21;dnk=tb2137735;enc=L7b%2FpYFnKOIVbIfDOIfiQqnJmJDjWVDTGgCDdI0344wGrJIBEiTpFjZ0gohwuZFWeiP%2FljC91ovaTI2cWwyLUg%3D%3D;existShop=MTUyMzQyNDkwOA%3D%3D;hng=CN%7Czh-CN%7CCNY%7C156;isg=BM7Olw5UGPRKDqykm2-K7SoiH6I8XJ1KmrwI8_gXOlGMW261YN_iWXQZl4c3w4ph;lgc=tb2137735;mt=np=&ci=3_1;sg=563;skt=9f3193eb08aed5d2;t=9f0c62e30885a5449dbef4f15fa1448f;tg=0;thw=cn;tracknick=tb2137735;uc1=cart_m=0&cookie14=UoTePTFDJEeMSg%3D%3D&lng=zh_CN&cookie16=Vq8l%2BKCLySLZMFWHxqs8fwqnEw%3D%3D&existShop=false&cookie21=V32FPkk%2FgPzW&tag=8&cookie15=VT5L2FSpMGV7TQ%3D%3D&pas=0;uc3=nk2=F5RHoJEzmHPm&id2=VAYrGGU3QpOZ&vt3=F8dBz4D43JPiBecR3nI%3D&lg2=VFC%2FuZ9ayeYq2g%3D%3D;unb=773364816;v=0;_mw_us_time_=1523424905997;"
	req.AddCookies(string2Cookies(cookieStr, "taobao.com"))
	req.AddCookies(string2Cookies(cookieStr, "tmall.com"))
	req.Set("Cache-Control","max-age=0")
	req.Set("Upgrade-Insecure-Requests","1")
	req.Set("Accept-Language","zh-CH,zh:q=0.8")
	req.Set("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
	req.Set("User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36")

	_, bt, _ := req.Get("https://member1.taobao.com/member/fresh/account_security.htm").EndBytes()
	data,_ := simplifiedchinese.GB18030.NewDecoder().Bytes(bt)
	log.Println(string(data))
}


func string2Cookies(str string, domain string) (cookies []*http.Cookie) {
	if len(str) == 0 {
		log.Fatalln("cookie 字符串为空")
	}
	cookies = *new([]*http.Cookie)
	for _, kp := range strings.Split(str, ";") {
		if len(kp) == 0 || strings.Index(kp, "=") < 0 {
			continue
		}
		name := strings.Split(kp, "=")[0]
		value := strings.Split(kp, "=")[1]
		cookies = append(cookies, &http.Cookie{Name: name, Value: value, Domain: domain, Path: "/"})
	}
	return
}
