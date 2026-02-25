import numpy as np

def csv2array(csv):

    if csv == "":
        arr = np.array([], dtype = float)
        return arr

    else:
        l = csv.split(',')
        return np.array(l, dtype = float)
    
def do_operation(op = 'sum',csv=''):

    # empty csv
    if csv == "":
        if op == 'sum' or op == 'prod':
            return 0.0
        if op == 'sort':
            return np.array([], dtype = float)
        return None
    
        

    # valid csv
    a = csv2array(csv)
    
    if op == "sum":
        return a.sum()
    elif op == "prod":
        return a.prod()
    elif op == "sort":
        return np.sort(a)
    else:
        return None



import sys

if __name__ == "__main__":

    op = sys.argv[1]
    csv = sys.argv[2]

    value = do_operation(op,csv)
    print (value)