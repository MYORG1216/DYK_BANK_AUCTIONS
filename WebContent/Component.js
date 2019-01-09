jQuery.sap.declare("wcontent.Component");
sap.ui.core.UIComponent.extend("wcontent.Component",{
	metadata:{
		"rootView":{
			"viewName":"wcontent.pratice.App",
			"type":"JS"
		},
		"routing":{
			"config":{
				"routerClass":"sap.m.routing.Router",
				"viewType":"JS",
				"viewPath":"wcontent.pratice",
				"controlId":"appid",
				"controlAggregation":"pages",
				"async":true
				},
				"routes":[
					{
						"pattern":"",
						"name":"before_login",
						"target":"before_login"
					},
					{
						"pattern":"after_login/{uname}",
						"name":"after_login",
						"target":"after_login"
					},
					{
						"pattern":"my_account/{uname}",
						"name":"my_account",
						"target":"my_account"
					},
					{
						"pattern":"ADVANCED SETTINGS/{uname}",
						"name":"manager",
						"target":"managerview"
					},
					{
						"pattern":"AccountDetails/{uname}",
						"name":"accountDetails",
						"target":"accountDetails"
					}
					
				],
				"targets":{
					"before_login":{
						"viewName":"before_login"
					},
					"after_login":{
						"viewName":"after_login"
					},
					"my_account":{
						"viewName":"my_account"
					},
					"managerview":{
						"viewName":"manager"
					},
					"accountDetails":{
						"viewName":"accountDetails"
					}
					
				}
		}
//		this.setModel(oModel, "")
	},
	init:function(){
		debugger
		sap.ui.core.UIComponent.prototype.init.apply(this,arguments);
		this.getRouter().initialize();
		this.oModel=new sap.ui.model.json.JSONModel();
		this.oModel.loadData("pratice/data.json");
		this.setModel(this.oModel,"user_account1");
	},
	callServer1:(oOptions,sAPIName)=>{
        debugger;
        let oConfig = {
            url: `http://gicomsap16.gicom.local:8000/gicom/jsonhandler/${sAPIName}?format=json&case=C&sap-client=100&sap-user=koorapati&sap-password=Gicom1$`,
            method: "POST",
            data:JSON.stringify(oOptions) ,
            dataType: "json",
            contentType: "text/plain"

        };

        let oDeferred = jQuery.Deferred();

        jQuery.ajax(oConfig).done(function(response, status, xhr, cfg) {

            oDeferred.resolve(response);
        })
            .fail(function(response, status, xhr, cfg)  {

                oDeferred.reject(response);
            })
            .always(function(response, status, xhr, cfg) {

                sap.ui.core.BusyIndicator.hide();
            });

        return oDeferred.promise();
    }
});