# sudo pip install -U nltk
# pip3 install lexicalrichness
import nltk
import string
from nltk import FreqDist
from nltk.tokenize import RegexpTokenizer
punctlessTokenizer = RegexpTokenizer(r'\w+')
from nltk.tokenize import sent_tokenize
import json
import sys

js = json.loads(sys.argv[1])
commentlibrary = js

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
extrawords = {'would', 'out', 'when', 'all', 'if', 'he', 'as', 'there', 'quiz', 'relatively', 'stuff',
               'place', 'be', 'are', 'were', 'so', 'at', 'me', 'had', 'but', 'have', 'not', 'year', 'will',
               'on', 'with', 'you', 'we', 'this', 'they', 'that', 'is', 'my', 'in', 'for', 'of', 'teachings',
               'it', 'was', 'to', 'and', 'the', 'you', 'course', 'professor', 'class', 'can', 'exam', 'students'
               'an', 'by', '09', '10', '125', '20', '60', '7pm', '95', '225', 'cs225', 'cs', 'follows', 'lawrence'
               'here', 'am', '100', 'haha', 'she', 'he', 'very', 'comment', 'take', 'took', 'work', 'has', 
               'what', 'always', 'time', 'his', 'cinda', 'one', 'mps', 'exams', 'where', 'professors', 'an', 'about',
               'answer', 'freshman', 'sometimes', 'software', 'office', 'lawrence', 'back', 'points', 'anyone',
               'saying', 'didn', 've', 'could', 'during', 'internet', 'java', 'man', 'making', 'isn', 'no', 'second'
               'everything', 'makes', 'campus', 'teacher', 'teaches', 're', 'him', 'instructor', 'her', 'lectures',
               'students', 'material', 'go', 'does', 'how', 'however', 'hours', 'uiuc', 'do', 'your', 'teaching', 
               'make', 'computer', 'don'}
# a frequency list of words that are not stopwords
fdist_stopwless_test = FreqDist(w.lower() for w in contentWords if w not in stopwords and w not in extrawords)
# find top nth words in the list
most_common_stopwless_test = fdist_stopwless_test.most_common(3)

#output
print(dict(most_common_stopwless_test), end ="")
