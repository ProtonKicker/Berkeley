function [y, z] = horner(a, x0)
% Evaluate polynomial:
%    P(x) = a(1)x^n + a(2)x^(n-1) + ... + a(n)x + a(n+1)
% and its derivative at x0 using Horner's method.
% Outputs: y = P(x0), z = P'(x0).

n = length(a)-1;
y = a(1);
z = a(1);
for j = 2:n
    y = x0*y + a(j);
    z = x0*z + y;
end
y = x0*y + a(n+1);
