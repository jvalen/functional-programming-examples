/* 
 * FP Python examples in JS 
 */

/*
name_lengths = map(len,["Mary", "Isla", "Sam"])
print name_lengths
*/
var name_lengths = ["Mary", "Isla", "Sam"].map(function(x){ return x.length});
console.log(name_lengths);

/* -------------------------------------------------------------------------- */

/*
squares = map(lambda x: x * x, [0, 1, 2, 3, 4])
print squares # => [0, 1, 4, 9, 16]
*/
var squares = [0, 1, 2, 3, 4].map(function(x){ return x * x });
console.log(squares);

/* -------------------------------------------------------------------------- */

/*
import random

names = ['Mary', 'Isla', 'Sam']
code_names = ['Mr. Pink', 'Mr. Orange', 'Mr. Blonde']
secret_names = map(lambda x: random.choice(code_names),names)
print secret_names
*/
function returnNumberInRange(min, max) {
  return Math.floor(Math.random() * max) + min;
}

var names = ['Mary', 'Isla', 'Sam'];
var code_names = ['Mr. Pink', 'Mr. Orange', 'Mr. Blonde'];
var secret_names = names.map(function(x){
  var l = code_names.length;
  return code_names[returnNumberInRange(0, l - 1)]
});
console.log(secret_names);

/* -------------------------------------------------------------------------- */
/* ------ EXERCISE 1

# Unfunctional version:
 
names = ['Mary', 'Isla', 'Sam'] 
'''
for i in range(len(names)):
    names[i] = hash(names[i])
print names # => [6306819796133686941, 8135353348168144921, -1228887169324443034]
'''
 
# Rewrite the code above as a map 
# Expected answer: [6306819796133686941, 8135353348168144921, -1228887169324443034]

SOLUTION:

names = ['Mary', 'Isla', 'Sam']
code_names = map (lambda x: hash(x), names)
print code_names

*/
String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length == 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

var names = ['Mary', 'Isla', 'Sam'];
var code_names = names.map(function(x){return x.hashCode()});
console.log(code_names); //Different result due to the js hash implementation

/* -------------------------------------------------------------------------- */

/*
sum = reduce(lambda a, x: a + x, [0, 1, 2, 3, 4])
print sum # => 10
*/
console.log([0, 1, 2, 3, 4].reduce(function(a, x){ return a + x }));

/* -------------------------------------------------------------------------- */

/*
sentences = ['Mary read a story to Sam and Isla.','Isla cuddled Sam.','Sam chortled.']
sam_count = reduce(lambda a, x: a + x.count('Sam'),sentences, 0)
print sam_count
*/
function countOccurrences(source, target) {
  var regex = new RegExp(target, 'g');
  return (source.match(regex) || []).length;
}

var sentences = ['Mary read a story to Sam and Isla.','Isla cuddled Sam.','Sam chortled.'];
sam_count = sentences.reduce(function(a, x){ return a + countOccurrences(x, 'Sam') }, 0);
console.log(sam_count);

/* -------------------------------------------------------------------------- */
/* ------ EXERCISE 2

people = [{'name': 'Mary', 'height': 160},
          {'name': 'Isla', 'height': 80},
          {'name': 'Sam'}]
"""
height_total = 0
height_count = 0
for person in people:
    if 'height' in person:
        height_total += person['height']
        height_count += 1
if height_count > 0:
    average_height = height_total / height_count # => 120
"""
 
# Rewrite the code above using map, reduce and filter
# Expected answer: 120

SOLUTION:

heights = map(lambda x: x['height'],filter(lambda x: 'height' in x, people))
if len(heights) > 0:
  average_height = reduce(lambda a, x: a + x,heights) / len(heights)

*/
var people = [{'name': 'Mary', 'height': 160},
          {'name': 'Isla', 'height': 80},
          {'name': 'Sam'}];

var filtered = function(data) {
  return data.filter(function(value){
    if ('height' in value) {
        return value;
    }
  })
}

var totalHeight = function(data) {
  return data.reduce(function(a, x){
    return a.height + x.height;
  })
}

heightSum = totalHeight(filtered(people));

var average = heightSum / filtered(people).length;
console.log(average);

/* -------------------------------------------------------------------------- */

/*
from random import random

def move_cars(car_positions):
    return map(lambda x: x + 1 if random() > 0.3 else x,car_positions)

def output_car(car_position):
    return '-' * car_position

def run_step_of_race(state):
    return {'time': state['time'] - 1,'car_positions': move_cars(state['car_positions'])}

def draw(state):
    print ''
    print '\n'.join(map(output_car, state['car_positions']))

def race(state):
    draw(state)
    if state['time']:
        race(run_step_of_race(state))

race({'time': 5,'car_positions': [1, 1, 1]})
*/
function move_cars(car_positions) {
  return car_positions.map(function(x) {
    return (Math.random() > 0.3 ? x + 1 : x); 
  });  
}

function output_car(car_position) {
  return Array(car_position).join('-');
}

function run_step_of_race(state) {
  return {'time': state.time - 1,'car_positions': move_cars(state['car_positions'])}
}

function draw(state) {
  console.log('');
  console.log(state.car_positions.map(output_car))
  
}

