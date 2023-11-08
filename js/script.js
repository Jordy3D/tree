var linkDiv = `<a class="link" href="URL" target="_blank">
            <div class="link-image">
                <img src="IMAGE_URL" alt="IMAGE_ALT">
            </div>
            <div class="link-title">TITLE</div>
            <div class="link-description">DESCRIPTION</div>
        `;
var userDiv = `<div class="user">
            <div class="user-image">
                <img src="IMAGE_URL" alt="IMAGE_ALT">
            </div>
            <div class="user-name">NAME</div>
            <div class="user-description">DESCRIPTION</div>
        </div>`;

loadData();


// loadData();

// loadUser();
// loadLinks();

function loadData() {
    console.log('Loading Data');
    // load the data from data.json
    fetch('tree.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            loadUser(data);
            loadLinks(data);
        });
}

function loadUser(data) {
    console.log('Loading User');

    // use the userDiv template
    var userHTML = userDiv;
    // replace the placeholders with the user data
    userHTML = userHTML.replace('IMAGE_URL', data.image);
    userHTML = userHTML.replace('IMAGE_ALT', data.name);
    userHTML = userHTML.replace('NAME', data.name);
    userHTML = userHTML.replace('DESCRIPTION', data.description);
    // add the user to the page
    document.querySelector('.user-info').innerHTML += userHTML;
}

function loadLinks(data) {
    console.log('Loading Links');

    var linksContainer = document.querySelector('.links');

    var links = data.links;

    var groups = [];

    links.forEach(link => {
        // add a new group if it doesn't exist
        if (!groups.includes(link.group)) {
            groups.push(link.group);

            // if the group is not empty
            if (link.group != '') {
                var groupHTML = `<div class="group group-${link.group}"><h2>${link.group}</h2></div>`;
            }
            else {
                var groupHTML = `<div class="group group-main"></div>`;
            }
            linksContainer.innerHTML += groupHTML;

        }
    });


    // for each link
    links.forEach(link => {
        // use the linkDiv template
        var linkHTML = linkDiv;
        // replace the placeholders with the link data

        linkHTML = linkHTML.replace('URL', link.url);

        linkHTML = linkHTML.replace('IMAGE_URL', link.image);
        linkHTML = linkHTML.replace('IMAGE_ALT', link.title);
        // if there is no image, hide it
        if (link.image == '')
            linkHTML = linkHTML.replace('link-image', 'link-image hide');

        linkHTML = linkHTML.replace('TITLE', link.title);
        // if there's no description, make title take up the whole space
        if (link.description == '')
            linkHTML = linkHTML.replace('link-title', 'link-title link-title-expand');

        linkHTML = linkHTML.replace('DESCRIPTION', link.description);

        // add the link to the page in the right group, or in the main group if there is no group
        if (link.group == '') {
            document.querySelector('.group-main').innerHTML += linkHTML;
        } else {
            document.querySelector(`.group-${link.group}`).innerHTML += linkHTML;
        }


    });

}