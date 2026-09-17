global c_true
c_true = 5 + 10 * randn(1);

function ydot = fun(t,y)
global c_true
ydot = zeros(2,1);
ydot(1) = y(2);
ydot(2) = -c_true * y(1) - 11 * y(2);
end

y0 = [1;1];
tspan = [0:0.1:5];
[t_true, y_true] = ode45(@fun, tspan, y0);

plot(y_true(:,1))