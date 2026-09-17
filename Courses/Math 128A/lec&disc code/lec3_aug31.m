function sn = compute_s(n)
% compute 1/1 + 1/2.... 1/n
    sn = 0;
    for k = 1:n
        sn = sn + 1/k; 
    end
end