function b = num2bin(x, split)
%NUM2BIN Binary representation of floating point number

% Per-Olof Persson, UC Berkeley <persson@berkeley.edu>

t = dec2bin(0:15);
h = num2hex(x);
b = t(hex2dec(h') + 1, :)';
b = b(:)';

if nargin < 2 | split
    switch length(b)
      case 32
        b = [b(1),' ',b(2:9),' ',b(10:32)];
      case 64
        b = [b(1),' ',b(2:12),' ',b(13:64)];
      otherwise
        error('Unknown format.');
    end
end
