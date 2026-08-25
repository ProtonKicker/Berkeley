function J = simpsondouble(f, c, d, a, b, m, n)
%SIMPSONDOUBLE Algorithm 4.4 in Burden/Faires
%   J = SIMPSONDOUBLE(F, C, D, A, B, M, N) where F,C,D are functions,
%   A,B are the endpoints, and M,N are postive integers

h = (b-a) / n;
J1 = 0; J2 = 0; J3 = 0;
for i = 0:n
    x = a + i*h;
    HX = (d(x) - c(x)) / m;
    K1 = f(x,c(x)) + f(x,d(x));
    K2 = 0;
    K3 = 0;
    for j = 1:m-1
        y = c(x) + j*HX;
        Q = f(x,y);
        if mod(j,2) == 0    % j even
            K2 = K2 + Q;
        else                % j odd
            K3 = K3 + Q;
        end
    end
    L = (K1 + 2*K2 + 4*K3) * HX/3;
    if i == 0 || i == n     % end points
        J1 = J1 + L;
    elseif mod(i,2) == 0    % i even
        J2 = J2 + L;
    else                    % i odd
        J3 = J3 + L;        
    end
end
J = h*(J1 + 2*J2 + 4*J3) / 3;
