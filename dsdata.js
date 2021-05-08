function readAsJson(path)
{
    if (app.FileExists(path))
      return JSON.parse(app.ReadFile(path));
    app.ShowPopup(path+" does not exist");
    return undefined;
}



DSDAT = {
dsdata: readAsJson("app.json"),
dsbase: readAsJson("app-base.json"),

GetCreateParamsList: function (objtype,jsondata)
{
r = []
r.push(jsondata["Create" + objtype].pNames)
r.push(jsondata["Create" + objtype].pTypes)

return r
},

GetParamsList: function (objtype, method, jsondata,jsonbase)
{
r = []
p = jsondata["Create" + objtype].subf[method]


if (typeof(p) !=  'object')
p  = jsonbase[p];

r.push(p.pNames);
r.push(p.pTypes);

r.push(jsondata["Create" + objtype].subf[method].pNames)
r.push(jsondata["Create" + objtype].subf[method].pTypes)

return r
},


GetObjectsList: function (jsondata)
{
excludelist=["Layout","Tabs","Scroller","Dialog","Switch"]
objectslist  = []
arraydata = Object.entries(jsondata) ;
	
 for (var i = 0 ; i < arraydata.length ; i++) {
 
 if ((!!arraydata[i][1].subf) 
 && (!!arraydata[i][1].subf.Gone) 
 && (!excludelist.includes(arraydata[i][1].name.slice(6))) )
 objectslist.push((arraydata[i][1].name.slice(6)))   
 };
 return objectslist.join(",");
 
 
} ,

GetObjectAbbrev: function (objtype,jsondata)
{

return jsondata["Create" + objtype].abbrev ;


} ,

GetMethodsList: function (objtype, jsondata)
{
excludelist = ["SetText", "SetFile"]
methodslist  = []
arraydata = Object.entries(jsondata["Create"+objtype].subf) ;
for (var i = 0 ; i < arraydata.length ; i++) {
 
if ((arraydata[i][0].slice(0,3) == "Set") 
&&  (arraydata[i][0].slice(0,5) != "SetOn") 
&& (!excludelist.includes(arraydata[i][0]) )
)
methodslist.push(arraydata[i][0])
}
return methodslist.join(",");
},

GetSetOnsList: function (objtype, jsondata)
{

methodslist  = []
arraydata = Object.entries(jsondata["Create"+objtype].subf) ;
for (var i = 0 ; i < arraydata.length ; i++) {
 
if (arraydata[i][0].slice(0,5) == "SetOn")

methodslist.push(arraydata[i][0])
}
return methodslist.join(",");
}

 
 }