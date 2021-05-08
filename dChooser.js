var ADDDLG = {
    Initialize: function () {
        dlg = app.CreateDialog( "Add an object" );

        layDlg = app.CreateLayout( "linear", "VCenter,FillXY" );
        layDlg.SetSize( 0.7, -1 );
        dlg.AddLayout( layDlg );
        this.dlg = dlg;
        
        var tabs = app.CreateTabs( "Controls,Groups,Screens", -1, -1, "VCenter" );
        // tabs.SetOnChange( tabs_OnChange ); 
        layDlg.AddChild( tabs ); 
        
        layControls = tabs.GetLayout( "Controls" );
        
       
        
        list = DSDAT.GetObjectsList(DSDAT.dsdata);
        lst = app.CreateList( list, -1, 0.6 );
        lst.SetOnTouch( function(t,b,y,i) {
            
            ADDDLG.dlg.Dismiss(); 
if (DeferInitializeC) CTRLDLG.Initialize();
DeferInitializeC = false;
CTRLDLG.ShowCreateDlg(t);
            
       
        });
       
        layControls.AddChild(lst);
        
        
        layGroups = tabs.GetLayout( "Groups" );
        
        lst = app.CreateList( "Layout,Tabs,Scroller,Menu:not implemented: ",-1, 0.5 );
        lst.SetOnTouch( function(t,b,y,i) {
            switch (t) {
                case "Layout" :  ADDDLG.dlg.Dismiss(); GRPDLG.ShowCreateDlg(t); break;
                case "Tabs" :  ADDDLG.dlg.Dismiss(); GRPDLG.ShowCreateDlg(t); break;
                case "Scroller" :  ADDDLG.dlg.Dismiss(); GRPDLG.ShowCreateDlg(t); break;
                //case "Tabs" : TXTDLG.ShowCreateDlg(); break;
                default: app.ShowPopup("Not implemented yet");
            };
        });
        layGroups.AddChild(lst);
        
        
        layScreens = tabs.GetLayout( "Screens" );
        
        lst = app.CreateList( "Page,Dialog:not implemented: ,Card:not implemented: ,Drawer:not implemented: ", -1, -1 );
        lst.SetOnTouch( function(t,b,y,i) {
            switch (t) {
                case "Page" : ADDDLG.dlg.Dismiss(); DSCB.ShowCreateDlg(t); break;
                //case "Dialog" : TXTDLG.ShowCreateDlg(); break;
                default: app.ShowPopup("Not implemented yet");
            };
        });
        layScreens.AddChild(lst);
        
        
    },
    
    ShowChooserDlg: function () {
        
        this.dlg.Show();
      
    }
    
};