var unique_name = 0;

function addline()
{
    var table = document.getElementById("tablefarm");
    var itr = document.createElement("tr");
    var iname = "tr" + unique_name;
    itr.id = iname;
    itr.setAttribute("class", "tdtr");
    table.appendChild(itr);

    var tds = { "trash" : { input : false },
                "process" : { input : true },
                "pthat" : { input : true },
                "eff" : { input : true },
                "sec" : { input : true },
                "target" : { input : true },
                "evtperjob" : { input : true },
                "njob" : { input : false },
                "hour" : { input : false },
                "evtperfile" : { input : false },
              };

    for(let name in tds)
    {
        var itd = document.createElement("td");
        itd.id = "itd_" + name + "_" + iname;
        // itd.style.width = tds[name].width;
        if(name === "trash")
        {
            itd.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
            itd.setAttribute("style", "cursor: pointer;");
            itd.setAttribute('onclick', 'document.getElementById("'+itr.id+'").remove();');
            itd.setAttribute("class", "tdcsvskip");
        }
        else if(tds[name].input)
        {
            var iinput = document.createElement("input");
            iinput.setAttribute('type', 'text');
            iinput.id = "iinput_" + name + "_" + iname;
            iinput.setAttribute('onkeyup', 'calc("' + iname + '")');
            itd.appendChild(iinput);
        }
        itr.appendChild(itd);
    }
    calc(iname);
    unique_name++;
}

function calc(iname)
{
    var eff = parseFloat(document.getElementById("iinput_eff_" + iname).value);
    var sec = parseFloat(document.getElementById("iinput_sec_" + iname).value);
    var target = parseFloat(document.getElementById("iinput_target_" + iname).value);
    var evtperjob = parseFloat(document.getElementById("iinput_evtperjob_" + iname).value);

    if(eff !== 0 && evtperjob !== 0)
    {
        var njob = target / eff / evtperjob,
            hour = sec * evtperjob * eff / 3600,
            evtperfile = evtperjob * eff;
        document.getElementById("itd_njob_" + iname).innerHTML = njob.toFixed(0);
        document.getElementById("itd_hour_" + iname).innerHTML = hour.toFixed(2);
        document.getElementById("itd_evtperfile_" + iname).innerHTML = evtperfile.toFixed(0);
    }
}

function exportdata(filename)
{
    var csv = [];
    var rows = document.getElementById('tablefarm').querySelectorAll("table tr");
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td:not(.tdcsvskip), th:not(.tdcsvskip)");
        for (var j = 0; j < cols.length; j++) {
            row.push(cols[j].firstChild.value || cols[j].innerText);
        }
        csv.push(row.join(","));
    }
    csv = csv.join("\n");
    downloadCSVFile(csv, filename);
}

function downloadCSVFile(csv_data, filename)
{
     CSVFile = new Blob([csv_data], { type: "text/csv" });
    var temp_link = document.createElement('a');
    temp_link.download = filename;
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);
    temp_link.click();
    document.body.removeChild(temp_link);
}

