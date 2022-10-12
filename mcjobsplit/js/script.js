var unique_name = 0;

function addline()
{
    var table = document.getElementById("tablefarm");
    var itr = document.createElement("tr");
    var iname = "tr" + unique_name;
    itr.id = iname;
    itr.setAttribute("class", "tdtr");
    table.appendChild(itr);

    var tds = { "trash" : { input : false, width : "2%" },
                "process" : { input : true, width : "15%" },
                "pthat" : { input : true, width : "10%" },
                "eff" : { input : true, width : "13%" },
                "sec" : { input : true, width : "10%" },
                "target" : { input : true, width : "10%" },
                "evtperjob" : { input : true, width : "10%" },
                "njob" : { input : false, width : "10%" },
                "hour" : { input : false, width : "10%" },
                "evtperfile" : { input : false, width : "10%" },
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
        }
        else if(tds[name].input)
        {
            var iinput = document.createElement("input");
            iinput.setAttribute('type', 'text');
            iinput.id = "iinput_" + name + "_" + iname;
            iinput.setAttribute('onkeyup', 'calc("' + iname + '")');
            itd.appendChild(iinput);
        }
        else
        {
            // itd.innerHTML = iname;
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
