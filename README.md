# exciseCodeTags
Simple node.js utility to strip out &lt;code> and &lt;pre> tag content from files.

## Overview

While performing some automated tests on some HTML,
I found that the test utilities did not always ignore code present within
the &lt;code>...&lt;/code> or &lt;pre>...&lt;/pre> tags.

This (node.js)[https://nodejs.org/] utility performs a simple removal of the
content within these tags.
The &lt;pre>...&lt;/pre> tags are assumed to be within prose,
and so are replaced by a simple two word phrase.
By default,
the phrase is "code phrase",
but this can be changed easily.

## Running the utility

`cat &lt;sample_html_file> | node exciseCodeTags.js > &lt;a_different_html_file>`
