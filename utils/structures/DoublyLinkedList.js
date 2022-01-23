class DoublyLinkedList {
  constructor() {
    this.head = null;
  }

  createNode(data) {
    return {
      next: null,
      prev: null,
      data: data,
    };
  }

  addNode(data) {
    const newNode = this.createNode(data);

    if (this.head !== null) {
      let node = this.head;
      while (node.next !== null) {
        node = node.next;
      }
      newNode.prev = node;
      node.next = newNode;
      return this.head;
    }

    this.head = newNode;
    return this.head;
  }
}

function getChildren(list, data) {
  const { children, ...node } = data;
  list.addNode(node);

  if (data.children.length) {
    getChildren(list, data.children[0]);
  }
}

const data = {
  id: 1,
  name: "Name 1",
  children: [
    {
      id: 2,
      name: "Name 2",
      children: [
        {
          id: 3,
          name: "Name 3",
          children: [
            {
              id: 4,
              name: "Name 5",
              children: [],
            },
          ],
        },
      ],
    },
  ],
};

const list = new DoublyLinkedList();
getChildren(list, data);
console.log("List", list);
