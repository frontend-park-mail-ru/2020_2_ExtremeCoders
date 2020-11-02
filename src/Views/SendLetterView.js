import {Events, Paths} from "../Constants.js";
import {globalEventBus} from "../EventBus.js";
import {template as tmp} from "./PugTemplates/SendLetterForm.js"
import Navbar from "./NavbarView.js";

export  default class SendLetterView{
    constructor(element) {
        this.element = element;
    }

    render(data){
        data = data || {}
        console.log("SEND LETTER VIEW RENDER");
        this.element.innerHTML = '';
        Navbar.render(data.navbar)
        this.element.innerHTML += tmp(data);
    }

}