import { isObject } from "./validation";

/**
 * Helps to find any entry (by object key name) in the Local Storage recursively
 * @return {Set<any>}
 * @param options
 */
const findEntry = (options =
  {
    target: {},
    entry: "",
    searchBy: "key" || "value",
  }
) => {
  const isObject = (object) => {
    return typeof object === 'object' &&
      !Array.isArray(object) &&
      object !== null;
  }

  const { target } = options;
  const DEFAULT_RESULT_VALUES = {
    entries: []
  }
  if(!target) {
    console.error("Target is falsy")
    return DEFAULT_RESULT_VALUES
  }


  const { entry, searchBy } = options;
  const entries = new Set();

  /**
   * Detect type
   * @param target
   * @return {string}
   */
  function detectType(target) {
    if (isObject(target)) {
      return "object"
    }
    if (Array.isArray(target)) {
      return "array"
    }
    return "primitive"
  }

  function compareBy(searchBy, key, value, entry) {
    if (searchBy === "key") {
      return key === entry
    }
    if (searchBy === "value") {
      return value === entry
    }
    console.error(`searchBy parameter doesn't equal any option`)
    return false
  }

  /**
   * Get list of handlers for each action types
   * @return {{primitive: primitive, array: array, object: object}}
   */
  function getTypesActions() {
    return {
      object: (item) => {
        Object.entries(item).forEach((currentEntry) => {
          const [ key, value ] = currentEntry

          const isEquals = compareBy(searchBy, key, value, entry)
          if(isEquals) {
            entries.add({
              value: entry,
              path: "",
            })
          }

          handleItem(value)
        })
      },
      array: (item) => {
        item.forEach(handleItem)
      },
      primitive: (item) => {
        if(searchBy === "key") return

        const isEquals = compareBy(searchBy, null, item, entry)
        if(isEquals) {
          entries.add({
            value: entry,
            path: "",
          })
        }
      }
    }
  }

  /**
   * Tries to execute action for type
   * @param type
   * @param item
   */
  function handleType(type, item) {
    const actions = getTypesActions()
    if(!actions[type]) {
      return console.error(`Action ${type} not found for type: "${type}"`)
    }
    actions[type](item)
  }

  /**
   * Tries to execute action for type
   * @param item
   */
  function handleItem(item) {
    const type = detectType(item)
    handleType(type, item)
  }

  handleItem(target)

  return entries
}

const target = {
  name: "Nick",
  payment: {
    date: "111111",
    cards: [
      {
        number: "222222"
      }
    ]
  },
  products: [
    {
      id: 1,
      images: [
        {
          src: "https://1"
        },
        {
          src: "https://2"
        }
      ]
    },

    {
      id: 2,
      images: [
        {
          src: "https://21"
        },
        {
          src: "https://22"
        }
      ]
    }
  ]
}

const options = {
  target,
  entry: "images",
  searchBy: "key"
}

const entries = findEntry(options)

console.log("entries", entries)
