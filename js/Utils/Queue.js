export var _trackQueue = newQueue();

export function newQueue() {
    const queue = {
        headIdx: 0,
        tailIdx: 0,
        elts: [],
        enqueue: (elt) => {
            queue.elts[queue.tailIdx++] = elt;
            queue.onchange();
        },
        dequeue: () => {
            if (queue.headIdx == queue.tailIdx) {
                throw new Error("Queue is empty");
            }
            queue.onchange();
            let result = queue.elts[0]
            if (queue.elts?.length > 0) { 
                queue.elts.shift();
                queue.tailIdx--;
            }

            return result;
        },
        peek: () => { console.log('peeking. len: ' + queue.elts.length); if (queue.elts?.length > 0) { return queue.elts[queue.elts.length-1] }; return undefined; },
        size: () => queue.tailIdx - queue.headIdx,
        isEmpty: () => queue.tailIdx == queue.headIdx,
        peekAll: () => {
            return 'Queue: ' + queue.elts;
        },
        peekObjectsIds: () => {
            return 'Queue: ' + queue.elts?.map(a => a.id).join(', ');
        },
        peekObjectsArtistsAndTitles: () => {
            return 'Queue: ' + queue.elts?.map(a => a.artist + ' - ' + a.title).join(', ');
        },
        onchange: () => { }
    };
    return queue;
}

export function peekObjectsArtistsAndTitles()
{
    return 'Queue: ' + _trackQueue.elts?.map(a => a.artist + ' - ' + a.title).join(', ');
}

