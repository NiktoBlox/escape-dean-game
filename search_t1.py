with open('assets/index-Bv1wwfz6.js', 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.find('let o_space=!1;')
if idx != -1:
    print(content[idx:idx+1000])
else:
    print("let o_space not found")
