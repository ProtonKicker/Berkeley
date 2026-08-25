% Spline demo

% Generate some random data
x = 0:15;
y = randn(size(x));
a = y;

% Fit natural cubic spline
[b1,c1,d1] = ncspline(x, a);

% Fit clambed cubic spline with zero derivative at end points
[b2,c2,d2] = ccspline(x, a, 0, 0);

% Plot both splines
xx = linspace(x(1), x(end), 1000);
yy1 = splineeval(x, a, b1, c1, d1, xx);
yy2 = splineeval(x, a, b2, c2, d2, xx);

plot(xx,yy1, xx,yy2, x,y,'o')
