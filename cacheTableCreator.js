


// N => 2^N is the size of the whole cache
// associativity => 2 way set associative, 4 way set associative etc... 
// memAccessList => list of all the addresses to be accessed
//    (as a list of string)
function createCache(N, associativity, memAccessList) {

    setCount = N / associativity;
    setSize = N / setCount;
    
    var cache = new Array(setCount);
    for (var i = 0; i < setCount; i++) {
        cache[i] = new Array(associativity);
    }
    
    var cacheTable = new Array();
    var missHitTable = new Array();

    for (var i = 0; i < memAccessList.length; i++) {
        ad = memAccessList[i];
        //index = getAddressIndex();
        // this function will be implemented later
        index = ad;
        //tag = getTag();
        tag = ad;
        set = index % setCount;

        var isSetFull = true;
        var isHit = false;

        for (var block = 0; block < setSize; block++) {
            if (cache[set][block] == null) {
                cache[set][block] = ad;
                isSetFull = false;
                break;
            }
            else if (cache[set][block] == ad) {
                isHit = true;
                isSetFull = false;
                break;
            }
        }

        if (isSetFull) {
            indexToReplace = Math.floor(Math.random() * setSize);
            cache[set][indexToReplace] = ad;
        }

        // adding the current state of cache to the array cacheTable
        // x = deep copy of cache 
        x = JSON.parse(JSON.stringify(cache));
        cacheTable.push(x);

        // saving the hit or miss data 
        missHitTable.push(isHit ? "hit" : "miss");
    }

    console.log(cacheTable);
    console.log(missHitTable);

    missHitTable = JSON.parse(JSON.stringify(missHitTable));
    // console.log(missHitTable);

    return ([cacheTable, missHitTable]);

}
var x = [1, 5, 8, 15, 5, 2, 8, 10, 9];
y = [1,1,1,2,3];
createCache(8, 4, x);
// console.log(createCache(8, 4, [1, 5, 8, 15, 5, 2, 8, 10, 9]));
