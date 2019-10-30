class EventQueue {
    tree;

    constructor() {
        this.tree = new BinarySearchTree();
        this.tree.compare = sortOnYThenOnX;
    }

    empty() {
        return this.tree.root == null;
    }

    queue(p, seg) {
        return this.tree.put(p, seg);
    }

    dequeue() {
        let node = this.tree.min();
        this.tree.delete(node);
        return node;
    }

}

// Find the intersections for a set S of line segments
// in the plane. Returns the set of intersection points
// among the segments in S, with for each intersection point
// the segments that contain it.
let findIntersections = function(S) {

    let intermediateSteps = [];

    let Q = new EventQueue();

    for(let s of S) {
        Q.queue(s.p1);
        Q.queue(s.p2);
    }

    while(!Q.empty()) {
        let p = Q.dequeue();
        intermediateSteps.push(p);
    }


    return intermediateSteps;
}