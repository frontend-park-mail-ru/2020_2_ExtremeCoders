class EventBus {
    /**
     * Подписаться на событие, использование:
     * menu.on('select', function(item) { ... }
     */
    on(eventName, handler) {
        // console.log("ON", eventName, handler, "EB", this);
        if (!this._eventHandlers) this._eventHandlers = {};
        if (!this._eventHandlers[eventName]) {
            this._eventHandlers[eventName] = [];
        }
        this._eventHandlers[eventName].push(handler);
        return this;
    }

    /**
     * Отменить подписку, использование:
     * menu.off('select', handler)
     */
    off(eventName, handler) {
        let handlers = this._eventHandlers && this._eventHandlers[eventName];
        if (!handlers) return;
        for (let i = 0; i < handlers.length; i++) {
            if (handlers[i] === handler) {
                handlers.splice(i--, 1);
            }
        }
    }

    /**
     * Сгенерировать событие с указанным именем и данными
     * this.emit('select', data1, data2);
     */
    emit(eventName, ...args) {
        console.log('EMIT', eventName, args);
        if (!this._eventHandlers || !this._eventHandlers[eventName]) {
            return; // обработчиков для этого события нет
        }
        // вызовем обработчики
        this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
    }
}

let globalEventBus = new EventBus();
export {globalEventBus}