function [allt, allw] = rkf(f, a, b, alpha, tol, hmin, hmax)
% Solve ODE y'(t) = f(t, y(t)) using Runge-Kutta-Fehlberg.

allt = a;
allw = alpha(:)';
h = hmax;
i = 1;
while 1
    w = allw(i,:);
    t = allt(i);
    k1 = h*f(t,w);
    k2 = h*f(t + h/4,     w + k1/4);
    k3 = h*f(t + 3/8*h,   w + 3/32*k1 + 9/32*k2);
    k4 = h*f(t + 12/13*h, w + 1932/2197*k1 - 7200/2197*k2 + 7296/2197*k3);
    k5 = h*f(t + h,       w + 439/216*k1 - 8*k2 + 3680/513*k3 - 845/4104*k4);
    k6 = h*f(t + h/2,     w - 8/27*k1 + 2*k2 - 3544/2565*k3 + 1859/4104*k4 - 11/40*k5);
    R = 1/h * abs(1/360*k1 - 128/4275*k3 - 2197/75240*k4 + 1/50*k5 + 2/55*k6);
    if R <= tol
        t = t+h;
        i = i+1;
        allt(i,1) = t;
        w = w + 25/216*k1 + 1408/2565*k3 + 2197/4104*k4 - 1/5*k5;
        allw(i,:) = w;
    end
    delta = 0.84*(tol/R)^(1/4);
    if delta <= 0.1
        h = 0.1*h;
    elseif delta >= 4
        h = 4*h;
    else
        h = delta*h;
    end
    if h>hmax, h = hmax; end
    if t >= b
        break;
    elseif t+h > b
        h = b-t;
    elseif h < hmin
        error('Minimum h exceeded');
    end
end
