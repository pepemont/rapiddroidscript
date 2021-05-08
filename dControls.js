var CTRLDLG = {
     
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
     /*       
        CONTROLS DIALOG IS CREATED HERE
        IT IS AN EASILY CUSTOMIZABLE DIALOG
        CONTROLS ARE "CREATE ONCE / USE MANY" TYPE
        They can be shown/hiden in groups  with ShowItems() / GoneItems() functions
        Differents options and/or buttons are shown 
            based on wether ShowCreateDlg(type) or ShowModifyDlg(object) is used to invoke the dialog
        Local mnemonic identifiers are used to easily manipulates controls
        i.e. this.edtO = 'Options TextEdit", this.spnW = "Width Spinner", etc.
                      
        */ 
    Initialize: function () {
        dlg = app.CreateDialog( "Control properties" );

        layDlg = app.CreateLayout( "linear", "VCenter,FillXY" );
        layDlg.SetSize( 0.7, -1 );
        dlg.AddLayout( layDlg );
        this.dlg = dlg;
        
        
        var tabs = app.CreateTabs( "Basic,Advanced,Expert", 0.7, -1, "VCenter" );
        // tabs.SetOnChange( tabs_OnChange ); 
        layDlg.AddChild( tabs ); 
        
        layBasic = tabs.GetLayout( "Basic" );
        layAdvanced = tabs.GetLayout( "Advanced" );
        layExpert = tabs.GetLayout( "Expert" ); 
        
                
        txt = app.CreateText( "Text :");
        txt.SetMargins( 0, 0.01, 0, 0 );
        layBasic.AddChild( txt );
        this.txtT = txt;
        
        edt = app.CreateTextEdit(this.text, -1, -1, "FillX" );
        layBasic.AddChild(edt );
        this.edtT = edt;
        
        chk = app.CreateCheckBox( "Default textsize" );
        chk.SetMargins( 0, 0.01, 0, 0 );
        chk.SetChecked(true);
        layBasic.AddChild( chk );
        this.chkT = chk;
        
        skb = app.CreateSeekBar( 0.6 );
        skb.SetRange(40);
        skb.SetValue( 0 );
        skb.SetOnTouch(function(value) {
            CTRLDLG.chkT.SetChecked(false);
            if ((value > 1)|| !CTRLDLG.chkT.allowauto) {CTRLDLG.chkT.SetText("Text size : " + value.toFixed(0));} 
            else {CTRLDLG.chkT.SetChecked(true); CTRLDLG.chkT.SetText("Default text size")
            };
        });
        layBasic.AddChild( skb );
        this.skbT = skb;
        
        chk = app.CreateCheckBox( "Auto width" );
        chk.SetMargins( 0, 0.01, 0, 0 );
        chk.SetChecked(true);
        layBasic.AddChild( chk );
        this.chkW = chk;
        
        skb = app.CreateSeekBar( 0.6 );
        skb.SetRange( 1.0 );
        skb.SetValue( 0 );
        skb.SetOnTouch(function(value) {
            CTRLDLG.chkW.SetChecked(false);
            if ((value > 0.1)|| !CTRLDLG.chkW.allowauto  ){CTRLDLG.chkW.SetText("Width : " + value.toFixed(1));} 
            else {CTRLDLG.chkW.SetChecked(true); CTRLDLG.chkW.SetText("Auto width")
            };
      
        });
        layBasic.AddChild( skb );
        this.skbW = skb;
       
        
        chk = app.CreateCheckBox( "Auto height" );
        chk.SetMargins( 0, 0.01, 0, 0 );
        chk.SetChecked(true);
        layBasic.AddChild( chk );
        this.chkH = chk;
        
        skb = app.CreateSeekBar( 0.6 );
        skb.SetRange( 1.0 );
        skb.SetValue( 0 );
        skb.SetOnTouch(function(value) {
            CTRLDLG.chkH.SetChecked(false);
            if ((value > 0.1)|| !CTRLDLG.chkH.allowauto  ) {CTRLDLG.chkH.SetText("Height : " + value.toFixed(1));} 
            else {CTRLDLG.chkH.SetChecked(true); CTRLDLG.chkH.SetText("Auto height")
            };
      
        });
        layBasic.AddChild( skb );
        this.skbH = skb;
        
        txt = app.CreateText( "Options :" );
        layBasic.AddChild( txt );
        this.txtO = txt;
        
        edt = app.CreateTextEdit(this.options, -1, -1,"Fillx" );
        layBasic.AddChild(edt );
        this.edtO = edt;
        
        spin = app.CreateSpinner( "Select options to add/remove,FontAwesome,Html,Monospace,Normal,Aluminium,Gray,Lego,SingleLine,Custom,AutoShrink,AutoSize,NoPad,FillX,FillY,FillXY,NoSound");
        spin.SetOnChange(function(value) {
            el = CTRLDLG.edtO.GetText().split(","); i= el.indexOf(value);
            if (i == -1)  {el.push(value); CTRLDLG.edtO.SetText(el.join(",")); app.ShowPopup("Option "+value+" added"); this.SetText("Select options to add/remove");}
            else {el.splice(i,1); CTRLDLG.edtO.SetText(el.join(",")); app.ShowPopup("Option "+value+" removed");  this.SetText("Select options to add/remove");};
        });
        
        spin.SetMargins( 0, 0.01, 0, 0.02 );
        layBasic.AddChild( spin );
        this.spnO = spin;
        
        chk = app.CreateCheckBox( "Default text color" );
        chk.SetMargins( 0, 0.02, 0, 0 );
        chk.SetChecked(true);
        layAdvanced.AddChild( chk );
        this.chkC = chk;
        
        spin = app.CreateSpinner("Choose custom text color,Default text color,White,Black,Red,Blue,Green,Yellow");
        spin.SetOnChange(function(value) {
            
            if (value != "Choose custom text color") {
            
            
              if (value == "Default text color") {if (CTRLDLG.chkC.allowauto){CTRLDLG.chkC.SetChecked(true); CTRLDLG.chkC.SetText("Default text color");}} else
              {CTRLDLG.chkC.SetChecked(false); CTRLDLG.chkC.SetText("Text color : "+value);}
              this.SetText("Choose custom text color");
            };
            
            
        });
       
        spin.SetMargins( 0, 0, 0, 0.01 );
        layAdvanced.AddChild( spin );
        this.spnC = spin;
        
        chk = app.CreateCheckBox( "Default back color" );
        chk.SetMargins( 0, 0.01, 0, 0 );
        chk.SetChecked(true);
        layAdvanced.AddChild( chk );
        this.chkB = chk;
        
        spin = app.CreateSpinner( "Choose custom back color,Default back color,White,Black,Red,Blue,Green,Yellow");
        spin.SetOnChange(function(value) {
             
            if (value != "Choose custom back color") {
            
            
              if (value == "Default back color") {if (CTRLDLG.chkB.allowauto){CTRLDLG.chkB.SetChecked(true); CTRLDLG.chkB.SetText("Default back color");}} else
              {CTRLDLG.chkB.SetChecked(false); CTRLDLG.chkB.SetText("Back color : "+value);}
              this.SetText("Choose custom back color");
            };
        });
        spin.SetMargins( 0, 0, 0, 0.01 );
        layAdvanced.AddChild( spin );
        this.spnB = spin;
        
        chk = app.CreateCheckBox( "Default margins" );
        chk.SetMargins( 0, 0.01, 0, 0 );
        chk.SetChecked(true);
        layAdvanced.AddChild( chk );
        this.chkM = chk;
        
        
        skb = app.CreateSeekBar( 0.6 );
        skb.SetRange( 1.0 );
        skb.SetValue( 0 );
        skb.SetOnTouch(function(value) {
            if (value > 0.1) {CTRLDLG.txt1.SetText("Width : " + value.toFixed(1));} else {CTRLDLG.txt1.SetText("Width : -1")};
        });
        layAdvanced.AddChild( skb );
        this.skbM1 = skb;
        
        skb = app.CreateSeekBar( 0.6 );
        skb.SetRange( 20 );
        skb.SetValue( 0 );
        skb.SetOnTouch(function(value) {
            if (value > 1) {CTRLDLG.txt1.SetText("Width : " + value.toFixed(1));} else {CTRLDLG.txt1.SetText("Auto Width")};
        });
        layAdvanced.AddChild( skb );
        this.skbM2 = skb;
        
        skb = app.CreateSeekBar( 0.6 );
        skb.SetRange( 1.0 );
        skb.SetValue( 0 );
        // skb.SetOnTouch( skb_OnTouch );
        skb.SetOnTouch(function(value) {
            if (value > 0.1) {CTRLDLG.txt1.SetText("Width : " + value.toFixed(1));} else {CTRLDLG.txt1.SetText("Width : -1")};
        });
        layAdvanced.AddChild( skb );
        this.skbM3 = skb;
        
        skb = app.CreateSeekBar( 0.6 );
        skb.SetRange( 1.0 );
        skb.SetValue( 0 );
        // skb.SetOnTouch( skb_OnTouch );
        skb.SetOnTouch(function(value) {
            if (value > 0.1) {CTRLDLG.txt1.SetText("Width : " + value.toFixed(1));} else {CTRLDLG.txt1.SetText("Width : -1")};
        });
        layAdvanced.AddChild( skb );
        this.skbM4 = skb;

        chk = app.CreateCheckBox( "Enabled" );
        chk.SetMargins( 0, 0.01, 0, 0.02 );
        chk.SetChecked(true);
        layAdvanced.AddChild( chk );
        this.chkE = chk;
        
        txt = app.CreateText( "List of properties :" );
        layExpert.AddChild( txt );
        
        txt = app.CreateText( "(Press <LongTouch> to remove an item)" );
        layExpert.AddChild( txt );
        txt = app.CreateText( "(Items marked with * can't be removed)" );
        layExpert.AddChild( txt );
        
        
        lst = app.CreateList( "", 0.7, 0.4 );
        lst.SetOnLongTouch( function(item) {
        
        if (item.indexOf("*") == -1) {CTRLDLG.lstE.RemoveItem(item);}
        
        });
        lst.SetOnTouch( function(item) {
        
        //ExpertSet(CTRLDLG.dlg.customobjecttype,value);
        //  ExpertSet(CTRLDLG.dlg.customobjecttype,"SetBackColor",["red"]);
          
          v = [];
          t = item.replace("\*","");
          tc = t.replace(/ \(.+/,"");
          tp = t.replace(/.+\( /,"");
          tp = tp.slice(0,tp.length-1).trim();
          vp = tp.split(",");
          
         
          ExpertSet(CTRLDLG.dlg.customobjecttype,tc,vp);
          
          
          
          
          
        });
        layExpert.AddChild( lst );
        this.lstE = lst

        
        spin = app.CreateSpinner( "Choose a property to add,");
        spin.SetOnChange(function(value) { 
            
            if (value != "Choose a property to add")
            ExpertSet(CTRLDLG.dlg.customobjecttype,value);
         
                    });
        spin.SetMargins( 0, 0, 0, 0.01 );
        spin.SelectItem( "Choose a property to add" );
        layExpert.AddChild( spin );
        this.spnA = spin;
        
        
        
        layButtons = app.CreateLayout( "linear", "Horizontal,FillXY" );

        btn = app.CreateButton( "Create", 0.3, -1);
        btn.SetOnTouch(this.AddControl);
        layButtons.AddChild(btn);
        this.btn1 = btn;
        
        btn = app.CreateButton( "Update", 0.3, -1);
        btn.SetOnTouch (this.UpdateControl);
        btn.Gone();
        layButtons.AddChild(btn);
        this.btn2 = btn;
        
        btn = app.CreateButton( "Cancel", 0.2, -1);
        btn.SetOnTouch(function() {CTRLDLG.dlg.Dismiss(); });
        layButtons.AddChild(btn);
        
                
        
        btn = app.CreateButton( "Delete", 0.2, -1);
        btn.SetOnTouch(function() {
            
            CTRLDLG.handle.createisdeleted = true;
            CTRLDLG.handle.CB = {}
            
            CTRLDLG.handle.Gone();
            
            CTRLDLG.dlg.Dismiss();
        });
        layButtons.AddChild(btn);
        this.btn3 = btn;
        
        layDlg.AddChild( layButtons );
      
        
        
    },
    
    ResetDefaultValues: function () {
        this.edtT.SetText("New object"); 
        
        this.chkT.SetText("Default text size");
        
        
                
        this.chkW.SetText("Auto width");
                
        this.chkH.SetText("Auto height");
                
        this.edtO.SetText("Normal");
        
        
        this.chkC.SetText("Default text color");
        
        
        this.chkB.SetText("Default back color"); 
        
                
        this.chkM.SetText("Default margins");  
        this.skbM1.SetValue(0);
        this.skbM2.SetValue(0);
        this.skbM3.SetValue(0);
        this.skbM4.SetValue(0);
           
                
        this.chkM.Gone();
        this.skbM1.Gone();
        this.skbM2.Gone();
        this.skbM3.Gone();
        this.skbM4.Gone();
        
        this.lstE.SetList("");
        
        this.chkE.SetChecked(true);
    },
    ShowCreateDlg: function (t) {
        
        this.ResetDefaultValues();
        
        pNamesList = DSDAT.GetCreateParamsList(t,DSDAT.dsdata)[0];
        
        if  (pNamesList.includes("text")) {this.edtT.SetText("New "+t)};
        if  (pNamesList.includes("file")) {this.edtT.SetText("/Sys/Img/Droid1.png")};    
        if  (pNamesList.includes("list")) {this.edtT.SetText("New "+t + ",An item,An other item")};
        
        if ( (pNamesList.includes("text"))
            || (pNamesList.includes("file"))   
            || (pNamesList.includes("list")))
            {this.ShowItems(this.txtT,this.edtT)}
            else
            {this.GoneItems(this.txtT,this.edtT)}
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
                
                l = o.replace(/.+?-/,"").replace(/\|/g,",").replace("FillX/Y","FillX,FillY,FillXY") 
                
                l = l.replace(/\:.+?\,/g,",")
                
                
                
                this.edtO.SetText("");
                this.edtO.SetEnabled(true);
                this.spnO.SetList("Select options to add/remove,"+l);
                this.ShowItems(this.spnO,this.txtO,this.edtO)}
            else
            {this.GoneItems(this.txtO,this.edtO,this.spnO)}
            ;
        
                if (DSDAT.GetMethodsList(t,DSDAT.dsdata).search("SetTextSize") != -1)
                {this.skbT.SetValue(0);
                this.chkT.SetChecked(true);
                this.chkT.allowauto = true;
                this.ShowItems(this.chkT,this.skbT);} 
                else
                {this.GoneItems(this.chkT,this.skbT);}
                
             
                
                if (DSDAT.GetMethodsList(t,DSDAT.dsdata).search("SetTextColor") != -1)
                {this.chkC.SetChecked(true);
                this.chkC.allowauto = true;
                this.ShowItems(this.chkC,this.spnC);} 
                else
                {this.GoneItems(this.chkC,this.spnC);}
                
                if (DSDAT.GetMethodsList(t,DSDAT.dsdata).search("SetBackColor") != -1)
                {this.chkB.SetChecked(true);
                this.chkB.allowauto = true;
                this.ShowItems(this.chkB,this.spnB);} 
                else
                {this.GoneItems(this.chkB,this.spnB);}
                
                if (DSDAT.GetMethodsList(t,DSDAT.dsdata).search("SetEnabled") != -1)
                {this.ShowItems(this.chkE);} 
                else
                {this.GoneItems(this.chkE);}
                
               
        CTRLDLG.spnA.SetList("Choose a property to add,"+DSDAT.GetMethodsList(t,DSDAT.dsdata));
    //     this.spnA.SelectItem( "Choose a property to add" );
    
     
        
                    
        this.btn1.Show();
        this.btn2.Gone();
        this.btn3.Gone();
        
        //this.txtO.Show();
        //this.edtO.Show();
        //this.spnO.Gone();
        
        
       // this.edtT.SetText(DSDAT.GetCreateParamsList(t,DSDAT.dsdata));
        
        this.dlg.SetTitle(t+" properties");
        this.dlg.customobjecttype = t;
        this.dlg.Show();
      
    },
    ShowModifyDlg: function (h) {
        
    
        
        this.dlg.customobjecttype = h.CB.type ;
        
        pNamesList = DSDAT.GetCreateParamsList(this.dlg.customobjecttype,DSDAT.dsdata)[0];
        
       
        
        for (p = 0 ; p < pNamesList.length; p++){
        
       		switch (pNamesList[p]) {
       		case "text" : this.txtT.SetText("Text :");
       		this.edtT.SetText(h.CB.createoptions[p]);
       		break;
       		    
       		case "file" : this.txtT.SetText("File :");
       		this.edtT.SetText(h.CB.createoptions[p]);
       		break;


       		case "list" : this.txtT.SetText("Text :");
       		this.edtT.SetText(h.CB.createoptions[p]);
       		break;
       		    
       		case "width" :
       		if    (h.CB.createoptions[p] != -1)
       		{this.chkW.SetText("Width : "+ h.CB.createoptions[p]);
       		this.skbW.SetValue(h.CB.createoptions[p]);
       		this.chkW.SetChecked(false);
       		this.chkW.SetEnabled(false);
       		this.chkW.allowauto = false;}
       		else
       		{this.chkW.SetText("Auto width");
       		this.skbW.SetValue(0);
       		this.chkW.SetChecked(true);
       		this.chkW.SetEnabled(true);
       		this.chkW.allowauto = true;}
       		break;
       		
       		case "height" :
       		if    (h.CB.createoptions[p] != -1)
       		{this.chkH.SetText("Height : "+ h.CB.createoptions[p]);
       		this.skbH.SetValue(h.CB.createoptions[p]);
       		this.chkH.SetChecked(false);
       		this.chkH.SetEnabled(false);
       		this.chkH.allowauto = false;}
       		else
       		{this.chkH.SetText("Auto height");
       		this.skbH.SetValue(0);
       		this.chkH.SetChecked(true);
       		this.chkH.SetEnabled(true);
       		this.chkH.allowauto = true;}
       		break;
       	 		    
       		 
       		    
       		case "options" : 
       		    if (!!h.CB.createoptions[p]) 
       		    {this.edtO.SetText(h.CB.createoptions[p]);}
       		    else
       		    {this.edtO.SetText("");}
       		    this.edtO.SetEnabled(false);
       		    
       		    break;
       		    
       	    default : break;
        } //end switch
       		
       	       
        }; //end for
        
        
        if ( (pNamesList.includes("text"))
            || (pNamesList.includes("file"))   
            || (pNamesList.includes("list")))
            {this.ShowItems(this.txtT,this.edtT)}
            else
            {this.GoneItems(this.txtT,this.edtT)}
            ;
        
        if ( (pNamesList.includes("width"))
            )
            {this.ShowItems(this.chkW,this.skbW)}
            else
            {this.GoneItems(this.chkW,this.skbW)}
            ;
        if ( (pNamesList.includes("height"))
            )
            {this.ShowItems(this.chkH,this.skbH)}
            else
            {this.GoneItems(this.chkH,this.skbH)}
            ;
        if ( (pNamesList.includes("options"))
            )
            {this.ShowItems(this.txtO,this.edtO); this.spnO.Gone();}
            
            else
            {this.GoneItems(this.txtO,this.edtO,this.spnO)}
            ;
            
            
      if (!!h.CB.setoptions.SetTextSize)
            {this.chkT.SetText("Text size : " +h.CB.setoptions.SetTextSize);
            this.skbT.SetValue(h.CB.setoptions.SetTextSize);
            this.chkT.SetChecked(false);
            this.chkT.allowauto = false;
            this.ShowItems(this.chkT,this.skbT);
            }
            else
            {   
                this.chkT.SetText("Default text size");
                if (DSDAT.GetMethodsList(this.dlg.customobjecttype,DSDAT.dsdata).search("SetTextSize") != -1)
                {this.skbT.SetValue(0);
                this.chkT.SetChecked(true);
                this.chkT.allowauto = true;
                this.ShowItems(this.chkT,this.skbT);} 
                else
                {this.GoneItems(this.chkT,this.skbT);}
            };
            
        if (!!h.CB.setoptions.SetTextColor)
            {this.chkC.SetText("Text color : " +h.CB.setoptions.SetTextColor);
            this.chkC.SetChecked(false);
            this.chkC.allowauto = false;
            this.ShowItems(this.chkC,this.spnC);
            }
            else
            {   
                this.chkC.SetText("Default text color");
                if (DSDAT.GetMethodsList(this.dlg.customobjecttype,DSDAT.dsdata).search("SetTextColor") != -1)
                {this.chkC.SetChecked(true);
                this.chkC.allowauto = true;
                this.ShowItems(this.chkC,this.spnC);} 
                else
                {this.GoneItems(this.chkC,this.spnC);}
            };
            
        if (!!h.CB.setoptions.SetBackColor)
            {this.chkB.SetText("Back color : " +h.CB.setoptions.SetBackColor);
            this.chkB.SetChecked(false);
            this.chkB.allowauto = false;
            this.ShowItems(this.chkB,this.spnB);
            }
            else
            {   
                this.chkB.SetText("Default back color");
                if (DSDAT.GetMethodsList(this.dlg.customobjecttype,DSDAT.dsdata).search("SetBackColor") != -1)
                {this.chkB.SetChecked(true);
                this.chkB.allowauto = true;
                this.ShowItems(this.chkB,this.spnB);} 
                else
                {this.GoneItems(this.chkB,this.spnB);}
            };
            
        if (!!h.CB.setoptions.Disabled)
            {this.chkE.SetChecked(!h.CB.setoptions.Disabled);
            this.ShowItems(this.chkE);
            app.ShowPopup(h.CB.setoptions.Disabled);
            }
            else
            {   
                this.chkE.SetChecked(true);
                if (DSDAT.GetMethodsList(this.dlg.customobjecttype,DSDAT.dsdata).search("SetEnabled") != -1)
                {this.ShowItems(this.chkE);} 
                else
                {this.GoneItems(this.chkE);}
            };
                
                 
    /* to do : option controls through SetGravity() ?? */
    
    
    
    /* set Expert Options */
    this.lstE.SetList("");
    
    if (!!h.CB.setoptions)
    {
    l = h.CB.setoptions;
    
    for (const [key, value] of Object.entries(l)) {
     this.lstE.AddItem(key+" ( "+value.join(",")+" )*")
     
     
    }
    }
    
    
    
    
    //this.spnM
    
    this.spnA.SetList("Choose a property to add,"+DSDAT.GetMethodsList(this.dlg.customobjecttype,DSDAT.dsdata));
    
//       this.spnA.SelectItem( "Choose a property to add" );
    
    /* */
    
        this.handle = h;
        
        this.btn1.Gone();
        this.btn2.Show();
        this.btn3.Show();
        
      //  this.txtO.Gone();
     //   this.edtO.Gone();
       // this.spnO.Gone();
        
        this.dlg.SetTitle("Modify "+h.GetType()); 
        this.dlg.customobjecttype = h.GetType();
        this.dlg.Show();
    },
    AddControl: function() { 
    
        
        map = new Map();
       
        map.set ('text', CTRLDLG.edtT.GetText());
        map.set ('list', CTRLDLG.edtT.GetText());
        map.set ('file', CTRLDLG.edtT.GetText());
        w = CTRLDLG.chkW.GetText().split(":"); 
        if (w.length > 1)
        {map.set ('width', w[1]);}
        else
        {map.set ('width', -1);}
        h = CTRLDLG.chkH.GetText().split(":"); 
        if (h.length > 1)
        {map.set ('height', h[1]);}
        else
        {map.set ('height', -1);}
        map.set ('options', CTRLDLG.edtO.GetText());
        
        
        pValues = [];
     
        pNamesList = DSDAT.GetCreateParamsList(CTRLDLG.dlg.customobjecttype,DSDAT.dsdata)[0];
        
        for (p = 0 ; p < pNamesList.length; p++){
        
       		if (!! map.get(pNamesList[p]))
       		{pValues.push(map.get(pNamesList[p]))}
       		
       	
       		
       		else
       		{break;}
       
        };
        
           
            
        b =app["Create"+CTRLDLG.dlg.customobjecttype](...pValues);
        DSCB.CurrentTG.AddChild(b);
        CTRLDLG.dlg.Dismiss();
        
        a = {};
        
        h = CTRLDLG.chkT.GetText().split(":"); 
        if (h.length > 1)
        {b.SetTextSize(parseInt(h[1]));
        a['SetTextSize'] = [parseInt(h[1])];
        };
            
        h = CTRLDLG.chkC.GetText().split(":"); 
        if (h.length > 1)
        {b.SetTextColor(h[1].toLowerCase().trim()); 
        a['SetTextColor'] = [h[1].toLowerCase().trim()];
        };
        
        h = CTRLDLG.chkB.GetText().split(":"); 
        if (h.length > 1)
        {b.SetBackColor(h[1].toLowerCase().trim()); 
        a['SetBackColor'] = [h[1].toLowerCase().trim()];
        };
             
        if (!CTRLDLG.chkE.GetChecked())
        {//b.SetEnabled(false);
        a['Disabled'] = [true];
        };
        
        b.CB = {}
        b.CB.type = CTRLDLG.dlg.customobjecttype;
        b.CB.createoptions = pValues;
        b.CB.createparent =  DSCB.CurrentTG.id;
        b.CB.createpage =  DSCB.CurrentPG;
        b.CB.setoptions = a;
        
        v = [];
        for (i = 0 ; i < CTRLDLG.lstE.GetLength() ; i++)
        {
          t = CTRLDLG.lstE.GetItemByIndex(i).title.replace("\*","");
          tc = t.replace(/ \(.+/,"");
          tp = t.replace(/.+\( /,"");
          tp = tp.slice(0,tp.length-1).trim();
          vp = tp.split(",");
          
          b[tc](...vp);
          a[tc] = vp;
        };
    
 
        if (DSDAT.GetSetOnsList(CTRLDLG.dlg.customobjecttype,DSDAT.dsdata).search("SetOnTouch") != -1)
         { b.SetOnTouch(function() { CTRLDLG.ShowModifyDlg(this);  }  ) } 
         
        else  
        
        {if (DSDAT.GetSetOnsList(CTRLDLG.dlg.customobjecttype,DSDAT.dsdata).search("SetOnChange") != -1)
        
        { b.SetOnChange(function() { CTRLDLG.ShowModifyDlg(this);  } ) }
        
        else 
        {if (DSDAT.GetSetOnsList(CTRLDLG.dlg.customobjecttype,DSDAT.dsdata).search("SetOnFocus") != -1)
        
        { b.SetOnFocus(function() { CTRLDLG.ShowModifyDlg(this);  } ) }
            
            };
        };
       
        
      
    
    },
    UpdateControl: function() { 
        map = new Map();
       
        map.set ('text', CTRLDLG.edtT.GetText());
        map.set ('list', CTRLDLG.edtT.GetText());
        map.set ('file', CTRLDLG.edtT.GetText());
        w = CTRLDLG.chkW.GetText().split(":"); 
        if (w.length > 1)
        {map.set ('width', w[1]);}
        else
        {map.set ('width', -1);}
        h = CTRLDLG.chkH.GetText().split(":"); 
        if (h.length > 1)
        {map.set ('height', h[1]);}
        else
        {map.set ('height', -1);}
        map.set ('options', CTRLDLG.edtO.GetText());
        
        
        pValues = [];
     
        pNamesList = DSDAT.GetCreateParamsList(CTRLDLG.dlg.customobjecttype,DSDAT.dsdata)[0];
        
         b = CTRLDLG.handle;    
        
        for (p = 0 ; p < pNamesList.length; p++){
        
       		if (!! map.get(pNamesList[p]))
       		{
       		    pValues.push(map.get(pNamesList[p]))
       		
       		switch (pNamesList[p]) {
       		case "text" : b.SetText(map.get(pNamesList[p])); break;
       		    
       		case "file" : b.SetImage(map.get(pNamesList[p])); break;

       		case "list" : b.SetList(map.get(pNamesList[p])); break;
       		    
       		case "width" :  b.SetSize(map.get(pNamesList[p]),-1); break;
       		
       		case "height" : b.SetSize(-1, map.get(pNamesList[p])); break;
       		    
       		case "options" :   break;
       		    
       	    default : break;
        } //end switch
       		       		
       		
       		
       		
       		}else
       		{break;}
       
        };
        
             
       
        
        CTRLDLG.dlg.Dismiss();
        
        a = {};
        
        h = CTRLDLG.chkT.GetText().split(":"); 
        if (h.length > 1)
        {b.SetTextSize(parseInt(h[1]));
        a['SetTextSize'] = [parseInt(h[1])];
        };
            
        h = CTRLDLG.chkC.GetText().split(":"); 
        if (h.length > 1)
        {b.SetTextColor(h[1].toLowerCase().trim()); 
        a['SetTextColor'] = [h[1].toLowerCase().trim()];
        };
        
        h = CTRLDLG.chkB.GetText().split(":"); 
        if (h.length > 1)
        {b.SetBackColor(h[1].toLowerCase().trim()); 
        a['SetBackColor'] = [h[1].toLowerCase().trim()];
        };
        
        
        if (!CTRLDLG.chkE.GetChecked())
        {//b.SetEnabled(false);
        a['Disabled'] = [true];
        };
        
        
        CTRLDLG.handle.CB.createoptions = pValues;
        CTRLDLG.handle.CB.setoptions = a;
    
        v = [];
        for (i = 0 ; i < CTRLDLG.lstE.GetLength() ; i++)
        {
          t = CTRLDLG.lstE.GetItemByIndex(i).title.replace("\*","");
          tc = t.replace(/ \(.+/,"");
          tp = t.replace(/.+\( /,"");
          tp = tp.slice(0,tp.length-1).trim();
          vp = tp.split(",");
          
          b[tc](...vp);
          a[tc] = vp;
        
        };
        
   
        
    
    },
    AddCustomSetting: function(m,p) {
        
        CTRLDLG.lstE.AddItem(m+" ( "+p.join(",")+" )");
       
       
       
        
    }
    }
    
    
    
    