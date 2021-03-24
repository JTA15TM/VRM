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
    window.location.href = uri.substring(0, uri.lastIndexOf('/')) + "/error.json";
}

function _d(app_version, key){
    let request = new XMLHttpRequest();
    request.open('GET', "version.json", false);
    request.send(null);

    alert(request.status);
    alert(request.responseText);
}