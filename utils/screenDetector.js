class ScreenDetector {
  constructor (eventBus) {
    this.eventBus = eventBus || null
    this.width = null
  }

  init () {
    window.addEventListener('resize', this.updateScreenData.bind(this))
    this.updateScreenData()
    return this
  }

  destroy () {
    window.removeEventListener('resize', this.updateScreenData)
  }

  updateScreenData () {
    this.updateScreenSize()
    this.emitUpdating()
  }

  updateScreenSize () {
    this.width = window.innerWidth
  }

  async emitUpdating () {
    if (!this.eventBus) {
      return
    }

    this.eventBus.$emit('screen-updated', this.getScreenData())
  }

  getScreenData () {
    return {
      xs: this.width <= 576,
      sm: this.width > 576 && this.width <= 768,
      fromSm: this.width > 576,
      md: this.width > 768 && this.width <= 1025,
      fromMd: this.width > 768,
      toMd: this.width < 768,
      lg: this.width > 1025 && this.width <= 1200,
      fromLg: this.width > 1025,
      toLg: this.width < 1025,
      xl: this.width > 1200 && this.width <= 1400,
      fromXl: this.width > 1200,
      toXl: this.width < 1200,
      xxl: this.width > 1400,
      toXxl: this.width < 1400
    }
  }
}

const screenDetectorInstance = new ScreenDetector(eventBus).init()

export const screenDetector = screenDetectorInstance
