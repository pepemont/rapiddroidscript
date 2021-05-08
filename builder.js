// Experimental : DroidScript Code Builder


    
  var MyColors = {
        primary: "#009688",
        secondary: "#ff90a4ae",
        light: "#eeeeee",
        dark: "#3E4551",
        white: "#ffffffff",
        black: "#ff000000",
        transparent: "#00000000",
        red:  "#f44336",
        green:  "#4caf50",
        blue:  "#4285F4",
        grey: "#9e9e9e",
        pink:  "#e91e63",
        purple: "#9c27b0",
        deepPurple:  "#673ab7",
        indigo:  "#3f51b5",
        lightBlue:  "#03a9f4",
        cyan: "#00bcd4",
        teal:  "#009688",
        lightGreen:  "#8bc34a",
        lime: "#cddc39",
        yellow:  "#ffeb3b",
        amber: "#ffc107",
        orange: "#ff9800",
        deepOrange:  "#ff5722",
        brown:  "#795548",
        blueGrey:"#607d8b"
};



var DSCB = {
    version: 0.1,
    GetVersion: function() {
        return this.version
    },
    CurrentTG: null,
    CurrentPG: null,
    PageList: [],
    TargetList: [],
    ShowItems: function () {
        if (arguments[0].GetVisibility() == "Gone")
        {   for (var i = 0; i < arguments.length; i++) 
            {arguments[i].Show();};
        };
    },
    GoneItems: function () {
        
        if (arguments[0].GetVisibility() == "Show")
        {   for (var i = 0; i < arguments.length; i++) 
            {arguments[i].Gone();};
        };
    },
    Initialize: function () {
        dlg = app.CreateDialog( "Add a screen" );

        layDlg = app.CreateLayout( "linear", "VCenter,FillXY" );
        layDlg.SetSize( 0.7, -1 );
        dlg.AddLayout( layDlg );
        this.dlg = dlg;
        
        txt = app.CreateText( "Name :");
        txt.SetMargins( 0, 0.01, 0, 0 );
        layDlg.AddChild( txt );
        
        edt = app.CreateTextEdit("New group", -1, -1, "FillX" );
        layDlg.AddChild(edt );
        this.edtT = edt;
        
        txt = app.CreateText( "Options :" );
        layDlg.AddChild( txt );
        this.txtO = txt;
        
        edt = app.CreateTextEdit("VCenter", -1, -1,"Fillx" );
        layDlg.AddChild(edt );
        this.edtO = edt;
        
        spin = app.CreateSpinner( "Select options to add/remove,Option1");
        
        spin.SetOnChange(function(value) {
            el = DSCB.edtO.GetText().split(","); i= el.indexOf(value);
            if (i == -1)  {el.push(value); DSCB.edtO.SetText(el.join(",")); app.ShowPopup("Option "+value+" added"); this.SetText("Select options to add/remove");}
            else {el.splice(i,1); DSCB.edtO.SetText(el.join(",")); app.ShowPopup("Option "+value+" removed");  this.SetText("Select options to add/remove");};
        });
        
           spin.SetMargins( 0, 0.01, 0, 0.02 );
        layDlg.AddChild( spin );
        this.spnO = spin;
      layButtons = app.CreateLayout( "linear", "Horizontal,FillXY" );

   
            btn = app.CreateButton( "Create", 0.3, -1);
            btn.SetOnTouch(this.AddScreen)
        layButtons.AddChild(btn);
        this.btn1 = btn;
        
        btn = app.CreateButton( "Update", 0.3, -1);
        btn.SetOnTouch(function() {
            
           //not implemented 
            
            DSCB.dlg.Dismiss();
        });
        btn.Gone();
        layButtons.AddChild(btn);
        this.btn2 = btn;
        
        btn = app.CreateButton( "Cancel", 0.2, -1);
        btn.SetOnTouch(function() {
            DSCB.dlg.Dismiss();
        });
        layButtons.AddChild(btn);
        
        layDlg.AddChild( layButtons );
          
        
    },
    
    ShowCreateDlg: function (t) {
        
        // ResetDefaultValues
        this.edtT.SetText("New "+t); 
        
        this.edtO.SetText("VCenter");
        
        pNamesList = DSDAT.GetCreateParamsList("Layout",DSDAT.dsdata)[0];
        
        if ( (pNamesList.includes("options"))
            )
            {
                d = DSDAT.GetCreateParamsList("Layout",DSDAT.dsdata);
                o = d[1][d[0].indexOf("options")];
                
                l = o.replace(/.+?-/,"").replace(/\|/g,",").replace("FillX/Y","FillX,FillY,FillXY").replace("H/VCenter","HCenter,VCenter")  
                
                l = l.replace(/\:.+?\,/g,",")
                //l = o.split("-")[1];
                
                //l = l.replace(/:.+?,/,"#").replace(/\|/g,",")
                
                
                this.edtO.SetText(l);
                //this.edtO.SetText("");
                this.edtO.SetEnabled(true);
                this.spnO.SetList("Select options to add/remove,"+l);
                this.ShowItems(this.spnO,this.txtO,this.edtO)}
            else
            {this.GoneItems(this.txtO,this.edtO,this.spnO)}
            ;
        
             
        
        switch (t) {
                case "Page": this.edtO.SetText("VCenter"); 
                            break;
                            
                            
                case "Dialog": this.edtO.SetText(""); break;
                 
                case "Card": this.edtO.SetText(""); 
                            break;
                case "Drawer": this.edtO.SetText(""); 
                            break;
                
                default:  this.edtO.SetText("");break;
            };
    
        this.dlg.SetTitle("Add "+t) ;
        this.dlg.customobjecttype = t;
        this.dlg.Show();
    
      
    },    
    
    
    
    AddScreen: function () {
        
      /*  switch (DSCB.dlg.customobjecttype) {
                case "Page": 
                            break;
                            
                            
                case "Dialog":  break;
                 
                case "Card": 
                            break;
                case "Drawer": 
                            break;
                
                default:  this.edtO.SetText("");break;
            }; */
            
    dsob = app.GetObjects();        
    dsob[DSCB.CurrentPG].Gone();
    
    b = app.CreateLayout("linear",DSCB.edtO.GetText());
    
    
    
    layPages.AddChild(b);
    DSCB.CurrentPG = b.id;
    
    b.CB = {};
    b.CB.createname = "Main layout";
	b.CB.pagename = DSCB.edtT.GetText();
    b.CB.createoptions = ["linear",DSCB.edtO.GetText()];
	b.CB.type = "Layout";    
    
    DSCB.CurrentTG = b;
    DSCB.PageList.push(DSCB.CurrentPG);
	DSCB.TargetList[DSCB.CurrentPG] = [];
	DSCB.TargetList[DSCB.CurrentPG].push(DSCB.CurrentTG);
	
	
	//dsob = app.GetObjects();  
	
    DSCB.PageChooser.SetList(DSCB.PageList.map(e => dsob[e].CB.pagename+dsob[e].id).join(","));
	DSCB.PageChooser.SelectItem(b.CB.pagename+b.id);   
	
	
	DSCB.LayoutChooser.SetList(DSCB.TargetList[DSCB.CurrentPG].map(e => e.CB.createname+e.id).join(","));
	DSCB.LayoutChooser.SelectItem(DSCB.CurrentTG.CB.createname+DSCB.CurrentTG.id);
	
        
        DSCB.dlg.Dismiss();
        
      
    },
    
MakeCodeForCurrentPage: function () {
  var objs = app.GetObjects();
  var fns =[]
    var lst = [];
       lst.push("function OnStart()");
         lst.push("{");
         
 lst.push ("lay"+objs[DSCB.CurrentPG].CB.pagename.replace(/ /g,"")
 + DSCB.CurrentPG.slice(1)
 +" = app.CreateLayout ( "
 +JSON.stringify(objs[DSCB.CurrentPG].CB.createoptions).replace("[","").replace("]","")
 +" )");
 lst.push ("");
    
    
  for(var i in objs){
    if ((!!objs[i].CB)  && (objs[i].CB != {}) && (objs[i].CB.createpage == DSCB.CurrentPG) )
    {
        
        if (objs[i].CB.type != "layTab") {
            
            
            // quickfix 
            ab = DSDAT.GetObjectAbbrev(objs[i].CB.type,DSDAT.dsdata);
            
            if (ab == "scr") {ab = "lay"}; 
        
        lst.push (
        //create objet
        ab
        +i.slice(1)
        +" = app.Create"
        +objs[i].CB.type
        +" ( "
        +JSON.stringify(objs[i].CB.createoptions).replace("[","").replace("]","")
        +" );"
        );
        
        //set object properties
        
          if (!!objs[i].CB.setoptions)
    {
    l = objs[i].CB.setoptions;
    
    for (const [key, value] of Object.entries(l)) {
     lst.push (ab
        +i.slice(1)+"."+key+" ( "+JSON.stringify(value).replace("[","").replace("]","")+" );")
    }
    }
    
    
        // prewrite action code
        
        if ((!!objs[i].CB.type) && (objs[i].CB.type != "layTab"))
        {
           if (DSDAT.GetSetOnsList(objs[i].CB.type,DSDAT.dsdata).search("SetOnTouch") != -1)
         { 
          lst.push (ab+i.slice(1)+".SetOnTouch ( " + ab+i.slice(1) +"_OnTouch );"  );  
          fns.push ("\nfunction "+ ab+i.slice(1) +"_OnTouch()\n {\napp.ShowPopup( '"+ab+i.slice(1)+" !' );\n}");
         } ;
         
       
        
        if (DSDAT.GetSetOnsList(objs[i].CB.type,DSDAT.dsdata).search("SetOnChange") != -1)
        
        { 
          lst.push (ab+i.slice(1)+".SetOnChange ( " + ab+i.slice(1) +"_OnChange );"  );  
          fns.push ("\nfunction "+ ab+i.slice(1) +"_OnChange()\n {\napp.ShowPopup( '"+ab+i.slice(1)+" !' );\n}");
         } ;
        
        
        if (DSDAT.GetSetOnsList(objs[i].CB.type,DSDAT.dsdata).search("SetOnLongTouch") != -1)
        
        { 
          lst.push (ab+i.slice(1)+".SetOnLongTouch ( " + ab+i.slice(1) +"_OnLongTouch );"  );  
          fns.push ("\nfunction "+ ab+i.slice(1) +"_OnLongTouch()\n {\napp.ShowPopup( '"+ab+i.slice(1)+" !' );\n}");
         } ;
            
        
        };
        
        //add object to parent
        
        //add name of the page to main layout
        name = "";
        if ( (!!objs[i].CB.createparent) && (!!objs[objs[i].CB.createparent].CB.pagename) )
        {name = objs[objs[i].CB.createparent].CB.pagename.replace(/ /g,"");}
        
        // write AddChild Code
         
        lst.push ("lay"+name
        + objs[i].CB.createparent.slice(1)
        +".AddChild ( "
        + ab
        +i.slice(1)
        +" );"
        );
        lst.push ("");
        
        }
        
        else
        
        //write specific Tabs code
        
        {
        lst.push ("lay"
        + i.slice(1)
        +" = "
        +"tab" + objs[i].CB.createparent.slice(1)
        +'.GetLayout ( "'
        +objs[i].CB.createname
        +'" );'
        );
        lst.push ("");
        }
        
        
    };        
            
         
    }
    
    lst.push ("app.AddLayout ( lay"+objs[DSCB.CurrentPG].CB.pagename.replace(/ /g,"")+ DSCB.CurrentPG.slice(1)+" );");
    lst.push("};");
    lst.push(fns.join("\n"));
    
    return lst.join("\n");
    
    
    
}
    
};