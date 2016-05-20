var Lazy=require("lazy");
var inCode = false;
var skipLine = false;
var thisLine;
var pos;
var endPos;

function testLine(tag, dummyPhrase) {
	if (inCode) {
		// We are in code block, so look for end of code.
		pos = thisLine.indexOf("</"+tag+">");
		skipLine = true;
		if (pos >= 0) {
			// We have found the end of a code block.
			inCode = false
			skipLine = false;
			// Remember special case of the entire code is in one line!!
			thisLine = thisLine.slice(pos + tag.length + 3);
		}
	} else {
		// Not in a code block, so see if we have just found one.
		while (pos = thisLine.indexOf("<" + tag), pos >= 0) {
			// We have found the start of a code block.
			inCode = true
			skipLine = true;
			// Remember special case of the entire code is in one line!!
			endPos = thisLine.indexOf("</" + tag + ">");
			if (endPos >= 0) {
				// We have actually found the start and end of the tag in the same line.
				// Just delete that bit.
				thisLine = thisLine.slice(0,pos) + dummyPhrase + thisLine.slice(endPos + tag.length + 3);
				inCode = false;
				skipLine = false;
			} else {
				thisLine = thisLine.slice(0,pos) + dummyPhrase;
			}
		}
	}
}

new Lazy(process.stdin)
	.lines
	.forEach(
		// For each line received from stdin...
		function(line) {
			thisLine = line.toString();
			// If there is any content...
			if (thisLine != "0") {
				// ... deal with any <pre> or </pre> tags in the line.
				testLine("pre");
				// Next, deal with any <code> or </code> tags in the line,
				// replacing them with a simple text placeholder.
				testLine("code", "code phrase");
			} else {
				// There was no content, so output a nice tidy blank line.
				thisLine = "";
			}
			if (!skipLine)
				// If we are not in a code block,
				// output the current version of the line.
				console.log(thisLine);
		}
	);
// All done.
process.stdin.resume();
