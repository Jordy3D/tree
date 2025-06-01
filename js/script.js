// TEMPLATE DEFINITIONS

const headerDiv = `<h1 class="header"><TEXT></h1>`;

const linkDiv = `
<a class="link" href="<URL>" target="_blank">
    <div class="link-image">
        <img src="IMAGE_URL" alt="IMAGE_ALT">
    </div>
    <div class="link-title">TITLE</div>
    <div class="link-description">DESCRIPTION</div>
`;

const linkDivWithGithub = `
<div class="link" >
    <div class="link-image">
        <img src="IMAGE_URL" alt="IMAGE_ALT">
    </div>
    <div class="link-title">TITLE</div>
    <div class="link-description">DESCRIPTION</div>
    <div class="external-link-container">
        <a class="site-link tool" href="<URL>" target="_blank">
            Tool
        </a>
        <a class="site-link repo" href="GITHUB_URL" target="_blank">
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f"/>
            </svg>
            Github
        </a>
    </div>
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
            loadHeader(data);
            loadUser(data);
            loadLinks(data);
        });
}

function loadHeader(data) {
    console.log('Loading Header...');
    var headerHTML = headerDiv;

    headerHTML = headerHTML.replace('<TEXT>', data.page.headerText);

    document.querySelector('.header').innerHTML += headerHTML;
}

function loadUser(data) {
    console.log('Loading User...');
    var userHTML = userDiv;

    userHTML = userHTML.replace('IMAGE_URL', data.userInfo.image);
    userHTML = userHTML.replace('IMAGE_ALT', data.userInfo.name);
    userHTML = userHTML.replace('NAME', data.userInfo.name);
    userHTML = userHTML.replace('DESCRIPTION', data.userInfo.description);

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

        if (link.github)
            linkHTML = linkDivWithGithub

        var linkGroup = link.group;
        var linkGroupSafe = linkGroup.replace(' ', '-');
        var linkClass = link.class;

        linkHTML = linkHTML.replace('<URL>', link.url);

        linkHTML = linkHTML.replace('IMAGE_URL', link.image);
        linkHTML = linkHTML.replace('IMAGE_ALT', link.title);
        if (link.image == '')
            linkHTML = linkHTML.replace('link-image', 'link-image hide');

        linkHTML = linkHTML.replace('TITLE', link.title);
        if (link.description == '') // if there's no description, make title take up the whole space
            linkHTML = linkHTML.replace('link-title', 'link-title link-title-expand');

        linkHTML = linkHTML.replace('DESCRIPTION', link.description);

        if (link.github)
            linkHTML = linkHTML.replace('GITHUB_URL', link.github);
        else
            linkHTML = linkHTML.replace('<a class="link-github" href="GITHUB_URL" target="_blank">', '');

        var queryTarget = '.group-main';
        if (linkGroupSafe != '') // if there's a group, add to appropriate group
            queryTarget = `.group-${linkGroupSafe}`;

        // if there's a class, add to appropriate group
        if (linkClass)
            queryTarget += `.${linkClass}`;

        document.querySelector(queryTarget).innerHTML += linkHTML;


    });

}