import { Events, Paths } from '../Constants.js';
import globalEventBus from '../EventBus.js';
import validator from './Validator.js';
import myFetch from './myFetch.js';

export default class LetterModel {
  constructor() {
    this.Letters = new Map();
    this.folders = {};
    this.isNeedToPag = false;
    globalEventBus.on(Events.mainPageController.needGetLetter, this.getLetter.bind(this));
    globalEventBus.on(Events.sendLetterView.sendLetter,
      LetterModel.sendLetter.bind(this));
    globalEventBus.on(Events.global.logout, this.logout.bind(this));
    globalEventBus.on(Events.mainPageController.recivedFolder, this.recivedFolder.bind(this));
    globalEventBus.on(Events.mainPageController.sendedFolder, this.sendedFolder.bind(this));
    globalEventBus.on(Events.mainPageController.selectFolder, this.selectFolder.bind(this));
    globalEventBus.on(Events.mainPageController.recivedUn, this.recivedUn.bind(this));
    globalEventBus.on(Events.mainPageController.sendedUn, this.sendedUn.bind(this));
    globalEventBus.on(Events.mainPageController.addFolderRecived, this.addFolderRecived.bind(this));
    globalEventBus.on(Events.mainPageController.addFolderSended, this.addFolderSended.bind(this));
    globalEventBus.on(Events.mainPageController.sendWrittenLetter,
      this.sendWrittenLetter.bind(this));
    globalEventBus.on(Events.mainPageController.inFolder, this.inFolder.bind(this));

    globalEventBus.on(Events.mainPageController.renameFolder, this.renameFolder.bind(this));
    globalEventBus.on(Events.mainPageController.deleteFolder, this.deleteFolder.bind(this));
    globalEventBus.on(Events.mainPageController.deleteLetter, this.deleteLetter.bind(this));
    globalEventBus.on(Events.mainPageController.startSearch, this.startSearch.bind(this));
    globalEventBus.on(Events.mainPageController.resultSearch, this.resultSearch.bind(this));
    globalEventBus.on(Events.mainPageController.spamUn, this.spamUn.bind(this));
    globalEventBus.on(Events.mainPageController.trashUn, this.trashUn.bind(this));
    globalEventBus.on(Events.mainPageController.inSpam, this.inSpam.bind(this));
    globalEventBus.on(Events.mainPageController.inBox, this.inBox.bind(this));
    globalEventBus.on(Events.mainPageController.unWatched, this.unWatched.bind(this));
  }

  getLetter(letterId) {
    globalEventBus.emit(Events.letterModelEvents.getLetter.success, this.Letters[letterId]);
  }

