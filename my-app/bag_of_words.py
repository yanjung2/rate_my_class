import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
import pickle
import json
import sys

js = json.loads(sys.argv[1])
data = js

_min_df = 2;
_max_df = 100;
_stop_words = ['would', 'out', 'when', 'all', 'if', 'he', 'as', 'there', 'quiz', 'relatively', 'stuff',
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
               'make', 'computer', 'don']

vocabulary_ = {'inspired': 153, 'transfer': 322, 'into': 159, 'science': 267, 'great': 134, 'first': 113, 'programming': 255, 'managed': 202, 'bit': 31, 'though': 313, 'experience': 96, 'might': 210, 'angrave': 8, 'best': 29, 'definitely': 60, 'keep': 165, 'interesting': 158, 'job': 161, 'helpful': 143, 'tests': 306, 'fair': 104, 'overall': 230, 'easy': 74, 'prior': 251, 'doable': 68, 'even': 87, 'nice': 219, 'funny': 120, 'intelligent': 154, 'awesome': 22, 'really': 262, 'put': 256, 'lot': 193, 'effort': 76, 'amazing': 7, 'learnt': 180, 'given': 126, 'well': 340, 'guy': 135, 'give': 125, 'pat': 236, 'tell': 304, 'passionate': 234, 'only': 224, 'also': 6, 'extremely': 102, 'everything': 91, 'ever': 88, 'want': 334, 'made': 200, 'classes': 40, 'excellent': 92, 'expect': 94, 'enthusiastic': 85, 'going': 129, 'lecture': 182, 'fun': 119, 'useful': 331, 'love': 195, 'british': 33, 'accent': 1, 'more': 211, 'thankful': 308, 'taking': 297, 'major': 201, 'most': 212, 'entertaining': 83, 'sure': 293, 'gets': 124, 'concepts': 47, 'anything': 11, 'non': 220, 'mandatory': 203, 'incredibly': 151, 'gives': 127, 'every': 89, 'possible': 244, 'need': 216, 'everyone': 90, 'possibly': 245, 'truly': 324, 'while': 344, 'from': 117, 'now': 221, 'off': 222, 'charismatic': 37, 'end': 78, 'far': 107, 'goes': 128, 'difficult': 65, 'resources': 265, 'help': 141, 'readings': 260, 'section': 270, 'piazza': 241, 'web': 337, 'grading': 133, 'almost': 5, 'too': 318, 'least': 181, 'some': 280, 'hilarious': 147, 'aren': 15, 'tough': 321, 'them': 309, 'full': 118, 'credit': 56, 'week': 338, 'without': 348, 'won': 349, 'think': 312, 'interested': 157, 'fantastic': 106, 'student': 287, 'shows': 275, 'us': 330, 'videos': 333, 'before': 27, 'just': 164, 'keeps': 167, 'joking': 163, 'around': 16, 'knows': 172, 'enthusiasm': 84, 'mp': 213, 'any': 10, 'question': 257, 'complete': 46, 'day': 59, 'up': 329, 'like': 185, 'got': 131, 'top': 319, 'department': 61, 'expects': 95, 'never': 217, 'hard': 136, 'll': 189, 'probably': 252, 'literally': 187, 'knowledgeable': 170, 'looking': 192, 'or': 225, 'better': 30, 'teach': 302, 'fast': 108, 'high': 145, 'discussion': 66, 'then': 310, 'lab': 173, 'highly': 146, 'recommend': 263, 'having': 139, 'people': 238, 'interact': 155, 'keeping': 166, 'understand': 325, 'good': 130, 'practice': 248, 'prepared': 249, 'legend': 184, 'period': 240, 'plenty': 242, 'interest': 156, 'coding': 43, 'prof': 254, 'haven': 138, 'seen': 272, 'stay': 282, 'college': 44, 'approachable': 13, 'willing': 347, 'lol': 190, 'fact': 103, 'much': 214, 'who': 345, 'hate': 137, 'fall': 105, 'pretty': 250, 'online': 223, 'sense': 274, 'humor': 148, 'things': 311, 'cool': 51, 'jokes': 162, 'per': 239, 'succeed': 291, 'which': 343, 'forward': 114, 'whole': 346, 'university': 328, 'enjoy': 80, 'times': 315, 'get': 123, 'semester': 273, 'enjoyable': 81, 'questions': 258, 'after': 4, 'totally': 320, 'known': 171, 'extra': 101, 'over': 229, 'score': 268, 'real': 261, 'passion': 233, 'due': 72, 'each': 73, 'lecturer': 183, 'others': 228, 'excited': 93, 'attend': 19, 'helps': 144, 'attention': 20, 'clear': 41, 'bad': 23, 'quite': 259, 'lots': 194, 'talk': 298, 'sit': 277, 'clearly': 42, 'loves': 197, 'subject': 290, 'seem': 271, 'helped': 142, 'actually': 3, 'doing': 70, 'through': 314, 'enough': 82, 'went': 341, 'necessary': 215, 'long': 191, 'humorous': 149, 'understandable': 326, 'explaining': 98, 'know': 168, 'little': 188, 'yet': 356, 'wants': 335, 'important': 150, 'many': 204, 'spend': 281, 'than': 307, 'effectively': 75, 'matter': 207, 'teachers': 303, 'loved': 196, 'simple': 276, 'tries': 323, 'telling': 305, 'corny': 52, 'other': 227, 'way': 336, 'available': 21, 'listen': 186, 'wrong': 355, 'learn': 177, 'courses': 53, 'challenging': 35, 'practical': 247, 'heeren': 140, 'despite': 63, 'being': 28, 'contents': 50, 'knowledge': 169, 'workload': 351, 'learning': 179, 'required': 264, 'consuming': 48, 'cares': 34, 'tons': 317, 'worth': 353, 'labs': 174, 'materials': 205, 'pay': 237, 'content': 49, 'still': 283, 'down': 71, 'generous': 122, 'tas': 300, 'generally': 121, 'credits': 57, 'participation': 232, 'covers': 54, 'takes': 296, 'may': 208, 'plus': 243, 'data': 58, 'structures': 286, 'chance': 36, 'barely': 24, 'emails': 77, 'doesn': 69, 'learned': 178, 'super': 292, 'ton': 316, 'asking': 18, 'understands': 327, 'explanations': 100, 'written': 354, 'review': 266, 'favorite': 109, 'did': 64, 'answers': 9, 'studying': 288, 'cheat': 38, 'few': 111, 'feel': 110, 'world': 352, 'past': 235, 'because': 26, 'style': 289, 'wonderful': 350, 'part': 231, 'found': 115, 'cheerful': 39, 'slow': 278, 'especially': 86, 'itself': 160, 'ta': 294, 'friendly': 116, 'boring': 32, 'talking': 299, 'new': 218, 'structure': 284, 'able': 0, 'taken': 295, 'structured': 285, 'organized': 226, 'whenever': 342, 'come': 45, 'across': 2, 'useless': 332, 'taught': 301, 'machine': 199, 'problems': 253, 'dept': 62, 'low': 198, 'informative': 152, 'explains': 99, 'posted': 246, 'last': 176, 'weeks': 339, 'zilles': 357, 'ask': 17, 'large': 175, 'smart': 279, 'craig': 55, 'grade': 132, 'midterm': 209, 'discussions': 67, 'second': 269, 'architecture': 14, 'explain': 97, 'engineering': 79, 'math': 206, 'basically': 25, 'applied': 12, 'fields': 112}

vectorizer = CountVectorizer(vocabulary = vocabulary_, min_df = _min_df, max_df = _max_df, stop_words = _stop_words)
X = vectorizer.transform(data)
test_data = X.toarray()


lr = pickle.load(open('model.sav', 'rb'))
predicted = lr.predict_proba(test_data)

num_pos = 0
for i in range(len(predicted)):
    if(predicted[i][1] > 0.7):
        num_pos += 1

if (num_pos/len(predicted) > 0.67):
	print('Recommended!', end ="")
else:
	print('Not Recommended', end ="")
sys.stdout.flush()

