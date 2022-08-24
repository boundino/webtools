
function parseurl(url)
{
    // https://github.com/boundino/Bfinder/commit/ca6b2a615cc3d0cffd8ab3c7adca600c350a2768
    var obj = {
        user : "",
        repo : "",
        commit : "",
    };
    const strs = url.split('/');
    var index_interest = -1;
    var tree_or_commit = "";
    for(let i = 0; i < strs.length; i++)
    {
        if(strs[i] === "github.com")
        { index_interest = 0; }
        switch(index_interest)
        {
            case 1:
            obj.user = strs[i];
            break;
            case 2:
            obj.repo = strs[i]
            break;
            case 3:
            tree_or_commit = strs[i];
            break;
            case 4:
            obj.commit = strs[i];
            break;
            default:
            ;
        }
        if(index_interest > -1) index_interest++;
    }
    return obj;
}


function compare()
{
    var url1 = document.getElementById('url1').value;
    var url2 = document.getElementById('url2').value;
    var obj1 = parseurl(url1);
    var obj2 = parseurl(url2);
    // console.log(obj1.commit, " | ", obj2.commit);
    var url_compare = "https://github.com/" + obj1.user + "/" + obj1.repo + "/compare/" + obj1.commit + "..."
        + obj2.user + ":" + obj2.repo + ":" + obj2.commit;
    // console.log(url_compare);

    window.open(url_compare, '_blank');
}

function swap()
{
    var middle = document.getElementById('url1').value;
    document.getElementById('url1').value = document.getElementById('url2').value;
    document.getElementById('url2').value = middle;
}
