function p = fixedpoint(g, p0, tol)
% Solve g(p) = p using fixed-point iteration.

while 1
    p = g(p0);
    if abs(p-p0) < tol, break; end
    p0 = p;
end
