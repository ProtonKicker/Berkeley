% Richardson's Extrapolation Demo
% Forward difference approximation of f'(0) with f(x) = exp(x)

h = [1; 0.5; 0.25; 0.125];
N1 = (exp(h) - 1) ./ h
N2 = N1(2:end) + (N1(2:end) - N1(1:end-1)) / 1
N3 = N2(2:end) + (N2(2:end) - N2(1:end-1)) / 3
N4 = N3(2:end) + (N3(2:end) - N3(1:end-1)) / 7
