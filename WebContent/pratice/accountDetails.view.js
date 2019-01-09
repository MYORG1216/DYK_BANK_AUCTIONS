sap.ui.jsview("wcontent.pratice.accountDetails", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf pratice.accountDetails
	*/ 
	getControllerName : function() {
		return "wcontent.pratice.accountDetails";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf pratice.accountDetails
	*/ 
	createContent : function(oController) {
 		return new sap.m.Page({
			title: "DCB BANK AUCTIONS",
			showNavButton:true,
			navButtonPress:()=>{
				debugger
				let suname=oController.getOwnerComponent().getModel("user_account1").getProperty("/loginUserDetails");
				let oRouter=oController.getOwnerComponent().getRouter();
				if (suname=="111222333"){
					if (oRouter){
						oRouter.navTo("manager",{"uname":suname});
					};	
				}else{
					if (oRouter){
						oRouter.navTo("my_account",{"uname":suname});
					};		
				}
			},
			content: [
				new sap.m.FlexBox({
					height:"100%",
//					width:"50%",
					alignItems:sap.m.FlexAlignItems.Center,
					justifyContent:sap.m.FlexJustifyContent.Center,
//					displayInline:true,
					items:[
//						new sap.ui.layout.Grid({
//							position:sap.ui.layout.GridPosition.Center,
//							width:"40%",
//							defaultSpan:"L12 M12 S12",
//							content:[
								new sap.ui.layout.form.Form({
									title:"USER DETAILS",
//									width:"100%",
									layout:new sap.ui.layout.form.FormLayout({
										backgroundDesign:sap.ui.layout.BackgroundDesign.Translucent
									}),
									formContainers:new sap.ui.layout.form.FormContainer({
										formElements:[
											new sap.ui.layout.form.FormElement({
												fields:[
													new sap.m.DisplayListItem({
														label:"Adhar No",
														value:"{user_account1>/login_user_details/AdharNo}",
													}),
													new sap.m.DisplayListItem({
														label:"Full Name",
														value:"{user_account1>/login_user_details/FullName}",
													}),
													new sap.m.DisplayListItem({
														label:"DOB",
														value:"{user_account1>/login_user_details/Dob}",
													}),
													new sap.m.DisplayListItem({
														label:"MobileNo",
														value:"{user_account1>/login_user_details/MobileNo}",
													}),
													new sap.m.DisplayListItem({
														label:"Gender",
														value:"{user_account1>/login_user_details/Gender}",
													})
												]
											})
										]
									})
								})
								
//							]
//						})
					]
				}),
			
			
			]
		});
	}

});