const domino = require('domino');
const fs = require('fs');
const path = require('path');
const { from } = require('rxjs/observable/from');
const indexPath = path.join(__dirname, './dist/index.html');
const index = fs.readFileSync(indexPath).toString();
const doc = domino.createDocument(index);
const scripts = doc.querySelectorAll('body script');

from(scripts)
  .subscribe(script => {
    script.defer = true;
    doc.head.appendChild(script);
  });

fs.writeFileSync(indexPath, doc.innerHTML);

console.log(doc.innerHTML);
