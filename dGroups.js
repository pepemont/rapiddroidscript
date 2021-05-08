var GRPDLG = {
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
            
        /*       
        GROUPS DIALOG IS CREATED HERE
        IT IS AN EASILY CUSTOMIZABLE DIALOG
        CONTROLS ARE "CREATE ONCE / USE MANY" TYPE
        They can be shown/hiden in groups  with ShowItems() / GoneItems() functions
        Differents options and/or buttons are shown 
            based on wether ShowCreateDlg(type) or ShowModifyDlg(object) is used to invoke the dialog
        Local mnemonic identifiers are used to easily manipulates controls
        i.e. this.edtO = 'Options TextEdit", this.spnW = "Width Spinner", etc.
                      
        */    
        dlg = app.CreateDialog( "Add a group" );

        layDlg = app.CreateLayout( "linear", "VCenter,FillXY" );
        layDlg.SetSize( 0.7, -1 );
        dlg.AddLayout( layDlg );
        this.dlg = dlg;
        
        // NAME CONTROLS
        
        txt = app.CreateText( "Name :");
        txt.SetMargins( 0, 0.01, 0, 0 );
        layDlg.AddChild( txt );
        
        edt = app.CreateTextEdit("New group", -1, -1, "FillX" );
        layDlg.AddChild(edt );
        this.edtT = edt;
        
        // TABS LIST CONTROLS
        
        txt = app.CreateText( "Tabs list :");
        txt.SetMargins( 0, 0.01, 0, 0 );
        layDlg.AddChild( txt );
        this.txtL = txt;
        
        edt = app.CreateTextEdit("Tab 1, Tab2, Tab 3", -1, -1, "FillX" );
        layDlg.AddChild(edt );
        this.edtL = edt;
        
        
        // WIDTH CONTROLS
        
        chk = app.CreateCheckBox( "Auto width" );
        chk.SetMargins( 0, 0.01, 0, 0 );
        chk.SetChecked(true);
        layDlg.AddChild( chk );
        this.chkW = chk;
        
        skb = app.CreateSeekBar( 0.6 );
        skb.SetRange( 1.0 );
        skb.SetValue( 0 );
        skb.SetOnTouch(function(value) {
            GRPDLG.chkW.SetChecked(false);
            if ((value > 0.1)|| !GRPDLG.chkW.allowauto  ){GRPDLG.chkW.SetText("Width : " + value.toFixed(1));} 
            else {GRPDLG.chkW.SetChecked(true); GRPDLG.chkW.SetText("Auto width")
            };
      
        });
        layDlg.AddChild( skb );
        this.skbW = skb;
       
        // HEIGHT CONTROLS        
        
        chk = app.CreateCheckBox( "Auto height" );
        chk.SetMargins( 0, 0.01, 0, 0 );
        chk.SetChecked(true);
        layDlg.AddChild( chk );
        this.chkH = chk;
        
        skb = app.CreateSeekBar( 0.6 );
        skb.SetRange( 1.0 );
        skb.SetValue( 0 );
        skb.SetOnTouch(function(value) {
            GRPDLG.chkH.SetChecked(false);
            if ((value > 0.1)|| !GRPDLG.chkH.allowauto  ) {GRPDLG.chkH.SetText("Height : " + value.toFixed(1));} 
            else {GRPDLG.chkH.SetChecked(true); GRPDLG.chkH.SetText("Auto height")
            };
      
        });
        layDlg.AddChild( skb );
        this.skbH = skb;
        
        // OPTIONS CONTROLS
        
        txt = app.CreateText( "Options :" );
        layDlg.AddChild( txt );
        this.txtO = txt;
        
        edt = app.CreateTextEdit("Horizontal", -1, -1,"Fillx" );
        layDlg.AddChild(edt );
        this.edtO = edt;
        
        
        
        spin = app.CreateSpinner( "Select options to add/remove,Option1");
        
        spin.SetOnChange(function(value) {
            el = GRPDLG.edtO.GetText().split(","); i= el.indexOf(value);
            if (i == -1)  {el.push(value); GRPDLG.edtO.SetText(el.join(",")); app.ShowPopup("Option "+value+" added"); this.SetText("Select options to add/remove");}
            else {el.splice(i,1); GRPDLG.edtO.SetText(el.join(",")); app.ShowPopup("Option "+value+" removed");  this.SetText("Select options to add/remove");};
        });
        
           spin.SetMargins( 0, 0.01, 0, 0.02 );
        layDlg.AddChild( spin );
        this.spnO = spin;
        
        
        // BUTTONS 
        
        
      layButtons = app.CreateLayout( "linear", "Horizontal,FillXY" );

   
            btn = app.CreateButton( "Create", 0.3, -1);
            btn.SetOnTouch(this.AddGroup)
       
        layButtons.AddChild(btn);
        this.btn1 = btn;
        
        btn = app.CreateButton( "Update", 0.3, -1);
        btn.SetOnTouch(function() {
            
           //not implemented 
            
            GRPDLG.dlg.Dismiss();
        });
        btn.Gone();
        layButtons.AddChild(btn);
        this.btn2 = btn;
        
        btn = app.CreateButton( "Cancel", 0.2, -1);
        btn.SetOnTouch(function() {
            GRPDLG.dlg.Dismiss();
        });
        layButtons.AddChild(btn);
        
        layDlg.AddChild( layButtons );
          
        
    },
    
    ShowCreateDlg: function (t) {
        
        // ResetDefaultValues
        this.edtT.SetText("New "+t); 
        this.chkW.SetText("Auto width");
        this.chkH.SetText("Auto height");
        this.edtO.SetText("Horizontal");
        
        // Show/hide/reset controls based on CreateObject Params
        
        pNamesList = DSDAT.GetCreateParamsList(t,DSDAT.dsdata)[0];
        
        if  (pNamesList.includes("list"))
        {this.edtL.SetText("Tab 1, Tab 2, Tab 3");
        this.ShowItems(this.txtL,this.edtL);}
        else
        {this.GoneItems(this.txtL,this.edtL);}
        ;
        
                
        if ( (pNamesList.includes("width"))
            )
            {this.skbW.SetValue(0);
       		this.chkW.SetChecked(true);
       		this.chkW.SetEnabled(true);
       		this.chkW.allowauto = true;
       		this.ShowItems(this.chkW,this.skbW)}
            else
            {this.GoneItems(this.chkW,this.skbW)}
            ;
            
        if ( (pNamesList.includes("height"))
            )
            {this.skbH.SetValue(0);
       		this.chkH.SetChecked(true);
       		this.chkH.SetEnabled(true);
       		this.chkH.allowauto = true;
       		this.ShowItems(this.chkH,this.skbH)}
            else
            {this.GoneItems(this.chkH,this.skbH)}
            ;
        if ( (pNamesList.includes("options"))
            )
            {
                d = DSDAT.GetCreateParamsList(t,DSDAT.dsdata);
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
        
            // Select some defaults options based on Object type
        
        switch (t) {
                case "Layout": this.edtO.SetText("Horizontal"); 
                            break;
                            
                            
                case "Tabs": this.edtO.SetText("VCenter"); 
                 
    // quick fix :   options are missing in app.json           
                this.spnO.SetList("Select options to add/remove,VCenter");
                            break;
                case "Scroller": this.edtO.SetText(""); 
                            break;
                default:  this.edtO.SetText("");break;
            };
            
            
            // Display
    
        this.dlg.SetTitle("Add "+t) ;
        this.dlg.customobjecttype = t;
        this.dlg.Show();
        
        
        
        /*
           
        
       
    
       
        */
      
    },
    
    AddGroup: function () {
        
        // get required Params from controls based on Object type
        
        map = new Map();
       
        map.set ('type', "Linear");
        map.set ('list', GRPDLG.edtL.GetText());
        w = GRPDLG.chkW.GetText().split(":"); 
        if (w.length > 1)
        {map.set ('width', w[1]);}
        else
        {map.set ('width', -1);}
        h = GRPDLG.chkH.GetText().split(":"); 
        if (h.length > 1)
        {map.set ('height', h[1]);}
        else
        {map.set ('height', -1);}
        map.set ('options', GRPDLG.edtO.GetText());
        
        
        pValues = [];
     
        pNamesList = DSDAT.GetCreateParamsList(GRPDLG.dlg.customobjecttype,DSDAT.dsdata)[0];
        
        for (p = 0 ; p < pNamesList.length; p++){
        
       		if (!! map.get(pNamesList[p]))
       		{pValues.push(map.get(pNamesList[p]))}
       		
       	
       		
       		else
       		{break;}
       
        };
        
             
            
        b =app["Create"+GRPDLG.dlg.customobjecttype](...pValues);
        DSCB.CurrentTG.AddChild(b);
        GRPDLG.dlg.Dismiss();
        
        a = {};
        
        b.CB = {}
        b.CB.type = GRPDLG.dlg.customobjecttype;
        b.CB.createoptions = pValues;
        b.CB.createparent =  DSCB.CurrentTG.id;
        b.CB.createpage =  DSCB.CurrentPG;
        
        b.CB.setoptions = a;
        b.CB.createname = GRPDLG.edtT.GetText();
       
            
    	DSCB.CurrentTG.SetBackColor("#000000");
	      
        
    
        
        
       // b.CB.createvisible = true;
        
    
    
    
    	//add to current page
	
	DSCB.TargetList[DSCB.CurrentPG].push(b);
	
	
	
	//generate specific layout entries  for tabs
	 if (GRPDLG.dlg.customobjecttype == "Tabs")
	{
	  l = GRPDLG.edtL.GetText().split(",");
	  for (i = 0; i < l.length ; i++)
	     { c = b.GetLayout(l[i]);
	       c.CB = {}
	       c.CB.type = "layTab";
           c.CB.createparent =  b.id;
           c.CB.createpage =  DSCB.CurrentPG;
           c.CB.createname = l[i];
        	     
	       DSCB.TargetList[DSCB.CurrentPG].push(c);
	         
	     };
	     
	  
	  
	    
	    
	};
	
	
	DSCB.LayoutChooser.SetList(DSCB.TargetList[DSCB.CurrentPG].map(e => e.CB.createname+e.id).join(","));
	DSCB.LayoutChooser.SelectItem(b.CB.createname+b.id);
	DSCB.CurrentTG  = b;
    DSCB.CurrentTG.SetBackColor("#313131");
        
        
        
        
        
	     
     
    }
    
};