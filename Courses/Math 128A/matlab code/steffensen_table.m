function p = steffensen_table(g, p0, niter)
% Solve g(p) = p using Steffensen's method.
% Like steffensen, but no convergence check (always niter iterations).

% Print header
fprintf(' n         p          |p-p0|   \n');
fprintf('-------------------------------\n');

for n = 1:niter
    p1 = g(p0);
    p2 = g(p1);
    if p2 -2*p1 + p0 == 0, break; end    % Avoid divide by zero
    p = p0 - (p1-p0)^2 / (p2-2*p1+p0);
    fprintf('%2d  %12.8f  %12.8f\n', n, p, abs(p-p0));
    p0 = p;
end
