//function isArray ( obj ) { return isObject(obj) && (obj instanceof Array); }
cfg.Holo;
//function isObject ( obj ) { return obj && (typeof obj === "object"); }

app.LoadScript('dsdata.js')
app.LoadScript('dValues.js')

app.LoadScript("builder.js");


app.LoadScript("dChooser.js");
app.LoadScript("dControls.js");
app.LoadScript("dGroups.js");

/* 
Not used anymore : read from app.json 

var ShortCode  = [];
ShortCode["Button"] = "btn";
ShortCode["Text"] = "txt";
ShortCode["TextEdit"] = "edt";
ShortCode["Image"] = "img";
ShortCode["CheckBox"] = "chk";
ShortCode["List"] = "lst";
ShortCode["Spinner"] = "spin";
ShortCode["SeekBar"] = "slb";
ShortCode["Layout"] = "lay";
*/



//Called when application is started.
function OnStart()
{
    
    WelcomeMessage();
	
  //  ADDDLG.Initialize();
DeferInitializeA = true;
//    CTRLDLG.Initialize();
DeferInitializeC = true;
    GRPDLG.Initialize();
    DSCB.Initialize();
    
	// Create Main Page - a layout with objects vertically centered.
	// SIMPLY CHANGE THIS TO CREATE CODE FOR ANOTHER LAYOUT
	
	MyLayoutOptions = "VCenter,FillXY"
	
	
	layPages = app.CreateLayout( "linear", "VCenter,FillXY" );
	layMain = app.CreateLayout( "linear", MyLayoutOptions );
	
	// replicate Options information for Code Builder
	layMain.createoptions = ["linear",MyLayoutOptions];
	layMain.CB = {} ;
	layMain.CB.createname = "Main layout";
	layMain.CB.pagename = "Main page";
	layMain.CB.createoptions = ["linear",MyLayoutOptions];
	layMain.CB.type = "Layout";
	layPages.AddChild(layMain);
	
	//Create a layout for inteface buttons
	
	layMenu = app.CreateLayout( "linear", "Right,Bottom,Horizontal,FillXY,TouchThrough" );	

    
	spin = app.CreateSpinner( "Main page",0.3);
	
	spin.SetOnChange(function(value) {
	   // dsob = app.GetObjects(); 
	    
        for(var i in DSCB.PageList) {
            p = dsob[DSCB.PageList[i]];
            if (p.CB.pagename+p.id == value) 
            {dsob[DSCB.CurrentPG].Gone();
            DSCB.CurrentPG = p.id;
            DSCB.CurrentTG = p;
            DSCB.CurrentTG.Show();
            
            DSCB.LayoutChooser.SetList(DSCB.TargetList[DSCB.CurrentPG].map(e => e.CB.createname+e.id).join(","));
	        DSCB.LayoutChooser.SelectItem(DSCB.CurrentTG.CB.createname+DSCB.CurrentTG.id);
                
                
            };
        };
    });
	
	
    spin.SelectItem( "Main page" );
    layMenu.AddChild( spin );
    DSCB.PageChooser = spin;
    
    spin = app.CreateSpinner( "Choose layout",0.3);
    
    spin.SetOnChange(function(value) {
        for(var i in DSCB.TargetList[DSCB.CurrentPG]) {
            DSCB.TargetList[DSCB.CurrentPG][i].SetBackColor("#000000");
            if (DSCB.TargetList[DSCB.CurrentPG][i].CB.createname+DSCB.TargetList[DSCB.CurrentPG][i].id == value) {DSCB.CurrentTG = DSCB.TargetList[DSCB.CurrentPG][i]; 
                     DSCB.TargetList[DSCB.CurrentPG][i].SetBackColor("#313131");
            };
        };
    });
    
    spin.SelectItem( "Main layout" );
    layMenu.AddChild( spin );
    DSCB.LayoutChooser = spin;
	
	
	//Create a button
	btn = app.CreateButton("Add")
	layMenu.AddChild(btn);
	btn.SetOnTouch( btn_OnTouch );
	
	//Create a button
	btn2 = app.CreateButton("Code")
		btn2.SetOnTouch( btn2_OnTouch );
		btn2.SetOnLongTouch( btn2_OnLongTouch );
	layMenu.AddChild(btn2);
	
	
	//Add layouts to app.	
	app.AddLayout( layPages );
	app.AddLayout( layMenu );
	
	//CTRLDLG.ShowCreateTextDlg();
	
	DSCB.CurrentPG = layMain.id; 
	DSCB.CurrentTG = layMain;
	DSCB.PageList = [];
	DSCB.PageList.push(DSCB.CurrentPG);
	
	DSCB.TargetList[DSCB.CurrentPG] = [];
	DSCB.TargetList[DSCB.CurrentPG].push(layMain);
	DSCB.LayoutChooser.SetList(DSCB.TargetList[DSCB.CurrentPG].map(e => e.CB.createname).join(","));
	
	

	
}



function btn_OnTouch()
{
if (DeferInitializeA)  ADDDLG.Initialize();
DeferInitializeA = false;
ADDDLG.ShowChooserDlg();

 
}


function btn2_OnTouch()
{
// your OnTouch code goes here
  var objs = app.GetObjects();

    var lst = [];
    
    lst.push(DSCB.MakeCodeForCurrentPage());
   
    
    app.Alert( lst.join( "\n" ));
    app.SetClipboardText(  lst.join( "\n" ) );


 
}
    

function btn2_OnLongTouch()
{
   
app.Exit(  );

 
}

function WelcomeMessage()
{
 var msg = [];
    
        msg.push("Rapid Droidscript");
        msg.push("=========================");
        msg.push("");
        msg.push("<app.json> and <app-base.json>");
        msg.push("files are from Symbroson (at)");
        msg.push("https://github.com/SymDSTools/Docs/");
        msg.push("=========================");
           msg.push("");
        msg.push("Beta Preview");
        msg.push(" ");
        msg.push("Use at your own risk ! ");
        msg.push(" ");
        msg.push("Press <Add> button ");
        msg.push("to add objects on screen.");
        msg.push(" ");
       
        msg.push("Press <Code> button");
        msg.push("to see DS code");
        msg.push("and copy it to the Clipboard.");
        msg.push(" ");
        msg.push("LongPress <Code> button");
        msg.push("to exit this app.");
        msg.push(" ");
    
  
        app.Alert( msg.join( "\n" ));
	
}