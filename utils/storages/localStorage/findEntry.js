import { isObject } from "../../validation";

/**
 * Helps to find any entry (by object key name) in the Local Storage recursively
 * @param entry
 * @return {{entries: *[], failedParse: {}}}
 */
export const findEntry = (entry) => {
  const DEFAULT_VALUES = {
    failedParse: {},
    entries: []
  }
  if(!localStorage) {
    console.error("LocalStorage is not defined!")
    return DEFAULT_VALUES
  }
  if(!entry) return DEFAULT_VALUES

  const storage = new Map()
  const failedParse = {}
  const foundEntries = []

  /**
   * Tries to parse storage item and save it to local variable
   * @param item
   * @param destination
   * @param failedParse
   * @return {*}
   */
  function parseStorageItem(item, destination, failedParse) {
    const [ key, value ] = item

    if(value === '') {
      return destination.set(key, value)
    }

    try {
      const parsedValue = JSON.parse(value)
      destination.set(key, parsedValue)
    }  catch (error) {
      failedParse[key] = value
    }
  }

  /**
   * Detect entity type
   * @param entity
   * @return {string}
   */
  function detectType(entity) {
    if(isObject(entity)) {
      return "object"
    }
    if(Array.isArray(entity)) {
      return "array"
    }
    return "primitive"
  }

  /**
   * Get list of handlers for each action types
   * @return {{array: array, object: object}}
   */
  function getTypesActions() {
    return {
      object: (value) => {
        Object.entries(value).forEach((currentEntry) => {
          const [ key, value ] = currentEntry
          handleStorageItem(value, key)
        })
      },
      array: (value) => {
        value.forEach(handleStorageItem)
      },
    }
  }

  /**
   * Tries to execute action for type
   * @param type
   * @param value
   * @param key
   */
  function handleType(type, value, key) {
    const actions = getTypesActions()
    if(!actions[type]) {
      return
    }
    actions[type](value, key)
  }

  /**
   * Check item for equality and proceed searching recursively
   * @param value
   * @param key
   */
  function handleStorageItem(value, key) {
    if(key === entry) {
      foundEntries.push({ [key]: value })
    }
    const type = detectType(value)
    handleType(type, value, key)
  }

  /**
   * Starts handling items through storage
   * @param entry
   * @param storage
   */
  function find(entry, storage) {
    storage.forEach(handleStorageItem)
  }

  /**
   * Fill local variable with storage items
   */
  function fillStorage(storage, failedParse) {
    Object.entries(localStorage).forEach(storageItem => parseStorageItem(storageItem, storage, failedParse))
  }

  fillStorage(storage, failedParse)
  find(entry, storage)

  return {
    failedParse,
    entries: foundEntries
  }
}