  static sendLetter(data) {
    const errors = validator.checkLetterForm(data);
    if (Object.keys(errors).length !== 0) {
      globalEventBus.emit(Events.letterModelEvents.sendLetter.fail,
        errors);
      return;
    }
    myFetch(Paths.sendMessageToServ, 'POST', data)
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          globalEventBus.emit(Events.letterModelEvents.sendLetter.success);
        } else {
          globalEventBus.emit(Events.letterModelEvents.sendLetter.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        console.log('Fetch error', error);
      });
  }

  recivedFolder() {
    myFetch(Paths.getRecivedFolder, 'GET')
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          this.recivedFolders = new Map();
          if (response.Folders) {
            response.Folders.forEach((folder) => {
              this.recivedFolders[folder.Name] = folder;
            });
          }
          globalEventBus.emit(Events.letterModelEvents.recivedFolder.success, this.recivedFolders);
        } else {
          globalEventBus.emit(Events.letterModelEvents.recivedFolder.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        globalEventBus.emit(Events.letterModelEvents.recivedFolder.fail, {
          error,
        });
      });
  }

  sendedFolder() {
    myFetch(Paths.getSendedFolder, 'GET')
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          this.sendedFolders = new Map();
          if (response.Folders) {
            response.Folders.forEach((folder) => {
              this.sendedFolders[folder.Name] = folder;
            });
          }

          globalEventBus.emit(Events.letterModelEvents.sendedFolder.success, this.sendedFolders);
        } else {
          globalEventBus.emit(Events.letterModelEvents.sendedFolder.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        globalEventBus.emit(Events.letterModelEvents.sendedFolder.fail, {
          error,
        });
      });
  }

  selectFolder(folder, type, offset) {
    this.offset = offset;
    myFetch(Paths.getSelectFolder + '/' + type + '/' + folder + '/' + '5' + '/' + this.offset.toString(), 'GET')
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          this.selectFolder = [];
          if (response.Letter) {
            response.Letter.forEach((letter) => {
              this.selectFolder.push(letter);
            });
          }

          myFetch(Paths.getSelectFolder + '/' + type + '/' + folder + '/' + '5' + '/' + (this.offset + 5).toString(), 'GET')
            .then((res) => res.json())
            .then((res) => {
              if (res.Code === 200) {
                if (res.Letters === null) {
                  this.isNeedToPag = false;
                } else {
                  this.isNeedToPag = true;
                }
                globalEventBus.emit(Events.letterModelEvents.selectFolder.success, this.selectFolder, this.offset, this.isNeedToPag);
              }
            });
        } else {
          globalEventBus.emit(Events.letterModelEvents.selectFolder.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        globalEventBus.emit(Events.letterModelEvents.selectFolder.fail, {
          error,
        });
      });
  }

  recivedUn(offset) {
    this.offset = offset;
    myFetch(Paths.getReceivedLetters + '5' + '/' + this.offset.toString(), 'GET')
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          this.selectFolder = [];
          if (response.Letters) {
            response.Letters.forEach((letter) => {
              this.selectFolder.push(letter);
            });
          }

          myFetch(Paths.getReceivedLetters + '5' + '/' + (this.offset + 5).toString(), 'GET')
            .then((res) => res.json())
            .then((res) => {
              if (res.Code === 200) {
                if (res.Letters === null) {
                  this.isNeedToPag = false;
                } else {
                  this.isNeedToPag = true;
                }
                globalEventBus.emit(Events.letterModelEvents.recivedUn.success, this.selectFolder, this.offset, this.isNeedToPag);
              }
            });

        } else {
          globalEventBus.emit(Events.letterModelEvents.recivedUn.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        globalEventBus.emit(Events.letterModelEvents.recivedUn.fail, {
          error,
        });
      });
  }

  sendedUn(offset) {
    this.offset = offset;
    myFetch(Paths.getSendedLetters + '5' + '/' + this.offset.toString(), 'GET')
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          this.selectFolder = [];
          if (response.Letters) {
            response.Letters.forEach((letter) => {
              this.selectFolder.push(letter);
            });
          }

          myFetch(Paths.getSendedLetters + '5' + '/' + (this.offset + 5).toString(), 'GET')
            .then((res) => res.json())
            .then((res) => {
              if (res.Code === 200) {
                if (res.Letters === null) {
                  this.isNeedToPag = false;
                } else {
                  this.isNeedToPag = true;
                }
                globalEventBus.emit(Events.letterModelEvents.sendedUn.success, this.selectFolder, this.offset, this.isNeedToPag);
              }
            });
        } else {
          globalEventBus.emit(Events.letterModelEvents.sendedUn.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        globalEventBus.emit(Events.letterModelEvents.sendedUn.fail, {
          error,
        });
      });
  }

  addFolderRecived(name) {
    myFetch(Paths.addFolderRecived, 'POST', name)
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          globalEventBus.emit(Events.letterModelEvents.addFolderRecived.success);
        } else {
          globalEventBus.emit(Events.letterModelEvents.addFolderRecived.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        console.log('Fetch error', error);
      });
  }

  addFolderSended(name) {
    myFetch(Paths.addFolderSended, 'POST', name)
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          globalEventBus.emit(Events.letterModelEvents.addFolderSended.success);
        } else {
          globalEventBus.emit(Events.letterModelEvents.addFolderSended.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        console.log('Fetch error', error);
      });
  }

  sendWrittenLetter(letterId) {
    myFetch(Paths.sendWrittenLetter, 'PUT', letterId)
      .then(() => globalEventBus.emit(Events.letterModelEvents.sendWrittenLetter.success, letterId))
      .catch((error) => {
        console.log('Fetch error', error);
      });
  }

  inFolder(data, folder) {
    let method = 'DELETE';
    if (!folder) {
      folder = 'folderName';
      method = 'PUT';
    }
    myFetch(Paths.inFolder + 'received/' + folder + '/letter', method, data)
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          globalEventBus.emit(Events.letterModelEvents.inFolder.success, method);
        } else {
          globalEventBus.emit(Events.letterModelEvents.inFolder.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        console.log('Fetch error', error);
      });
  }

  renameFolder(newName) {
    myFetch(Paths.renameFolder, 'PUT', newName)
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          globalEventBus.emit(Events.letterModelEvents.renameFolder.success);
        } else {
          globalEventBus.emit(Events.letterModelEvents.renameFolder.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        console.log('Fetch error', error);
      });
  }

  deleteFolder(deleteName) {
    myFetch(Paths.deleteFolder, 'DELETE', deleteName)
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          globalEventBus.emit(Events.letterModelEvents.deleteFolder.success);
        } else {
          globalEventBus.emit(Events.letterModelEvents.deleteFolder.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        console.log('Fetch error', error);
      });
  }

  deleteLetter(deleteName) {
    myFetch(Paths.deleteLetter, 'DELETE', deleteName)
      .then(() => globalEventBus.emit(Events.letterModelEvents.deleteLetter.success, deleteName))
      .catch((error) => {
        console.log('Fetch error', error);
      });
  }

  startSearch(similar) {
    myFetch(Paths.startSearch + similar, 'GET')
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          this.searchResult = {};
          this.searchResult.res = true;
          this.searchResult.is = true;
          if (response.Senders) {
            this.searchResult.Senders = response.Senders;
          }
          if (response.Receivers) {
            this.searchResult.Receivers = response.Receivers;
          }
          if (response.Themes) {
            this.searchResult.Themes = response.Themes;
          }
          if (response.Texts) {
            this.searchResult.Texts = response.Texts;
          }
          if (!response.Senders && !response.Receivers && !response.Themes && !response.Texts) {
            this.searchResult.is = false;
          }
          globalEventBus.emit(Events.letterModelEvents.startSearch.success, this.searchResult, similar);
        } else {
          globalEventBus.emit(Events.letterModelEvents.startSearch.fail);
        }
      })
      .catch((error) => {
        globalEventBus.emit(Events.letterModelEvents.startSearch.fail, {
          error,
        });
      });
  }

  resultSearch(what, value, offset) {
    myFetch(Paths.resultSearch + what + '/' + value + '/5/' + offset.toString(), 'GET')
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          this.selectFolder = [];
          if (response.Letters) {
            response.Letters.forEach((letter) => {
              this.selectFolder.push(letter);
            });
          }

          myFetch(Paths.resultSearch + what + '/' + value + '/5/' + (offset + 5).toString(), 'GET')
            .then((res) => res.json())
            .then((res) => {
              if (res.Code === 200) {
                if (res.Letters === null) {
                  this.isNeedToPag = false;
                } else {
                  this.isNeedToPag = true;
                }
                globalEventBus.emit(Events.letterModelEvents.resultSearch.success, this.selectFolder, offset, this.isNeedToPag);
              }
            });
        } else {
          globalEventBus.emit(Events.letterModelEvents.resultSearch.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        globalEventBus.emit(Events.letterModelEvents.resultSearch.fail, {
          error,
        });
      });
  }

  spamUn(offset) {
    myFetch(Paths.resultSearch + 'spam/true' + '/5/' + offset.toString(), 'GET')
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          this.selectFolder = [];
          if (response.Letters) {
            response.Letters.forEach((letter) => {
              this.selectFolder.push(letter);
            });
          }

          myFetch(Paths.resultSearch + 'spam/true' + '/5/' + (offset + 5).toString(), 'GET')
            .then((res) => res.json())
            .then((res) => {
              if (res.Code === 200) {
                if (res.Letters === null) {
                  this.isNeedToPag = false;
                } else {
                  this.isNeedToPag = true;
                }
                globalEventBus.emit(Events.letterModelEvents.spamUn.success, this.selectFolder, offset, this.isNeedToPag);
              }
            });
        } else {
          globalEventBus.emit(Events.letterModelEvents.spamUn.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        globalEventBus.emit(Events.letterModelEvents.spamUn.fail, {
          error,
        });
      });
  }

  trashUn(offset) {
    myFetch(Paths.resultSearch + 'box/true' + '/5/' + offset.toString(), 'GET')
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          this.selectFolder = [];
          if (response.Letters) {
            response.Letters.forEach((letter) => {
              this.selectFolder.push(letter);
            });
          }

          myFetch(Paths.resultSearch + 'box/true' + '/5/' + (offset + 5).toString(), 'GET')
            .then((res) => res.json())
            .then((res) => {
              if (res.Code === 200) {
                if (res.Letters === null) {
                  this.isNeedToPag = false;
                } else {
                  this.isNeedToPag = true;
                }
                globalEventBus.emit(Events.letterModelEvents.trashUn.success, this.selectFolder, offset, this.isNeedToPag);
              }
            });
        } else {
          globalEventBus.emit(Events.letterModelEvents.trashUn.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        globalEventBus.emit(Events.letterModelEvents.trashUn.fail, {
          error,
        });
      });
  }

  inSpam(chooseFolderData) {
    myFetch('/api/letter/spam/set', 'PUT', chooseFolderData)
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          globalEventBus.emit(Events.letterModelEvents.inSpam.success);
        } else {
          globalEventBus.emit(Events.letterModelEvents.inSpam.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        console.log('Fetch error', error);
      });
  }

  inBox(chooseFolderData) {
    myFetch('/api/letter/box/set', 'PUT', chooseFolderData)
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          globalEventBus.emit(Events.letterModelEvents.inBox.success);
        } else {
          globalEventBus.emit(Events.letterModelEvents.inBox.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        console.log('Fetch error', error);
      });
  }

  unWatched(letterId) {
    myFetch(Paths.sendWrittenLetter, 'PUT', letterId)
      .then(() => globalEventBus.emit(Events.letterModelEvents.unWatched.success))
      .catch((error) => {
        console.log('Fetch error', error);
      });
  }

  logout() {
    this.Letters = new Map();
    this.folders = {};
  }
}
