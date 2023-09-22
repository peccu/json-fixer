const j = `{}`;

const jsonFixer = (j, debug = false)=>{
  debug && console.log('input');
  debug && console.log(j.replaceAll(/[^\[\]{},]/g,''));
  const fixer = {
    '[': ']',
    '{': '}',
    ']': '[',
    '}': '{',
  };

  const result = [];
  const stack = [];

  const closeParen = (c) => {
    const top = stack.pop();
    if(top !== fixer[c]){
      debug && console.log(`popped: ${top}, but current: ${c}`);
      result.push(fixer[top]);
      // need to recursively call self
      return fixParen(c);
    }
    if(top === null){
      debug && console.log('stack is already empty');
      result.unshift(fixer[c]);
    }
    return result.push(c);
  };

  const fixParen = (c) => {
    switch (c) {
    case '{':
    case '[':
      stack.push(c);
      result.push(c);
      break;
    case ']':
    case '}':
      closeParen(c);
      break;
    default:
      // skip
      result.push(c);
    }
  };
  j.split('').map(e => fixParen(e));
  debug && console.log('stack: ', stack);
  debug && console.log('current result');
  debug && console.log(result.join('').replaceAll(/[^\[\]{},]/g,''));
  let rest = stack.pop();
  while(rest){
    debug && console.log(`stack is not empty with: ${rest}, pushing: ${fixer[rest]}`);
    result.push(fixer[rest]);
    rest = stack.pop();
  }
  const fixed = result.join('');
  debug && console.log(fixed.replaceAll(/[^\[\]{},]/g,''));
  return fixed.replaceAll('\\n', '\\\\n');
};

let result = jsonFixer(j);
console.log(JSON.parse(result));
