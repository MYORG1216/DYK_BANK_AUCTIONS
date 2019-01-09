sap.ui.controller("wcontent.pratice.before_login", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf pratice.before_login
*/
//	onInit: function() {
//debugger
//let oRouter = this.getOwnerComponent().getRouter();
//oRouter.attachRouteMatched("after_login", (oEvnt) => {
//	debugger
//});
//	},
	
	loginForm(){
		this.oView.formtag_login.setVisible(true);
		this.oView.TilesFlex.setVisible(false);
	},
	cancel(){
		this.oView.formtag_login.setVisible(false);
		this.oView.TilesFlex.setVisible(true);
	},
	login () {
				debugger
				var login_data=this.oView.getModel("user_account1").getProperty("/loginFormData");
				let suname=this.oView.getModel("user_account1").getProperty("/loginFormData").user1;
				let oOptions = {
			            "IvUserName":login_data.user1,
			            "IvPassword":login_data.pass1
			        };
				this.getOwnerComponent().callServer1(oOptions,"ZYKD_API_LOGIN_BANK").then((oResponse)=>{  
					debugger
					if (oResponse.RvMessage == "SUCCESS"){
						let oRouter=this.getOwnerComponent().getRouter();
						if (oRouter){
							oRouter.navTo("after_login",{"uname":suname});
							
						}
						alert("Mr. "+login_data.user1+" Welcome to Bidforx");
					}else {
						alert("Please Fill The Valid Details");
					}
				});
			},
			

				
					
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf pratice.before_login
*/
//	onBeforeRendering: function() {

//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf pratice.before_login
*/
//	onAfterRendering: function() {
//	
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf pratice.before_login
*/
//	onExit: function() {
//
//	}

});