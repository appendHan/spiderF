package jingdong_m

import (
	"encoding/base64"
	"github.com/parnurzeal/gorequest"
	"github.com/robertkrimen/otto"
	"io/ioutil"
	"log"
	"net/http"
	"regexp"
		"strings"
)

const username = "851733646@qq.com"
const password = "abcd110120119xyz"

func Do() {
	//加载js
	f, err := ioutil.ReadFile("/Users/zhangsihang/Documents/GitHub/spiderF/targetWeb/jingdong_m/jingdong_m.js")
	if err != nil {
		log.Println(err)
		return
	}
	vm := otto.New()
	vm.Run(string(f))

	req := gorequest.New()
	req.DoNotClearSuperAgent = true
	req.Proxy("http://127.0.0.1:8888")
	req.Set("Cache-Control", "max-age=0")
	req.Set("Upgrade-Insecure-Requests", "1")
	req.Set("Accept-Language", "zh-CH,zh:q=0.8")
	req.Set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
	req.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36")

	_, bt, _ := req.Get("https://plogin.m.jd.com/user/login.action?appid=461&returnurl=http%3A%2F%2Fhome.m.jd.com%2FmyJd%2Fhome.action&ipChanged=").EndBytes()
	response_html := string(bt)
	md5js := regexp.MustCompile("getDat\\(username,pwd\\) {return (.*?);} ").FindStringSubmatch(response_html)[1]
	str_kenString := regexp.MustCompile("str_kenString = '(.*?)',").FindStringSubmatch(response_html)[1]
	str_rsaString := regexp.MustCompile("str_rsaString = '(.*?)',").FindStringSubmatch(response_html)[1]
	md5, _ := vm.Run("md5(" + md5js + ")")

	username_tmp, _ := vm.Run("myEncode('" + username + "','" + str_rsaString + "')")
	password_tmp, _ := vm.Run("myEncode('" + password + "','" + str_rsaString + "')")
	log.Println(username_tmp.String())

	username_rsa := base64.StdEncoding.EncodeToString([]byte(username_tmp.String()))
	passwoord_rsa := base64.StdEncoding.EncodeToString([]byte(password_tmp.String()))

	_, _, _ = req.Post("https://plogin.m.jd.com/cgi-bin/m/domlogin").
		Send("username=" + username_rsa).
		Send("pwd=" + passwoord_rsa).
		Send("remember=true").
		Send("s_token=" + str_kenString).
		Send("dat=" + md5.String()).
		Send("wlfstk_datk=" + md5.String()).
		EndBytes()
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
