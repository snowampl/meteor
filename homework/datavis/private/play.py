import sys

i=23
while i< 100000:
	if (7*i-3)%8==0 and (7*i-2)%9 == 0 and (7*i-5)%6==0:
		sys.stdout.write(str(i))
		sys.stdout.write('\t')
	i += 30

