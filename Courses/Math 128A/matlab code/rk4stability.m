[hlr,hli] = meshgrid(-5:0.1:2, -3:0.1:3);
hl = hlr + sqrt(-1)*hli;
f = abs(1 + hl + hl.^2/2 + hl.^3/6 + hl.^4/24) - 1;
contourf(hlr,hli,f,[-inf,eps,inf],'k'), axis equal, grid on
