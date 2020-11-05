import {Paths, Events} from "../Constants.js";
import {globalEventBus} from "../EventBus.js";

export default class MainPageController {
    constructor(MainPageView) {

        this.mainPageView = MainPageView;
        this.data = {}
        globalEventBus.on(Events.letterModelEvents.getLetter.success, (data) => {
            this.data['letter'] = data;
        });

        globalEventBus.on(Events.letterModelEvents.getLetterList.success, (data) => {
            this.data['letterList'] = data;
        });

        globalEventBus.on(Events.letterModelEvents.getFolderList.success, (data) => {
            this.data['folderList'] = data;
        });

        globalEventBus.on(Events.mainPageView.needData, () => {
            this.mainPageView.render(this.data)
        });

        globalEventBus.on(Events.mainPageView.selectLetter, (data) => {
            this.mainPageView.render(this.data)
        });

        globalEventBus.on(Events.letterModelEvents.sendLetter.success, ()=>{
            globalEventBus.emit(Events.global.redirect, {path:Paths.letters})
        })
    }

    _allDataIsReady() {
        if (this.data['folderList'] && this.data['letterList']) {
            console.log("ALL DATA IS READY")
        }
    }
}