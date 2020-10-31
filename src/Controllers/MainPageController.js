import {Paths, Events} from "../Constants.js";
import {globalEventBus} from "../EventBus.js";

export default class MainPageController {
    constructor() {

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
            console.log("CONTROLLER SSSSSSSSSUKA")
            if(!this.data){
                console.log("WTF")
            }
            if (!this.data['letterList']) {
                globalEventBus.emit(Events.mainPageController.needGetLetterList);
            }
            if (!this.data['letter']) {

                globalEventBus.emit(Events.mainPageController.needGetLetter);
            }
            if (!this.data['folderList']) {
                globalEventBus.emit(Events.mainPageController.needGetFolderList);
            }
        });
    }

    _allDataIsReady(){
        if (this.data['letter'] && this.data['folderList'] && this.data['letterList']) {
            globalEventBus.emit(Events.global.redirect, {path: Paths.letters, data: this.data})
        }
    }
}