function race(state) {
  draw(state);
  if (state.time) {
    race(run_step_of_race(state));
  }
  
}
race({'time': 5,'car_positions': [1, 1, 1]});

/* -------------------------------------------------------------------------- */
/* ------ EXERCISE 3

bands = [{'name': 'sunset rubdown', 'country': 'UK', 'active': False},
         {'name': 'women', 'country': 'Germany', 'active': False},
         {'name': 'a silver mt. zion', 'country': 'Spain', 'active': True}]

def assoc(_d, key, value):
    from copy import deepcopy
    d = deepcopy(_d)
    d[key] = value
    return d

def set_canada_as_country(band):
    return assoc(band, 'country', "Canada")

def strip_punctuation_from_name(band):
    return assoc(band, 'name', band['name'].replace('.', ''))

def capitalize_names(band):
    return assoc(band, 'name', band['name'].title())

print pipeline_each(bands, [set_canada_as_country,
                            strip_punctuation_from_name,
                            capitalize_names])

# Implement pipeline_each so that the pipeline_each call
# above returns:

# => [{'name': 'Sunset Rubdown', 'active': False, 'country': 'Canada'},
     {'name': 'Women', 'active': False, 'country': 'Canada' },
     {'name': 'A Silver Mt Zion', 'active': True, 'country': 'Canada'}]

SOLUTION:

def pipeline_each(data, fns):
  return reduce(lambda a, fn: filter(lambda x: x != None,map(fn, a)),fns,data)
*/

var Immutable = require("immutable"); //We use Immutable js

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var bands = [{'name': 'sunset rubdown', 'country': 'UK', 'active': false},
         {'name': 'women', 'country': 'Germany', 'active': false},
         {'name': 'a silver mt. zion', 'country': 'Spain', 'active': true}];

function assoc(_d, key, value) {
  var auxMap = Immutable.Map(_d);
  return (auxMap.set(key, value)).toJS();
}

function set_canada_as_country(band) {
  return assoc(band, 'country', 'Canada');
}

function strip_punctuation_from_name(band) {
  return assoc(band, 'name', band['name'].replace(/\./g, ''));
}

function capitalize_names(band) {
  return assoc(band, 'name', capitalizeFirstLetter(band['name']));
}

function pipeline_each(data, fns) {
  return fns.reduce(function(a, fn){
    return a.map(fn);
  }, data);
}

console.log(pipeline_each(bands, [set_canada_as_country,
                            strip_punctuation_from_name,
                            capitalize_names]));
/* -------------------------------------------------------------------------- */
/* ------ EXERCISE 4

bands = [{'name': 'sunset rubdown', 'country': 'UK', 'active': False},
         {'name': 'women', 'country': 'Germany', 'active': False},
         {'name': 'a silver mt. zion', 'country': 'Spain', 'active': True}]
 
def assoc(_d, key, value):
    from copy import deepcopy
    d = deepcopy(_d)
    d[key] = value
    return d
 
def call(fn, key):
    def apply_fn(record):            
        return assoc(record, key, fn(record.get(key)))
    return apply_fn
 
def pipeline_each(data, fns):
    return reduce(lambda a, fn: map(fn, a),
                  fns,
                  data)
 
print pipeline_each(bands, [call(lambda x: 'Canada', 'country'),
                            call(lambda x: x.replace('.', ''), 'name'),
                            call(str.title, 'name'),
                            pluck(['name', 'country'])])
                            
# Implement pluck so that the pipeline_each call
# above returns the bands below.
 
# => [{'name': 'Sunset Rubdown', 'country': 'Canada'},
#     {'name': 'Women', 'country': 'Canada' },
#     {'name': 'A Silver Mt Zion', 'country': 'Canada'}]

SOLUTION:

def pluck(keys):
    def pluck_fn(record):
        plucked_record = {}
        for key in keys:
            plucked_record[key] = record[key]
        return plucked_record
    return pluck_fn

*/


var bands = [{'name': 'sunset rubdown', 'country': 'UK', 'active': false},
         {'name': 'women', 'country': 'Germany', 'active': false},
         {'name': 'a silver mt. zion', 'country': 'Spain', 'active': true}];

function assoc(_d, key, value) {
  var auxMap = Immutable.Map(_d);
  return (auxMap.set(key, value)).toJS();
}

function call(fn, key) {
  var apply_fn = function(record) {
    return assoc(record, key, fn(record[key])); 
  };
  return apply_fn;
}

function pipeline_each(data, fns) {
  return fns.reduce(function(a, fn){
    return a.map(fn);
  }, data);
}

function pluck(keys) {
  var pluck_fn = function(record) {
    plucked_record = {}
    for (var key in keys) {
      var value = keys[key];
      plucked_record[value] = record[value];
    }
    return plucked_record;
  };
  return pluck_fn;
}

console.log(pipeline_each(bands, [call(function(x){ return 'Canada'}, 'country'),
                                  call(function(x){ return x.replace(/\./g, '')}, 'name'),
                                  call(function(x){ return capitalizeFirstLetter(x)}, 'name'),
                                  pluck(['name', 'country'])]));