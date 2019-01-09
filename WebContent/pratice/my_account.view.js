sap.ui.jsview("wcontent.pratice.my_account", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf pratice.my_account
	*/ 
	getControllerName : function() {
		return "wcontent.pratice.my_account";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf pratice.my_account
	*/ 
	createContent : function(oController) {
		let oView2=this;

		oView2.accountPage=	new sap.m.FlexBox({
			height:"100%",
			alignItems:sap.m.FlexAlignItems.Center,
			justifyContent:sap.m.FlexJustifyContent.Center,
			visible:true,
			items:[
				
				new sap.m.GenericTile({
					header:"History",
					headerImage:"sap-icon://history",
					//FrameType:sap.m.FrameType.TwoByOne,
					mode:sap.m.GenericTileMode.ContentMode,
					subheader:"Trading History",
					state:sap.m.LoadState.Loaded,
					sizeBehavior:sap.m.TileSizeBehavior.Small,
					
					tileContent:new sap.m.TileContent({
						footer:"UPTO NOW",
						footerColor:sap.m.ValueColor.Good,
					}),
					press:[oController.historyTile,oController]
				})
				]
		});
		oView2.HistoryForm=new sap.ui.layout.Grid({
			position:sap.ui.layout.GridPosition.Center,
			width:"40%",
			defaultSpan:"L12 M12 S12",
			visible:false,
			content:[
				new sap.m.List({
					items:{
						path:"user_account1>/BidHistory",
						factory:(sIdx,oContext)=>{
							debugger
							return new sap.m.DisplayListItem({
								label:"{user_account1>user1}",
								value:"{user_account1>bid}",
							})
						}
					}
				}),
				new sap.m.Button({
					width:"50%",
					text:"BACK",
					type:sap.m.ButtonType.Back,
					press:[oController.backHistoryForm,oController]
				})
			]
		});
 		return new sap.m.Page({
			title: "BIDFORX",
			showNavButton:true,
			navButtonPress:[oController.navButton,oController],
			content: [
				oView2.accountPage,
				oView2.HistoryForm
			]
		});
	}

});