let cicero1 = "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem."
let cicero2 = "ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?"
let cicero3 = "At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga."
let cicero4 = "et harum quidem rerum facilis est et expedita distinctio. nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae."
let cicero5 = "itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."


let canaryWords = [
    /\blorem\b/gi,
    /\bdipiscing\b/gi,
    /\beiusmod\b/gi,
    /\btempor\b/gi,
    /\bminim\b/gi,
    /\bincididunt\b/gi,
    /\bnostrud\b/gi,
    /\bexercitation\b/gi,
    /\bullamco\b/gi,
    /\baliquip\b/gi,
    /\baute\b/gi,
    /\banim\b/gi,
    /\bultricies\b/gi,
    /\bnisl\b/gi,
    /\bimperdiet\b/gi,
    /\btincidunt\b/gi,
    /\blobortis\b/gi,
    /\bfacilisis\b/gi,
    /\baccumsan\b/gi,
    /\beleifend\b/gi,
    /\bviverra\b/gi,
    /\bsem\b/gi,
    /\blaoreet\b/gi,
    /\bullamcorper\b/gi,
    /\bsapien\b/gi,
    /\baugue\b/gi,
    /\bhendrerit\b/gi,
    /\bnibh\b/gi,
    /\bdignissim\b/gi,
    /\bmolestie\b/gi,
    /\bdui\b/gi,
    /\baliquet\b/gi,
    /\bcongue\b/gi,
    /\bporttitor\b/gi,
    /\bfeugiat\b/gi,
    /\bmattis\b/gi,
    /\btacimates\b/gi,
    /\btation\b/gi,
    /\bpri\b/gi,
    // /\bpro.\b/gi,
    // /\bcum.\b/gi,
    // /\bne.\b/gi,
    // /\bad.\b/gi
]

let foundCanaries = []
let changesCounter = 0;
let totalCanaries = [];

function findCanaries() {

    let allElements = document.getElementsByTagName("*");
    console.log('allElements:', allElements);

    for (let j = 1; j < allElements.length; j++) {

        if (foundCanaries.length > 0) {
            console.log("pushing to foundCanaries!")
            totalCanaries.push(foundCanaries)
            foundCanaries = [];

        } else {
            foundCanaries = [];
        }

        console.log('tagName:', allElements[j].tagName.toLowerCase());
        

        for (let i = 0; i < canaryWords.length; i++) {
            if (allElements[j].textContent.match(canaryWords[i]) != null) {
                console.log('at the ' + j + ' Element, I found ' + allElements[j].textContent.match(canaryWords[i]));
            }

            if (allElements[j].tagName.toLowerCase() === 'p' || allElements[j].tagName.toLowerCase() === 'span' || allElements[j].tagName.toLowerCase() === 'blockquote')

            
            // if (allElements[j].textContent.match(canaryWords[i] != null)
            //     && allElements[j].tagName.toLowerCase() === 'span'

            //     ||

            //     allElements[j].textContent.match(canaryWords[i] != null)
            //     && allElements[j].tagName.toLowerCase() === 'p'

            //     ||

            //     allElements[j].textContent.match(canaryWords[i] != null)
            //     && allElements[j].tagName.toLowerCase() === 'blockquote') {
            {
                console.log('okay, so it\'s a p, span, or blockquote');
                if (allElements[j].textContent.match(canaryWords[i]) != null) {
                    console.log('okay, so not null');
                    foundCanaries.push(canaryWords[i])

                    console.log('foundCanaries:', foundCanaries);

                    if (foundCanaries.length > 2) {
                        changesCounter++;

                        allElements[j].textContent = cicero1;
                        allElements[j].style.color = "blue";
                    } else {
                        console.log('did not make it to inner if');
                    }
                }

                //     if (changesCounter === 1) {
                //         allElements[j].textContent = cicero1
                //         allElements[j].style = "color : blue;"
                //     }

                //     if (changesCounter === 2) {
                //         allElements[j].textContent = cicero2
                //         allElements[j].style = "color : blue;"
                //     }

                //     if (changesCounter === 3) {
                //         allElements[j].textContent = cicero3
                //         allElements[j].style = "color : blue;"
                //     }

                //     if (changesCounter === 4) {
                //         allElements[j].textContent = cicero4
                //         allElements[j].style = "color : blue;"
                //     }

                //     if (changesCounter === 5) {
                //         allElements[j].textContent = cicero5
                //         allElements[j].style = "color : blue;"
                //     }

                // }
            } else {
                console.log('did not make it to outer if');
            }
        }
    }
    console.log('totalCanaries:', totalCanaries);
    if (changesCounter > 0) {
        alert('Say no to fake Latin! \n \n' + changesCounter + ' elements have been altered on this page.')
    }
}
findCanaries();