import {Paths, Events} from "../Constants.js";
import {globalEventBus} from "../EventBus.js";

export default class MainPageController{
    constructor() {
        this.data = {}
        globalEventBus.on(Events.letterModelEvents.getLetter.success, (data)=>{
            this.data['letter']=data;
            globalEventBus.emit(Events.global.redirect, Paths.letters, this.data)
        });
        globalEventBus.on(Events.letterModelEvents.getLetterList.success, (data)=>{
            this.data['letterList']=data;
            globalEventBus.emit(Events.global.redirect, Paths.letters, this.data)
        });

        globalEventBus.on(Events.letterModelEvents.getFolderList.success, (data)=>{
            this.data['folders']=data;
            globalEventBus.emit(Events.global.redirect, Paths.letters, this.data)
        })
    }
}