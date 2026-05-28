with open('assets/index-Bv1wwfz6.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's search for "k_=" or "k_ =" or ",k_="
import re
matches = [m.start() for m in re.finditer(r'(var|,|let)\s*k_([=\s])', content)]
print(f"Found matches for k_: {len(matches)}")
for m in matches:
    print(content[max(0, m-50):min(len(content), m+300)])
    print("-" * 50)
