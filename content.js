let cicero1 = "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem."
let cicero2 = "ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?"
let cicero3 = "At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga."
let cicero4 = "et harum quidem rerum facilis est et expedita distinctio. nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae."
let cicero5 = "itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."


let canaryWords = [/\blorem\b/gi, /\badipiscin\b/gi] 

// "eiusmod", "tempor", "minim", "incididunt", "nostrud", "exercitation", "ullamco", "aliquip", "aute", "anim", "ultricies", "nisl", "imperdiet", "tincidunt", "lobortis", "facilisis", "accumsan", "eleifend", "viverra", "sem", "laoreet", "ullamcorper", "sapien", "augue", "hendrerit", "nibh", "dignissim", "molestie", "dui", "aliquet", "congue", "porttitor", "feugiat", "mattis", "tacimates", "tation", "pri", "pro.", "cum.", "ne.", "ad."]

let foundCanaries = []
let changesCounter = 0;



// walk(document.body);

// function walk(node) {
    //I stole this function from here:
    // https://github.com/panicsteve/cloud-to-butt/blob/master/Source/content_script.js

    // He stole it from here:
    // http://is.gd/mwZp7E

    // var child, next;

    // 	if (
    //         node.tagName.toLowerCase() == 'input' || 
    //         node.tagName.toLowerCase() == 'textarea'
    //         || node.classList.indexOf('ace_editor') > -1
    // ){
    // 		return;
    // 	}

//     switch (node.nodeType) {
//         case 1:  // Element
//         case 9:  // Document
//         case 11: // Document fragment
//             child = node.firstChild;
//             while (child) {
//                 next = child.nextSibling;
//                 walk(child);
//                 child = next;

//             } break;

//         case 3: // Text node
//             findCanaries(node);
//             break;
//     }
// }

function handleText(textNode) {

    var v = textNode.nodeValue;

    v = v.replace(/\blorem ipsum\b/g, "dolorem ipsum");
    v = v.replace(/\bLoreum ipsum\b/g, "Dolorem ipsum");
    v = v.replace(/\blorem Ipsum\b/g, "dolorem Ipsum");
    v = v.replace(/\bLorem Ipsum\b/g, "Dolorem Ipsum");

    textNode.nodeValue = v;
}
function findCanaries() {
    let allElements = document.getElementsByTagName("*");
    for (let j = 1; j < allElements.length; j++) {
        foundCanaries = [];
    for (let i = 0; i < canaryWords.length; i++) {
        if (allElements[j].textContent.includes(canaryWords[i])
            && allElements[j].tagName.toLowerCase() === 'span'
            
            ||
            
            allElements[j].textContent.includes(canaryWords[i])
            && allElements[j].tagName.toLowerCase() === 'p'

            ||

            allElements[j].textContent.includes(canaryWords[i])
            && allElements[j].tagName.toLowerCase() === 'blockquote') {
                        
                foundCanaries.push(canaryWords[i])

            if (foundCanaries.length > 2) {
                changesCounter++;
                switch (changesCounter){
                    case 1 : allElements[j].textContent = cicero1;
                    case 2 : allElements[j].textContent = cicero2;
                    case 3 : allElements[j].textContent = cicero3;
                    case 4 : allElements[j].textContent = cicero4;
                    case 5 : allElements[j].textContent = cicero5;
            }
            }
        }
    }
}
if (changesCounter > 0) {
    alert('Say no to fake Latin! \n \n' + changesCounter + ' elements have been altered on this page.')
}
}
findCanaries();