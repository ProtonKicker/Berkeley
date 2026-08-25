% Numerical Differentiation Demo - Find optimal h for central differencing

% For f = exp(x), approximate f'(0) = exp(0) = 1 using various h
hs = 10.^(-15:0.1:0);
es = [];
for h = hs
    df = (exp(h) - exp(-h)) / (2*h);  % Numerical differentiation
    df0 = 1;                          % Exact derivative
    e = abs(df - df0);                % Error
    es(end+1) = e;                    % Store error
end
loglog(hs,es), grid on

% Predict optimal h = (3*epsilon/M)^(1/3) (see textbook and lecture slides)
h = (3*1e-16/1) ^ (1/3)
