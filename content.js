walk(document.body);

function walk(node) {
    //I stole this function from here:
    // https://github.com/panicsteve/cloud-to-butt/blob/master/Source/content_script.js
    
    // He stole it from here:
	// http://is.gd/mwZp7E
	
	var child, next;
	
	// if (
        // node.tagName.toLowerCase() == 'input' || 
        // node.tagName.toLowerCase() == 'textarea'
        // || node.classList.indexOf('ace_editor') > -1
// ){
// 		return;
// 	}

	switch ( node.nodeType ) {
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) {
				next = child.nextSibling;
				walk(child);
				child = next;

            } break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode) {

	var v = textNode.nodeValue;

	v = v.replace(/\blorem ipsum\b/g, "dolorem ipsum");
	v = v.replace(/\bLoreum ipsum\b/g, "Dolorem ipsum");
	v = v.replace(/\blorem Ipsum\b/g, "dolorem Ipsum");
	v = v.replace(/\bLorem Ipsum\b/g, "Dolorem Ipsum");
	
	textNode.nodeValue = v;
}

