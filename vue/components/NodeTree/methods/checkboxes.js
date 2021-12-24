export const checkboxMethods = {
  checkboxHandler(event, params) {
    const checkedValue = !params.node.checked
    this.setCheckboxValuesToNodeChildren(params.node, checkedValue)

    if(!params.node.parentNode) {
      return
    }

    this.updateParentValue(params.node.parentNode)
  },
  setCheckboxValuesToNodeChildren(node, checkedValue) {
    node.checked = checkedValue

    if(!node.children.length) {
      return
    }

    node.children.forEach((child) => {
      this.setCheckboxValuesToNodeChildren(child, checkedValue)
    })
  },
  updateParentValue(node) {
    node.checked = node.children.every((child) => child.checked)
    if(!node.parentNode) {
      return
    }
    this.updateParentValue(node.parentNode)
  }
}
