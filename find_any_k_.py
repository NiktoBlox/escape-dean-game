with open('assets/index-Bv1wwfz6.js', 'r', encoding='utf-8') as f:
    content = f.read()

import re
# Find all assignments to k_ or definitions of k_
# E.g. k_= or function k_
# Let's search for "k_" as a word
matches = [m.start() for m in re.finditer(r'\bk_\b', content)]
print(f"Matches for word k_: {len(matches)}")
# Let's print the first 10 matches
for i, m in enumerate(matches[:10]):
    print(f"Match {i} at {m}:")
    print(content[max(0, m-50):min(len(content), m+150)])
    print("-" * 50)
