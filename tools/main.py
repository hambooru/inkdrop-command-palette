from asyncio import current_task
from urllib.error import ContentTooShortError


with open("window.js", "a") as f:
  x = open ("source.txt", "r")
  previouseditor= ""
  currenteditor = ""
  currentselector = ""
  
  f.write("\"use babel\";\n")
  f.write("export default [\n")

  # if line starts with "editor:" add line to editor.js
  for line in x:
    print(line);
    print(currenteditor)
    print(currentselector)
    if line.startswith("window:"):
      currenteditor = line[7:]
    if line.startswith("Selector: "):
      currentselector = line[10:]
    if line.startswith("Selector:"):
      f.write("{\n")
      f.write("name: \">%s\",\n" % (currenteditor.replace("-", " ").capitalize().strip()))
      f.write("category: \"Window\",\n")
      f.write("command: \"window:%s\",\n" % (currenteditor.strip()))
      f.write("selector: \"%s\",\n" % (currentselector.strip()))
      f.write("state: \"untested\",\n")
      f.write("shortcut: [\"\"],\n")
      f.write("},\n")
      # insert values into the string
    # if currenteditor variable changes, add line to editor.js
  f.write("];")