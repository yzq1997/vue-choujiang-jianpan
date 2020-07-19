export var ConfigApi = {
    serviceDomain: 'http://localhost:8080',
    appDomain: 'http://localhost:8080',
    imgDomain: 'http://localhost:8080',
    qqDomain:'http://localhost:8080',
    apiPath: {
        main: "interface/main",
    },
    imgPath: {
        public: "/asset"
    },
    filesPath:'',
    authenUrl:'',
    orderreturnUrl:'',
    SPNo:'spa00022',
    ProductID:'6010000012',
}

let host = window.location.host;

// 自动检测本地服务器
if (-1 != host.indexOf("localhost")) {
    //ConfigApi.serviceDomain = 'http://test:8080/';
    ConfigApi.serviceDomain = 'http://iptv.jshcsoft.com:1003/';
    ConfigApi.qqDomain='http://192.168.1.229:8080',
    ConfigApi.authenUrl='';
}
// 自动检测山东服务器,aliyun
else if (-1 != host.indexOf("iptv.jshcsoft.com")) {
    ConfigApi.appDomain= 'http://iptv.jshcsoft.com/';
    ConfigApi.serviceDomain = 'http://iptv.jshcsoft.com:1003/';
    ConfigApi.filesPath='shandong/web/videos';
    ConfigApi.authenUrl='';
    ConfigApi.orderreturnUrl='shandong/web/'
}
// 自动检测广西服务器
else if (-1 != host.indexOf("222.217.76.249")) {
    ConfigApi.appDomain= 'http://222.217.76.249:10089/';
    ConfigApi.serviceDomain = 'http://222.217.76.249:10090/';
    ConfigApi.filesPath='videos';
    ConfigApi.authenUrl='';
}
// 自动检测山东服务器,广电
else if (-1 != host.indexOf("10.23.189.35")) {
    ConfigApi.appDomain= 'http://10.23.189.35:9001/';
    ConfigApi.serviceDomain = 'http://10.23.189.35:9002/';
    ConfigApi.filesPath='web/videos';
    ConfigApi.authenUrl='';
    ConfigApi.orderreturnUrl='web/'
}
// 自动检测山东服务器,广电
else if (-1 != host.indexOf("150.138.11.178") || -1 != host.indexOf("pzsh.life.sdteleiptv.com")) {
    ConfigApi.appDomain= 'http://pzsh.life.sdteleiptv.com:9001/';
    ConfigApi.serviceDomain = 'http://pzsh.life.sdteleiptv.com:9002/';
    ConfigApi.filesPath='web/videos';
    ConfigApi.authenUrl='';
    ConfigApi.orderreturnUrl='web/'
}
