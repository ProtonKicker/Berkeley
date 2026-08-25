function p = muller_plot(f, p0, p1, p2, niter, xmin, xmax)
% Solve f(p) = 0 using Muller's method.
% Like muller, but no convergence check (always niter iterations)
% and plotting the graph and the iterations

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
    
    xx = linspace(xmin,xmax,1000);
    plot(xx,f(xx), 'linewidth',2)
    line([xmin,xmax], [0,0], 'linewidth',2, 'color','b');
    grid on
    line([p0,p1,p2], f([p0,p1,p2]), 'linestyle','none', 'marker','.', 'color','r');
    pause(1)
    line(xx,polyval(polyfit([p0,p1,p2], f([p0,p1,p2]),2),xx), 'linewidth',2,'color','g');
    pause(1);
    line(p,f(p), 'marker','.', 'color','b');
    pause(1);
    
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
