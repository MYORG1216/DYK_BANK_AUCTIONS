sap.ui.controller("wcontent.pratice.my_account", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf pratice.my_account
*/
	onInit: function() {
		debugger;
		let oRouter = this.getOwnerComponent().getRouter();
		oRouter.attachRouteMatched("my_account", (oEvnt) => {
	    	debugger
	    	if (oEvnt.getParameter("name") == "my_account" || oEvnt.getParameter("name") == "manager"){
				debugger
				let user_name = oEvnt.getParameter("arguments").uname;
				this.getOwnerComponent().getModel("user_account1").setProperty("/loginUserDetails",user_name);
			}
	    });
	},
	navButton(){
		debugger
		let vUser_name=this.getOwnerComponent().getModel("user_account1").getProperty("/loginUserDetails");
		let oRouter=this.getOwnerComponent().getRouter();
		
		if(oRouter){
			oRouter.navTo("after_login",{uname: vUser_name});
		}
	},
	addAuction(){
		debugger
		var date = new Date();
		 
		let oAuctionItem=this.oView.getModel("user_account1").getProperty("/pushproducts");
		let vRefPrice="INR";
		let vStatus="COMMIMG SOON";
		oAuctionItem.AuctionId = date.getTime();
		oAuctionItem.Status = vStatus;	
		oAuctionItem.RefPrice=vRefPrice;
		let oSpec=this.oView.getModel("user_account1").getProperty("/pushspec");
		if(oSpec){
			let aSpecCon = Object.keys(oSpec);
			for (i=1;i<=aSpecCon.length;i++){
				oSpec[i].AuctionId=oAuctionItem.AuctionId;
			}
		}
		let oOptions = {
				"IsAddItem":oAuctionItem,
				"IsAddSpec":oSpec
		};
		this.getOwnerComponent().callServer1(oOptions,"ZYKD_API_ADD_ITEM").then((oResponse)=>{
			debugger
		if (oResponse.EvMessage == "SUCCESS"){
			this.oView.messageBox.setText("You have Successfully Add a Auction");
			this.oView.messageBox.setType(sap.ui.core.MessageType.Success);
			this.oView.messageBox.setVisible(true);
		}else{
			this.oView.messageBox.setText("Please Fill The Valid Details");
			this.oView.messageBox.setType(sap.ui.core.MessageType.Error);
			this.oView.messageBox.setVisible(true);
		}
		});
	},
	more(){
		debugger
		
		let oModel = this.getOwnerComponent().getModel("user_account1");
	   if(oModel){
		   let oPushSpec = JSON.parse(JSON.stringify(oModel.getProperty("/pushspec")));
		   if (oPushSpec){
			   let aPushSpec = Object.keys(oPushSpec);
			   if(aPushSpec && aPushSpec.length){
				   let nLength = aPushSpec.length + 1;
				   oPushSpec[nLength] = {
						   "Name":"",
						   "Value":"",
						   "Sno":JSON.stringify(nLength)
						   
				   };
				   oModel.setProperty("/pushspec", oPushSpec);
				   oView2.oFormElement.insertField(new sap.m.Input({
						placeholder:"Name",
						width: "80%",
						value:"{user_account1>/pushspec/"+ nLength +"/Name}",
						change:(oEvent)=>{
							debugger;
							//oEvent.getSource().setValue("test");
						}
					}), oView2.oFormElement.getFields().length -3);
					oView2.oFormElement.insertField(new sap.m.Input({
						placeholder:"Value",
						width: "80%",
						value:"{user_account1>/pushspec/"+ nLength +"/Value}"
				}), oView2.oFormElement.getFields().length - 3);
			   }
		   }
	   }
		

	},
	imgChange: function(oEvent){
		debugger
			  oController = this;
			  let oModel = oController.getOwnerComponent().getModel("user_account1");

			  let oSource = oEvent.getSource();
			  if(oSource){
			   var oFile = oEvent.getParameter("files")[0];
			   oModel.setProperty("/img",oFile)
			   oSource.upload();
			  }
			 },
			 
			
	imgUpload: function(oEvent){
		debugger
		  oController = this;
		  let oModel = oController.getOwnerComponent().getModel("user_account1");
		        var oFile = oModel.getProperty("/img")
		  if(oFile){
			  debugger
		   let oReader = new FileReader();
		   oReader.onload = function(oEvent){
		    let sBufferData = oEvent.target.result;
		    oModel.setProperty("/pushspec/1/Value",sBufferData);
		   }
		    oReader.readAsDataURL(oFile);
		  }
	},	
	
	historyTile(){
		this.oView.HistoryForm.setVisible(true);
		this.oView.accountPage.setVisible(false);
	},
	backHistoryForm(){
		this.oView.HistoryForm.setVisible(false);
		this.oView.accountPage.setVisible(true);
	},
	signup(){				
		debugger
		var up_user=this.oView.getModel("user_account1").getProperty("/signupFormData");
			if (up_user.AdharNo){
				let oOptions = {
						"IsAddUser":up_user
				};
				this.getOwnerComponent().callServer1(oOptions,"ZYKD_API_ADD_USER").then((oResponse)=>{
					debugger
					if (oResponse.EvMessage == "SUCCESS"){
						this.oView.messageBox.setText("You have Successfully Add a User");
						this.oView.messageBox.setType(sap.ui.core.MessageType.Success);
						this.oView.messageBox.setVisible(true);
					}else{
						this.oView.messageBox.setText("Please Fill The Valid Details");
						this.oView.messageBox.setType(sap.ui.core.MessageType.Error);
						this.oView.messageBox.setVisible(true);
					}
				});
			}
		else
		{
			this.oView.messageBox.setText("Please Fill The Valid Details");
			this.oView.messageBox.setType(sap.ui.core.MessageType.Error);
			this.oView.messageBox.setVisible(true);
		}
		//for clearing input boxes
		let oModel = this.getView().getModel("user_account1");
		let clear={AdharNo: "", Password: "", FullName: "", Dob: "", Gender: "",MobileNo: "",Password: "",UserRole: ""};
		let oObject=oModel.setProperty("/signupFormData",clear);	
		},

		winBack(){
			this.oView.winnerForm.setVisible(false);
			this.oView.advanced_options.setVisible(true);
			this.oView.regular_options.setVisible(true);
			this.oView.finishForm.setVisible(false);
			this.oView.Bback.setVisible(false);
		},
	
		NextBtn(){
			debugger
		},
		addAuctionFormVis(oEvt){
			debugger
			let oSource = oEvt.getSource();
			this.oView.addAuction.openBy(oSource);
		},
		addUserFormVis(oEvt){
			debugger
			let oSource = oEvt.getSource();
			this.oView.addUser.openBy(oSource);
		},
		cancelAdd(){
			this.oView.messageBox.setText("");
			this.oView.messageBox.setVisible(false);
			this.oView.addAuction.close();
			this.oView.addUser.close();
			this.oView.finish.close();
			this.oView.winnerForm.close();
		},
		finishBtn(oEvt){
			debugger;
			let oSou= this.oView.finish;
			let oSource = oEvt.getSource();
			let oOptions = {};
			this.getOwnerComponent().callServer1(oOptions,"ZYKD_API_BANK_FINISH").then((oResponse)=>{
				debugger
				if (oResponse.RvMessage == "SUCCESS"){
					if(oResponse.EsWinner.AdharNo == ""){
						alert("No Auctions are Running At This Time " +
								"(or)"+
						"Something Went Wrong Please Check Your Internet Connection ");
					debugger
					}else{
						this.getOwnerComponent().getModel("user_account1").setProperty("/currentWinner",oResponse.EsWinner);
						 oSou.openBy(oSource);
					}
				}else{
					alert("Something Went Wrong Please Check Your Internet Connection ");
				}
			});
			
			let clear=[{"imgsrc":"","imgalt":"","title":"","info":"",
				"desc":"","value":"","currentbid":"","lastbidby":""}];
			this.oView.getModel("user_account1").setProperty("/products",clear);
			
		},
		winnerBtn(oEvt){
			debugger
			let oSou= this.oView.winnerForm;
			let oSource = oEvt.getSource();
			let oOptions = {
					
			};
			this.getOwnerComponent().callServer1(oOptions,"ZYKD_API_BANK_GET_REC_WINNERS").then((oResponse)=>{
				debugger
				
				if (oResponse.RvMessage == "SUCCESS"){
					this.getOwnerComponent().getModel("user_account1").setProperty("/Winners",oResponse.EsWinners);
					oSou.openBy(oSource);
					
				}else{
					alert("Something Went Wrong Please Check Your Internet Connection ");
				}
					});
		},
	
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf pratice.my_account
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf pratice.my_account
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf pratice.my_account
*/
//	onExit: function() {
//
//	}

});