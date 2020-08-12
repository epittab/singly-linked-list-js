class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // add
    unshift(value) {
        let newNode = new Node(value);
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else { 
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }

    push(value) {
        let newNode = new Node(value);
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else { 
            let oldTail = this.tail
            this.tail = newNode;
            oldTail.next = newNode;
        }
        this.length++;
        return this;
    }

    set(index, value) {
        if (index < 0 || index >= this.length) return undefined;
        let newNode = new Node(value);
        let oldNode;
        
        if (index === 0) {
            oldNode = this.traverse(index);
            this.head = newNode;
        } else {
            let prevNode = this.traverse(index - 1);
            oldNode = prevNode.next;
            prevNode.next = newNode;
        }
        newNode.next = oldNode.next;
        if (index === this.length-1) { this.tail = newNode } 
        return oldNode;
    }

    insert(index, value) {
        if (index < 0 || index > this.length) return false;

        let newNode = new Node(value);
        let oldNode;

        if (index === 0) {
            return this.unshift(value);
        } else if (index === this.length) {
            return this.push(value);
        } else {
            let prevNode = this.traverse(index - 1);
            oldNode = prevNode.next;
            prevNode.next = newNode;
        }

        newNode.next = oldNode;
        this.length++;
        return this;
    }

    // remove

    shift(){
        if (this.length === 0) return undefined;
        if (this.length === 1) {
            this.tail = null;
        } 
        let oldHead = this.head;
        this.head = oldHead.next;
        this.length--;
        if (this.length === 1) {
            this.tail = this.head;
        }
        return oldHead;

    }

    pop(){
        if (this.length === 0) return undefined;
        let oldTail;
        if (this.length === 1) {
            oldTail = this.tail;
            this.head = null;
            this.tail = null;
        } else {
            let newTail = this.traverse(this.length - 2)
            oldTail = newTail.next;
            newTail.next = null;
            this.tail = newTail;
        }
        this.length--;
        if (this.length === 1) {
            this.head = this.tail
        }
        return oldTail;
    }

    remove(index){
        if (index < 0 || index >= this.length) return undefined;
        let deleteNode;
        if (index === 0) {
            deleteNode = this.shift()
        } else if (index === this.length - 1) {
            deleteNode = this.pop()
        } else {
            let prevNode = this.traverse(index-1)
            deleteNode = prevNode.next
            prevNode.next = deleteNode.next;   
            this.length--;
        }
        return deleteNode;
    } 

    //read

    get(index){
        if (index < 0 || index >= this.length) return undefined;
        return this.traverse(index);
    }

    reverse(){
        if (this.length === 0) return undefined;
        if (this.length === 1) return this;
        
        let currentNode = this.head;
        this.head = this.tail;
        this.tail = currentNode;

        let prevNode = null;
        let nextNode;
        let i = 0;
        while (i < this.length) {
           
            nextNode = currentNode.next;
            currentNode.next = prevNode;
            prevNode = currentNode;
            currentNode = nextNode;

            i++;
        }
        return this;
    }

    //helpers

    traverse(position) {
        if (position < 0 || position >= this.length) return undefined;
        let i = 0;
        let currentNode = this.head;
        while (i < position) {
            currentNode = currentNode.next;
            i++;
        }
        return currentNode;
    }

}