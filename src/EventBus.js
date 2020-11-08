class EventBus {
  /* eslint no-underscore-dangle: 0 */
  /**
   * Подписаться на событие, использование:
   * menu.on('select', function(item) { ... }
   */
  on(eventName, handler) {
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
    const handlers = this._eventHandlers?.[eventName].filter((value) => value !== handler);
    this._eventHandlers[eventName] = handlers;
  }

  /**
   * Сгенерировать событие с указанным именем и данными
   * this.emit('select', data1, data2);
   */
  emit(eventName, ...args) {
    console.log('EMIT', eventName, args);
    if (!this._eventHandlers || !this._eventHandlers[eventName]) {
      return;
    }
    this._eventHandlers[eventName].forEach((handler) => handler(...args));
  }
}

export default new EventBus();
