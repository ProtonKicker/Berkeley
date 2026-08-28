a=1
b=a+1

x = 0:0.1:50
y = a .* x .^ 3  + b
y = y .* 0.1
y = sin (y)

plot(x,y)
grid on
%legend yes
