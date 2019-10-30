// Calculate a 2x2 determinant.
Math.det2 = function(a,b,c,d) {
    return a * d - b * c;
}

// Determines if the three points are a right turn.
let isRightTurn = function(p1, p2, p3) {
    // For three points P1 = (x1, y1), P2 = (0, 0), P3 = (x3, y3), the 
    // points are in a right turn if sign of det(x1, y1, x3, y3) is positive.
    // (Subtract P2 from P1, P2, and P3, so P2 = (0, 0).)
    return Math.det2(p1.x - p2.x, p1.y - p2.y, p3.x - p2.x, p3.y - p2.y) >= 0;
}

// Calculate the Convex Hull for a set P of points in the plane.
// Returns a list containing vertices of CH(P) in clockwise order.
let convexHull = function(P) {

    let n = P.length;
    let intermediateSteps = []; // Used for the animation.

    // Sort the points by x-coordinate, resulting in a sequence p1, p2, ...,pn.
    P.sort(function(a,b) { return a.x < b.x ? -1 : 1; });

    // Put the points p1 and p2 in a list L_upper, with p1 as the first point.
    let L_upper = [P[0], P[1]];

    for(var i=2; i < n; i++) {

        // Append p_i to L_upper.
        L_upper.push(P[i]);

        // While L_upper contains more than 2 points and the last three points
        // in L_upper do not make a right turn.
        while(L_upper.length > 2 && !isRightTurn(L_upper[L_upper.length - 3], 
                                                 L_upper[L_upper.length - 2], 
                                                 L_upper[L_upper.length - 1])) {

            intermediateSteps.push(L_upper.slice());

            // Remove the middle of the last three points from L_upper.
            L_upper.splice(L_upper.length - 2, 1);
        }
    }

    // Put the points p_n and p_n-1 in a list L_lower with p_n as the first point.
    let L_lower = [P[n - 1], P[n - 2]];

    for(var i = n - 3; i >= 0; i--) {

        // Append p_i to L_lower.
        L_lower.push(P[i]);

        // While L_lower contains more than 2 points, and the last
        // three points in L_lower do not make a right turn.
        while(L_lower.length > 2 && !isRightTurn(L_lower[L_lower.length - 3], 
                                                 L_lower[L_lower.length - 2], 
                                                 L_lower[L_lower.length - 1])) {
            
            intermediateSteps.push(L_upper.concat(L_lower.slice()));

            // Remove the middle of the last three points from L_lower.
            L_lower.splice(L_lower.length - 2, 1);    
        }
    }

    // Remove the last point from L_lower to avoid duplication of
    // the points where the upper and the lower hull meet.
    L_lower.splice(L_lower.length - 1, 1);

    // Append L_lower to L_upper and call the resulting list L.
    let L = L_upper.concat(L_lower);

    console.log('CH(P)', L);

    return { CH: L, steps: intermediateSteps };
}