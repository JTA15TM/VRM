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
                            _e(1);
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
                        else _e(1);
                    }
                }
                else _e(1);
            }
            else _e(1);
}

function _e(code){
    let uri = window.location.href;
    let _code = code;
    window.location.href = uri.substring(0, uri.lastIndexOf('/')) + "/error" + (_code > 1 ? code : "") + ".json";
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
                if(version == app_version) _e(2);
                else{
                    let uri = window.location.href;
                    window.location.href = uri.substring(0, uri.lastIndexOf('/')) + "/version.json";
                }
            }
        }else _e(3);
    }
    else _e(3);
}