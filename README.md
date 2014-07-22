Zotero-crawler
==============

Javascript utilities to generate custom csv files from a Zotero HTML report.

Zotero (https://www.zotero.org) is an excellent bibliography manager, but since I could not get the built-in exporting capabilities to do what I needed I had to write a hack of my own.

While Zotero supports JSON export, it was not including the metadata that I needed. I realized that the HTML export included the extra fields that I needed, so I wrote a javascript crawler that iterates through the DOM and creates a CSV-file from the desired attributes.

How to use?
===========
To use, you need to make an HTML export from Zotero and include the js-files Table.js and Tagcounter.js in the HTML-file.

Now open the HTML file in your browser, open dev tools and verify that the console says 'article objects generated'. Now run the function customListCSV() from the console with the attributes you want included in your CSV as parameters, fx. customListCSV('title', 'author', 'year'). The CSV output will be written to the console from where you may copy it to wherever you might need it.

Available attributes are:
- title
- journal
- date
- volume
- issue
- pages
- abstract
- year
- tags
- authors
- theme
- type
- theory
- findings
- relevance
