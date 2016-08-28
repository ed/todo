import linecache
import random


def word_getter(WORDS_FILENAME, total_num_lines):
    line_number = random.randint(0, total_num_lines)
    return linecache.getline(WORDS_FILENAME, line_number)

def url_builder():
    words_num_lines = 235886
    connect_num_lines = 150
    words = '/usr/share/dict/words'
    connect = '/usr/share/dict/connectives'
    a = word_getter(words, words_num_lines).rstrip().title()
    b = word_getter(connect, connect_num_lines).rstrip().title()
    c = word_getter(words, words_num_lines).rstrip().title()
    d = a+b+c
    return(d)

url_builder()
