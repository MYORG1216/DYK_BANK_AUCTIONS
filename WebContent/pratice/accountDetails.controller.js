sap.ui.controller("wcontent.pratice.accountDetails", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf pratice.accountDetails
*/
	onInit: function() {
	debugger;
	let oRouter = this.getOwnerComponent().getRouter();
	oRouter.attachRouteMatched("accountDetails", (oEvnt) => {
    	debugger
    	if (oEvnt.getParameter("name") == "accountDetails" || oEvnt.getParameter("name") == "manager"){
			debugger
			let user_name = oEvnt.getParameter("arguments").uname;
			this.getOwnerComponent().getModel("user_account1").setProperty("/loginUserDetails",user_name);
			
			
			let oOptions = {
			        "IvUserName":user_name
				
			    };
			this.getOwnerComponent().callServer1(oOptions,"ZYKD_API_BANK_LOGINUSER").then((oResponse)=>{ 
				debugger
				this.getOwnerComponent().getModel("user_account1").setProperty("/login_user_details",JSON.parse(JSON.stringify(oResponse.EsUserDetails)));
			})
		}
    });
},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf pratice.accountDetails
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf pratice.accountDetails
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf pratice.accountDetails
*/
//	onExit: function() {
//
//	}

});