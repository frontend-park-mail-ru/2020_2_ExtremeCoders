import {template} from './PugTemplates/BaseComponents/navbar.js'
import {globalEventBus} from "../EventBus.js";
import {Events, Paths} from "../Constants.js";

class NavbarView {
    constructor() {
        this.element = document.body;
    }

    render(data) {
        if(!data){
            globalEventBus.emit(Events.navbarView.needData);
            return;
        }
        this.element.innerHTML = '';
        console.log("NAVBAR VIEW RENDER", data);
        let navDiv = document.getElementById('navbar') || document.createElement('div');
        navDiv.id = 'navbar';
        navDiv.innerHTML = template(data);
        this.element.insertAdjacentHTML('beforeend', navDiv.innerHTML);

        let sendLetterHref = document.getElementsByName('navbar-send')[0];
        let profileHref = document.getElementsByName('navbar-profile')[0];
        let logoutHref = document.getElementsByName('navbar-exit')[0];
        let lettersHref = document.getElementsByName('navbar-letters')[0];

        sendLetterHref.addEventListener('click', (event) => {
            console.log('CLICK');
            event.preventDefault();
            globalEventBus.emit(Events.global.redirect, {path: Paths.sendLetter});
        })

        profileHref.addEventListener('click', (event) => {
            event.preventDefault();
            console.log('CLICK');
            globalEventBus.emit(Events.global.redirect, {path: Paths.profile});
        })

        logoutHref.addEventListener('click',(event) => {
            console.log('CLICK');
            event.preventDefault();
            globalEventBus.emit(Events.global.redirect, {path: Paths.logout});
        })

        lettersHref.addEventListener('click',(event) => {
            console.log('CLICK');
            event.preventDefault();
            globalEventBus.emit(Events.global.redirect, {path: Paths.letters});
        })
    }

    hide() {
        document.getElementById('navbar').innerHTML = '';
    }
}

let Navbar = new NavbarView();
export default Navbar;
