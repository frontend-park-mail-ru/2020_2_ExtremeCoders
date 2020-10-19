export default class Router {
    constructor() {
        this.registeredPathes = {}
        window.onpopstate = ((event)=>{
            console.log("HISTORY EVENT", event);
            this.go(event.state.path, event.state.data);
        })
    }

    register(path, view) {
        this.registeredPathes[path] = view;
        // view.on('goToPath', (path) => {
        //         this.emit("")
        //     }
        // )
        // view.on('goBack', ()=>{
        //     this.back();
        // })
    }

    // запустить роутер
    start(path, data) {
        window.history.pushState({path:path, data:data}, 'Start', path);
        // this.on('goToPath', (path, data) => {
        //     console.log('GO TO PATH', path);
        //     this.go(path, data);
        // });
        this.registeredPathes[path].render(data);
    }

    go(path, data) {
        // window.history.pushState({path:path, data:data}, 'HZ', path);
        this.registeredPathes[path].render(data);
        window.history.pushState({path:path, data:data}, path, path);
    }

    back(){
        window.history.back();
    }


}