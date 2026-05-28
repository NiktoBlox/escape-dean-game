with open('assets/index-Bv1wwfz6.js', 'r', encoding='utf-8') as f:
    content = f.read()

import re
matches = [m.start() for m in re.finditer(r'\b[a-zA-Z0-9_]+,k_([=,;])', content)]
print(f"Matches for ,k_: {len(matches)}")
for m in matches:
    print(content[max(0, m-100):min(len(content), m+300)])
    print("-" * 50)

matches2 = [m.start() for m in re.finditer(r'\bk_,', content)]
print(f"Matches for k_,: {len(matches2)}")
for m in matches2:
    print(content[max(0, m-100):min(len(content), m+300)])
    print("-" * 50)
