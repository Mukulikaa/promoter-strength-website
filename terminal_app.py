# Working terminal app

from Bio import SeqIO
from Bio.SeqRecord import SeqRecord
from Bio.Seq import Seq
from Bio import motifs
import pdb
import sys

def do_stuff(param1, param2):

	def calculate_score(sequence, pssm):
		score = 0
		for i, nt in enumerate(sequence):
			score = score + pssm[nt, i]
		return score

	path = '' 

	fn_all = 'static/all_promters_49_10.fa'	#All promoters from S_cerevisiae_epdnew database
	file_in_all = path + fn_all
	all_seq = {}	#list of all sequences from EPD database

	with open(file_in_all, 'r') as f:
		for seq_record in SeqIO.parse(f, 'fasta'):
			pname = ''.join(seq_record.description.split()[1])
			all_seq[pname] = Seq(str(seq_record.seq).upper())

	#Seperate dictionary for characterized promoters
	characterized_names = ['TDH3_1', 'CCW12_1', 'PGK1_1', 'HHF2_1', 'TEF1_1', 'TEF2_1', 'HHF1_1', 'HTB2_1', 'RPL18B_1', 'ALD6_1', 'PAB1_1',
	'RET2_1', 'RNR1_1', 'SAC6_1', 'RNR2_1', 'POP6_1', 'RAD27_1', 'PSP2_1']
	characterized_seq = {pname: all_seq[pname] for pname in characterized_names}

	#Create motif
	moti = motifs.create(list(all_seq.values()))
	pwm = moti.counts.normalize()
	pssm = pwm.log_odds()

	#Calculate scores
	TDH3score = calculate_score(characterized_seq['TDH3_1'], pssm) #Strongest promoter in Lee et al. Will normalize by dividing with this score

	in_epd = param1.lower()
	if in_epd == 'y':
		userpromoter = param2.upper()
		userseq = all_seq[userpromoter]
	else:
		userseq = param2.upper()

	userscore = calculate_score(userseq, pssm)
	#print("\n------------- Results -------------")
	print("Your promoter sequence was: " + userseq)
	print("Raw promoter score:", userscore)
	#print("Promoter score normalized by TDH3:", userscore/TDH3score)
	return userseq, userscore, userscore/TDH3score

if __name__=='__main__':
	#get arguments from user
	param1 = sys.argv[1]
	param2 = sys.argv[2]
	do_stuff(param1, param2)
