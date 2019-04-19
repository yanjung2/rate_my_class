# sudo pip install -U nltk
# pip3 install lexicalrichness
import nltk
import string
from nltk import FreqDist
from nltk.tokenize import RegexpTokenizer
punctlessTokenizer = RegexpTokenizer(r'\w+')
from nltk.tokenize import sent_tokenize


# read from commentlibrary
toks_test = []
for comment in commentlibrary:
    l = punctlessTokenizer.tokenize(comment)
    for w in l:
        toks_test.append(w.lower())

tags = nltk.pos_tag(toks_test)
contentWords = [word for word,pos in tags if (pos == 'JJ' or pos == 'JJR' or pos == 'JJS')]
#
# declare stopwords
stopwords = nltk.corpus.stopwords.words('english')
#declare extra words
extrawords = {"course","class","professor"}
# a frequency list of words that are not stopwords
fdist_stopwless_test = FreqDist(w.lower() for w in contentWords if w not in stopwords and w not in extrawords)
# find top nth words in the list
most_common_stopwless_test = fdist_stopwless_test.most_common(3)

#output
print (most_common_stopwless_test)
