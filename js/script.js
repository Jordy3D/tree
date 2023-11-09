// TEMPLATE DEFINITIONS

const linkDiv = `
<a class="link" href="URL" target="_blank">
    <div class="link-image">
        <img src="IMAGE_URL" alt="IMAGE_ALT">
    </div>
    <div class="link-title">TITLE</div>
    <div class="link-description">DESCRIPTION</div>
`;
const userDiv = `
<div class="user">
    <div class="user-image">
        <img src="IMAGE_URL" alt="IMAGE_ALT">
    </div>
    <div class="user-name">NAME</div>
    <div class="user-description">DESCRIPTION</div>
</div>`;

loadData();

function loadData() {
    console.log('Loading Data...');
    // load the data from data.json
    fetch('tree.json')
        .then(response => response.json())
        .then(data => {
            loadUser(data);
            loadLinks(data);
        });
}

function loadUser(data) {
    console.log('Loading User...');
    var userHTML = userDiv;

    userHTML = userHTML.replace('IMAGE_URL', data.image);
    userHTML = userHTML.replace('IMAGE_ALT', data.name);
    userHTML = userHTML.replace('NAME', data.name);
    userHTML = userHTML.replace('DESCRIPTION', data.description);

    document.querySelector('.user-info').innerHTML += userHTML;
}

function loadLinks(data) {
    console.log('Loading Links...');
    var linksContainer = document.querySelector('.links');
    var links = data.links;
    
    var groupTags = [];

    // create groups
    links.forEach(link => {
        var linkGroup = link.group;
        var linkGroupSafe = linkGroup.replace(' ', '-');
        var linkClass = link.class;

        var groupTag = `${linkGroup} ${linkClass}`;

        // if groups doesn't contain (group null) or (group class), add it to groups
        if (!groupTags.includes(groupTag)) {
            groupTags.push(groupTag);

            if (linkGroup != '')
                var groupHTML = `<div class="group group-${linkGroupSafe}"><h2 class="group-header">${linkGroup}</h2></div>`;
            else
                var groupHTML = `<div class="group group-main"></div>`;

            if (linkClass)
                groupHTML = groupHTML.replace('group', `group ${linkClass}`);

            linksContainer.innerHTML += groupHTML;
        }
    });

    // create links
    links.forEach(link => {
        var linkHTML = linkDiv;

        var linkGroup = link.group;
        var linkGroupSafe = linkGroup.replace(' ', '-');
        var linkClass = link.class;

        linkHTML = linkHTML.replace('URL', link.url);

        linkHTML = linkHTML.replace('IMAGE_URL', link.image);
        linkHTML = linkHTML.replace('IMAGE_ALT', link.title);
        if (link.image == '')
            linkHTML = linkHTML.replace('link-image', 'link-image hide');

        linkHTML = linkHTML.replace('TITLE', link.title);
        if (link.description == '') // if there's no description, make title take up the whole space
            linkHTML = linkHTML.replace('link-title', 'link-title link-title-expand');

        linkHTML = linkHTML.replace('DESCRIPTION', link.description);

        var queryTarget = '.group-main';
        if (linkGroupSafe != '') // if there's a group, add to appropriate group
            queryTarget = `.group-${linkGroupSafe}`;

        // if there's a class, add to appropriate group
        if (linkClass)
            queryTarget += `.${linkClass}`;

        document.querySelector(queryTarget).innerHTML += linkHTML;


    });

}