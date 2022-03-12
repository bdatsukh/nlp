import re
from tracemalloc import stop

bad_syms = re.compile(r'[^А-ЯӨҮа-яөү0-9 ./?:!-;()[]"]')
stopword = ['ч', 'л', 'аа', 'ээ', 'оо', 'өө', 'даа', 'дээ', 'доо', 'дөө']

def text_prepare(text):
	text = bad_syms.sub('', text)
	text = re.sub(r'\s+', ' ', text)
	text = re.sub(r'\s+$', '', text)
	text = ' '.join([word for word in text.split(' ') if word not in stopword])
	return text

with open('./tungaa.txt', 'r', encoding='utf-8') as in_file:
	tungaa = in_file.read()

	tungaa = text_prepare(tungaa)

with open('./n-tungaa.txt', 'w', encoding='utf-8') as out_file:
	out_file.write(tungaa)