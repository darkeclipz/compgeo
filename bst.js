// Binary Search Tree Data Structure
class BinarySearchTree {
    root;
    compare;

    size(node) {
        if(node == null) return 0;
        else             return node.N;
    }

    _get(node, key) {
        if(node == null) return null;
        let cmp = this.compare(key, node.key);
        if (cmp < 0) return this._get(node.left, key);
        else if (cmp > 0) return this._get(node.right, key);
        else return node.value;
    }

    get(key) {
        this.root = this._get(this.root, key);
    }

    _put(node, key, value) {
        if(node == null) return new Node(key, value, 1);
        let cmp = this.compare(key, node.key);
        if (cmp < 0) node.left = this._put(node.left, key, value);
        else if (cmp > 0) node.right = this._put(node.right, key, value);
        else node.value = value;
        node.N = this.size(node.left) + this.size(node.right) + 1;
        return node;
    }

    put(key, value) {
        this.root = this._put(this.root, key, value);
    }

    _min(node) {
        if (node.left == null) return node;
        return this._min(node.left);
    }

    min() {
        return this._min(this.root).key;
    }

    _deleteMin(node) {
        if (node.left == null) return node.right;
        node.left = this._deleteMin(node.left);
        node.N = this.size(node.left) + this.size(node.right) + 1;
        return node;
    }

    deleteMin() {
        this.root = this._deleteMin(this.root);
    }

    _delete(node, key) {
        if (node == null) return null;
        let cmp = this.compare(key, node.key);
        if (cmp < 0) node.left = this._delete(node.left, key);
        else if (cmp > 0) node.right = this._delete(node.right, key);
        else {
            if (node.left == null) return node.right;
            if (node.right == null) return node.left;
            let t = node;
            node = this._min(t.right);
            node.right = this._deleteMin(t.right);
            node.left = t.left;
        }
        node.N = this.size(node.left) + this.size(node.right) + 1
        return node;
    }

    delete(key) {
        this.root = this._delete(this.root, key);
    }
}

let sort2TupleLexicographical = function (a, b) {
    return a.x - b.x || a.y - b.y;
} 

let sortOnYThenOnX = function (a, b) {
    return a.y - b.y || a.x - b.x;
} 

class Node {
    key;
    value;
    left;
    right;
    N;

    constructor(key, value, N) {
        this.key = key;
        this.value = value;
        this.N = N;
    }
}

let DepthFirstOrder = function* (BST) {
    let stack = [BST.root];
    while(stack.length > 0) {
        let node = stack.pop();
        if(node.right != null) stack.push(node.right);
        if(node.left != null) stack.push(node.left);
        yield node;
    }
}