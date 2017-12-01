import os
import ipfsapi
api = ipfsapi.connect('127.0.0.1', 5001)

staged = ""
while True:
	
	with open('projects.txt') as f:
		projects = f.read().splitlines()

	line = input('> ').split()

	if len(line) == 0:
		continue

	# stores project name in projects file
	if line[1] == "init" and len(line) <= 4:

		if not os.path.isfile(line[2]):
			print("Project does not exist")
			continue

		if line[2] in projects:
			print("Project already exists")
			continue

		f = open("projects.txt","w+")
		projects.append(line[2])
		for proj in set(projects):
			f.write(proj)

		public = True
		if len(line) == 4 and line[3] == "private":
		 	public = False
		# Ethereum call (line[2],public)

	# stages a project that is ready to be committed
	elif line[1] == "add" and len(line) == 3 and line[2] in projects:
		staged = line[2]

	elif line[1] == "commit" and staged:
		res = api.add("projects/" + staged, recursive=True)
		print(res[0]['Hash'])
		# Ethereum call(project name, hash)

	elif line[1] == "pull" and len(lines) == 3:
		name = line[2]
		# hash = Ethereeum call(name)
		# get(hash)

	elif line[2] == "remove" and len(lines) == 3:
		if lines[3] in projects:
			projects.remove(lines[3])
			f = open("projects.txt","w+")
			for proj in set(projects):
				f.write(proj)
			# Ethereum call remove("name")
		else:
			print("Project does not exist")

	else: 
		print("Invalid command")








