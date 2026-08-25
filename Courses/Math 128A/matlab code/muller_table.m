function p = muller_table(f, p0, p1, p2, niter)
% Solve f(p) = 0 using Muller's method.
% Like muller, but no convergence check (always niter iterations).

% Print header
fprintf(' n         p          |p-p2|   \n');
fprintf('-------------------------------\n');

h1 = p1 - p0;
h2 = p2 - p1;
d1 = (f(p1) - f(p0)) / h1;
d2 = (f(p2) - f(p1)) / h2;
d = (d2 - d1) / (h2 + h1);
for n = 1:niter
    b = d2 + h2*d;
    D = sqrt(b^2 - 4*f(p2)*d);
    if abs(b - D) < abs(b + D)
        E = b + D;
    else
        E = b - D;
    end
    h = -2*f(p2)/E;
    p = p2 + h;
    fprintf('%2d  %12.8f  %12.8f\n', n, p, abs(p - p2));
    p0 = p1;
    p1 = p2;
    p2 = p;
    h1 = p1 - p0;
    h2 = p2 - p1;
    d1 = (f(p1) - f(p0)) / h1;
    d2 = (f(p2) - f(p1)) / h2;
    d = (d2 - d1) / (h2 + h1);
end
