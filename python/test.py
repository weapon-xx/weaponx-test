list1 = [1, 5, 7, 6, 9];
list2 = [list1[i] for i in range(len(list1)) if i == list1.index(list1[i])];


print list2;
