export function appendCheckBoxTo(container, isChecked) {
    let trackFilter = document.createElement('div');
    trackFilter.id = 'track-filter'; trackFilter.className = 'card track-filter';

    let input = document.createElement('input');
    input.type = 'checkbox'; input.id = 'scales'; input.name = 'scales'; 
    input.checked = isChecked; input.className = 'track-filter-checkbox';

    let span = document.createElement('span'); span.className = 'track-filter-span';
    span.innerHTML = 'Reverse'; 
    trackFilter.appendChild(input); trackFilter.appendChild(span);

    container.insertBefore(trackFilter, container.childNodes[0]);
}

//<div id="track-filter" class="card track-filter">
//  <input type="checkbox" id="scales" name="scales" checked="" class="track-filter-checkbox">
//  <span class="track-filter-span">Reverse</span>
//</div>