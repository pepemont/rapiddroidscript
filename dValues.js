function ExpertSet(objtype,method,setparams)
{
    
 if (!!setparams) {removeparams = setparams.join(",")};
 dlgValues = app.CreateDialog( method+ " values") ;
 laydlg = app.CreateLayout( "Linear", "VCenter,FillX" );
 laydlg.SetSize( 0.8, -1 );
 
 dlgparams = DSDAT.GetParamsList (objtype,method,DSDAT.dsdata,DSDAT.dsbase);
 
     dlgValues.params = [];
 
 for (i = 0 ; i < dlgparams[0].length ; i++) {
 
 if (dlgparams[1][i].slice(0,4) != "str-")
        {txt = app.CreateText(dlgparams[0][i]+" ("+dlgparams[1][i]+")" );
        edt = app.CreateTextEdit("", -1, -1, "FillX" );}
        else
        {txt = app.CreateText(dlgparams[0][i]);
        edt = app.CreateTextEdit("", -1, -1, "FillX" );}
        
        dlgValues.params.push(edt);
        
        if (!!setparams) edt.SetText(setparams.shift());
        
        
        
        
        
        txt.SetMargins( 0, 0.01, 0, 0 );
        laydlg.AddChild( txt );
        laydlg.AddChild(edt );
        
        
        if (dlgparams[1][i].slice(0,7) == "str_col")
        {spin = app.CreateSpinner( "Choose color:,White,Black,Red,Blue,Green,Yellow",0.6);
        spin.target = edt;
        spin.SetOnChange(function(value) {if (value != "Choose color:") this.target.SetText(value)} );
        laydlg.AddChild(spin);  
            
            };
        
        
        if (dlgparams[1][i].slice(0,3) == "bin")
        {spin = app.CreateSpinner( "Choose from :,true,false",0.6);
        spin.target = edt;
        spin.SetOnChange(function(value) {if (value != "Choose from :") this.target.SetText(value)} );
        laydlg.AddChild(spin);  
            
            };
        
        
        if (dlgparams[1][i].slice(0,4) == "str-")
        { spin = app.CreateSpinner( "",0.6);
        spin.target = edt;
        
         o = dlgparams[1][i]+",";
                    
                
                l = o.replace(/.+?-/,"").replace(/\|/g,",").replace("FillX/Y","FillX,FillY,FillXY") 
                
                l = l.replace(/\:.+?\,/g,",")
        
        spin.SetList("Choose strings from :,"+l);
        spin.SetOnChange(function(value) {if (value != "Choose strings from :") this.target.SetText(value)} );
        laydlg.AddChild(spin);  
        };
        
        
        
}
        layvalbtn = app.CreateLayout("linear","Horizontal");

        btn = app.CreateButton( "Ok", 0.3, -1);
        btn.SetOnTouch( 
            
            function () {
                 pVal = [] 
                 for (i = 0 ; i < dlgValues.params.length ; i++)        
                 {
                     switch (dlgparams[1][i].slice(0,3)) 
                     {
                     case "num" : pVal.push(parseFloat(dlgValues.params[i].GetText())); break;
                      
                     case "str" : pVal.push(dlgValues.params[i].GetText());break;
                     
                     case "bin" :  pVal.push((dlgValues.params[i].GetText() == 'true'));break;
                     
                     default : pVal.push(dlgValues.params[i].GetText());  break;
                     
                     
                     }
                 }
                 
                if (!!setparams) 
              {  CTRLDLG.lstE.RemoveItem(method+" ( "+removeparams+" )");}
                
                CTRLDLG.AddCustomSetting(method, pVal );
                
                CTRLDLG.spnA.SelectItem("Choose a property to add");
                
                dlgValues.Dismiss()}
        
        );
        layvalbtn.AddChild(btn);
        
        
        btn = app.CreateButton( "Cancel", 0.3, -1);
        btn.SetOnTouch( 
            
            function () {
                CTRLDLG.spnA.SelectItem("Choose a property to add");
                
                dlgValues.Dismiss()}
        );
        layvalbtn.AddChild(btn);
        
        laydlg.AddChild(layvalbtn);
        
        dlgValues.AddLayout(laydlg);
        
        dlgValues.Show();

};

