sap.ui.controller("wcontent.pratice.after_login", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf pratice.asd
*/
onInit: function () {
	debugger;
    
    let oRouter = this.getOwnerComponent().getRouter();
    oRouter.attachRouteMatched("after_login", (oEvnt) => {
    	debugger
    
    	if (oEvnt.getParameter("name") == "after_login"){
			debugger
			let user_name = oEvnt.getParameter("arguments").uname;
			this.getOwnerComponent().getModel("user_account1").setProperty("/loginUserDetails",user_name);
			
			let oOptions = {     };
		    this.getOwnerComponent().callServer1(oOptions,"ZYKD_API_BANK_GET_AUCTION_ITEM").then((oResponse)=>{ 
		    	debugger
		    	this.getOwnerComponent().getModel("user_account1").setProperty("/products",JSON.parse(JSON.stringify(oResponse.EsAuctionItem)));
		    	this.getOwnerComponent().getModel("user_account1").setProperty("/prospec",oResponse.EtAuctionSpec);
		    	if(oResponse.RvMessage =="FAIL"){
					this.oView.bidmainframe.setVisible(false);
					this.oView.bidHistoryBox.setVisible(false);
				
				}else{
					this.oView.bidmainframe.setVisible(true);
					this.oView.bidHistoryBox.setVisible(true);
				
				}
		    });
			
			oOptions = {
			        "IvUserName":user_name
				
			    };
			this.getOwnerComponent().callServer1(oOptions,"ZYKD_API_BANK_LOGINUSER").then((oResponse)=>{ 
				debugger
				this.getOwnerComponent().getModel("user_account1").setProperty("/login_user_details",JSON.parse(JSON.stringify(oResponse.EsUserDetails)));
			})
		    
			
		}

    });
	

},
pop(oEvt){
	debugger
	let oSource = oEvt.getSource();
	
	this.oView.AccountDetails.openBy(oSource);
},
QuickView(oEvt){
	debugger
	this.oView.qViewbtn.firePress();
},
//// BACKEND CALL FOR GETTING USER DETAILS
//let user_name = oEvnt.getParameter("arguments").uname;
//let login_data=this.getOwnerComponent().getModel("user_account1").getProperty("/products")[0];
//if(login_data.title==""){
//	this.oView.bidmainframe.setVisible(false);
//	this.oView.bidHistoryBox.setVisible(false);
//
//}else{
//	this.oView.bidmainframe.setVisible(true);
//	this.oView.bidHistoryBox.setVisible(true);
//
//}
//let oOptions = {
//        "IvUserName":user_name
	
//    };
//this.getOwnerComponent().callServer1(oOptions,"ZYKD_API_BANK_LOGINUSER").then((oResponse)=>{ 
//	debugger
//	this.getOwnerComponent().getModel("user_account1").setProperty("/login_user_details",JSON.parse(JSON.stringify(oResponse.EsUserDetails)));
//})
	logout () {
		debugger
		alert("logout successful");	
		let oRouter=this.getOwnerComponent().getRouter();
		if (oRouter){
			oRouter.navTo("before_login");
		}
		//for clearing input boxes
		let oModel = this.getOwnerComponent().getModel("user_account1");
		let clear={user1:"",pass1:""};
		let oObject=oModel.setProperty("/loginFormData",clear);	
	},
my_account(){
		debugger
	let oRouter=this.getOwnerComponent().getRouter();
	let suname=this.getOwnerComponent().getModel("user_account1").getProperty("/loginUserDetails");
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
reload(oEvt){
		debugger
		let oOptions = {};
		this.getOwnerComponent().callServer1(oOptions,"ZYKD_API_BANK_RELOAD").then((oResponse)=>{ 
			debugger
			if(oResponse.RvMessage =="FAIL"){
				alert("BE THE FIRST ONE TO BID");
			}else{
			this.getOwnerComponent().getModel("user_account1").setProperty("/BidHistory",JSON.parse(JSON.stringify(oResponse.EsBidHistory)));
			
			let BidHis=this.getOwnerComponent().getModel("user_account1").getProperty("/BidHistory");
			let len=BidHis.length;
			let last=len-1;
			let lastBid=this.getOwnerComponent().getModel("user_account1").getProperty("/BidHistory")[last];
			this.getOwnerComponent().getModel("user_account1").setProperty("/lastBidData",lastBid);
			let auctionItem = this.getOwnerComponent().getModel("user_account1").getProperty("/products");
			
			 auctionItem.BidPrice = lastBid.BidPrice;
			 auctionItem.AdharNo = lastBid.AdharNo;
			}
		});

		
	},
currentbid(oEvt){
		debugger
		let oOptions = {};
		this.getOwnerComponent().callServer1(oOptions,"ZYKD_API_BANK_RELOAD").then((oResponse)=>{ 
			debugger
			if(oResponse.RvMessage =="FAIL"){
				alert("BE THE FIRST ONE TO BID");
			}else{
				//RELOAD TO CHECK THE PREVIOUS BIDS BEFORE PLACING NEW BID.
			this.getOwnerComponent().getModel("user_account1").setProperty("/BidHistory",JSON.parse(JSON.stringify(oResponse.EsBidHistory)));
			
			let BidHis=this.getOwnerComponent().getModel("user_account1").getProperty("/BidHistory");
			let len=BidHis.length;
			let last=len-1;
			let lastBid=this.getOwnerComponent().getModel("user_account1").getProperty("/BidHistory")[last];
			this.getOwnerComponent().getModel("user_account1").setProperty("/lastBidData",lastBid);
			let auctionItem = this.getOwnerComponent().getModel("user_account1").getProperty("/products");
			
			 auctionItem.BidPrice = lastBid.BidPrice;
			 auctionItem.AdharNo = lastBid.AdharNo;
			 //NEW BID BUTTON CODE STARTS HERE
			 let vAdharNo=this.getOwnerComponent().getModel("user_account1").getProperty("/loginUserDetails");
				let vAucId=this.getOwnerComponent().getModel("user_account1").getProperty("/products").AuctionId;
				let vBidPrice=this.getOwnerComponent().getModel("user_account1").getProperty("/products").lastBid;
				let cref="INR";
				let oPrev=this.getOwnerComponent().getModel("user_account1").getProperty("/lastBidData").Sno;
				let vnum;
				if (oPrev==undefined){
					vnum = 1;
				}else{
//					JSON.parse(oPrev)+1;
					vnum = parseInt(oPrev)+1;
				}
				
				let oBidBtn={"AdharNo":vAdharNo,"AuctionId":vAucId,"Sno":vnum,"BidPrice":vBidPrice,"RefPrice":cref};
				let BidHis1=this.getOwnerComponent().getModel("user_account1").getProperty("/BidHistory").length;
				let startBid=this.getOwnerComponent().getModel("user_account1").getProperty("/products").StartPrice;
				let lastBid1;
				if (BidHis1== 0){
					lastBid1 = startBid;
				}else{
					lastBid1=this.getOwnerComponent().getModel("user_account1").getProperty("/BidHistory")[BidHis1-1].BidPrice;
				}
			
				
				if (JSON.parse(startBid)<JSON.parse(vBidPrice)){
					
					if (JSON.parse(lastBid1)<JSON.parse(vBidPrice)){
					let oOptions = {
							"IsBidbtn":oBidBtn
					};
					this.getOwnerComponent().callServer1(oOptions,"ZYKD_API_BANK_BIDBTN").then((oResponse)=>{
						debugger
						alert("BID PLACED SUCCESSFULLY");
					});
					}else{
						alert("NEW BID SHOULD BE GREATER THAN LAST BID");
					}
				}else{
					alert("NEW BID SHOULD BE GREATER THAN LAST BID");
				}

			}
		});
		
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf pratice.asd
*/
//	onBeforeRendering: function() {

//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf pratice.asd
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf pratice.asd
*/
//	onExit: function() {
//
//	}

});