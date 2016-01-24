import sys

for line in sys.stdin:
	splits = line.strip().split(',')
	if splits[3]!="0":
		sys.stdout.write(splits[0]+","+splits[1]+","+splits[2]+","+splits[3]+'\n')
