function p = bisection(f, a, b, tol)
% Solve f(p) = 0 using the bisection method.

while 1
    p = (a+b) / 2;
    if p-a < tol, break; end
    if f(a)*f(p) > 0
        a = p;
    else
        b = p;
    end
end
