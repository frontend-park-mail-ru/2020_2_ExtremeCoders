import {Paths, Events} from "../Constants.js";
import {globalEventBus} from "../EventBus.js";

export default class MainPageController {
    constructor(MainPageView) {

        this.mainPageView = MainPageView;
        this.data = {}
        globalEventBus.on(Events.letterModelEvents.getLetter.success, (data) => {
            this.data['letter'] = data;
            this._allDataIsReady();
        });

        globalEventBus.on(Events.letterModelEvents.getLetterList.success, (data) => {
            this.data['letterList'] = data;
            this._allDataIsReady();
        });

        globalEventBus.on(Events.letterModelEvents.getFolderList.success, (data) => {
            this.data['folderList'] = data;
            this._allDataIsReady();
        })

        globalEventBus.on(Events.mainPageView.needData, () => {
            let flag = true;
            if(!this.data){
                console.log("WTF")
                flag = false;
            }
            if (!this.data['letterList']) {
                globalEventBus.emit(Events.mainPageController.needGetLetterList);
                flag = false;
            }
            if (!this.data['letter']) {
                flag = false;
                globalEventBus.emit(Events.mainPageController.needGetLetter);
            }
            if (!this.data['folderList']) {
                flag = false;
                globalEventBus.emit(Events.mainPageController.needGetFolderList);
            }
            if(flag){
                this._allDataIsReady();
            }
        });
    }

    _allDataIsReady(){
        if (this.data['letter'] && this.data['folderList'] && this.data['letterList']) {
            console.log("ALL DATA IS READY")
            this.mainPageView.render(this.data)
        }
    }
}