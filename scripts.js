
//file:///C:/Users/JTA%20Team/Documents/GitHub/VRM/version.htm?app_version=1.4-beta(closing)&key=2136qefgweg462yg34g254h

function _q(){
    let url = window.location.href;
            let q = url.split('?');
            if(q.length == 2){
                let p = q[1].split('&');

                if(p.length > 0){
                    let f = -1;
                    for(let i = 0; i < p.length; i++){
                        let a = p[i].split('=').length;
                        if(a != 2) {
                            _e();
                            break;
                        }
                        else f = 1;
                    }
                    
                    if(f == 1){
                        let app_version = undefined;
                        let key = undefined;

                        for(let x = 0; x < p.length; x++){
                            let l = p[x].split("=");
                            let name = l[0];
                            let value = l[1];

                            if(name == 'app_version') app_version = value;
                            else if(name == 'key') key = value;
                        }

                        if(app_version != undefined && key != undefined){
                            _d(app_version, key);
                        }
                        else _e();
                    }
                }
                else _e();
            }
            else _e();
}

function _e(){
    let uri = window.location.href;
    window.location.href = uri.substring(0, uri.lastIndexOf('/')) + "/error.htm";
}

function _e_a(){
    let uri = window.location.href;
    window.location.href = uri.substring(0, uri.lastIndexOf('/')) + "/error_actual.htm";
}

function _d(app_version, key){
    let request = new XMLHttpRequest();
    request.open('GET', "version.json", false);
    request.send(null);

    if(request.status == 200){
        let response = JSON.parse(request.responseText);
        let version = response.version;
        let _k = response.key;
        if(version != undefined && _k != undefined){
            if(key != _k){
                _e(3);
            }else{
                if(version == app_version) _e_a();
                else main(version);
            }
        }else _e();
    }
    else _e();
}


function main(version){
    root = document.getElementById("root");

    let html = "<div id=\"root_center\">"
            + "<div id=\"root_title\"><img src=\"images/refresh-button.png\"/></div><div>"
            + "<div id=\"root_title\">Доступна новая версия</div><div>"
            + "<div id=\"version_data\" class=\"version_data_label\">Версия:</div>"
            + "<div id=\"version_data\" class=\"version_data_info\">" + version + "</div></div>"
            + "<p id=\"button_download\" onclick=\"download('" + version + "');\">Скачать</p></div>";
    root.innerHTML = html;
}

function download(version){
    let uri = window.location.href;
    window.location.href = uri.substring(0, uri.lastIndexOf('/')) + "/files/" + version + ".apk";
}