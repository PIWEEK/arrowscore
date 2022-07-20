class AbstractStorageManager {
  get (key) {
    const data = this.storage.getItem(key)

    try {
      return JSON.parse(data)
    }
    catch (err) {
      return data
    }
  }
  set (key, newValue = undefined) {
    this.storage.setItem(
      key,
      JSON.stringify(newValue)
    )

    return newValue
  }
  remove (key) {
    this.storage.removeItem(key)

    return true
  }
  clear () {
    this.storage.clear()

    return true
  }
}

class LocalStorageManager extends AbstractStorageManager {
  constructor () {
    super()
    this.storage = window.localStorage
  }
}

export const localStorage = new LocalStorageManager()
