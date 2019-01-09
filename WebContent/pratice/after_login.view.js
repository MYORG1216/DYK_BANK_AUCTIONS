sap.ui.jsview("wcontent.pratice.after_login", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf pratice.after_login
	*/ 
	getControllerName : function() {
		return "wcontent.pratice.after_login";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf pratice.after_login
	*/ 
	createContent : function(oController) {
		let oView2=this;
		
		oView2.menunew=new sap.m.FeedListItem({
			icon:"sap-icon://person-placeholder",
			iconDensityAware:false,
			sender:"{user_account1>/loginUserDetails}",
			actions:[
				new sap.m.FeedListItemAction({
					icon:"sap-icon://customer",
				    text:"My Account",
				    press:[oController.QuickView,oController]
				}),
				new sap.m.FeedListItemAction({
					icon:"sap-icon://key-user-settings",
				    text:"Dashboard",
				    press:[oController.my_account,oController]
				}),
				new sap.m.FeedListItemAction({
					icon:"sap-icon://competitor",
				    text:"My Wins"
				}),
			
				new sap.m.FeedListItemAction({
					icon:"sap-icon://log",
					text:"Logout",
					press:[oController.logout,oController ]
				})
				
			]
		});
		
		oView2.AccountDetails = new sap.m.QuickView({
			placement: sap.m.PlacementType.PreferredTopOrFlip,
			pages:[
				new sap.m.QuickViewPage({
					header:"Account Details",
//					icon:"sap-icon://toaster-top",
					groups:[
						new sap.m.QuickViewGroup({
							heading:"Basic Info",
							elements:[
								new sap.m.QuickViewGroupElement({
									label:"Adhar No",
									value:"{user_account1>/login_user_details/AdharNo}"
								}),
								new sap.m.QuickViewGroupElement({
									label:"Full Name",
									value:"{user_account1>/login_user_details/FullName}"
								}),
								new sap.m.QuickViewGroupElement({
									label:"Date Of Birth",
									value:"{user_account1>/login_user_details/Dob}"
								})
							]
						}),
						new sap.m.QuickViewGroup({
							heading:"Contact Info",
							elements:[
								new sap.m.QuickViewGroupElement({
									label:"Mobile No",
									type:sap.m.QuickViewGroupElementType.mobile,
									value:"{user_account1>/login_user_details/MobileNo}"
								})
							]
						})
					]
				})
			]
			
		});
		oView2.qViewbtn=new sap.m.Button("quick",{
//			visible:false,
			text:"qView",
			press:[oController.pop,oController]
		});
		oView2.bidmainframe=new sap.m.FlexBox({
			visible:true,
			displayInline:true,
			 direction:sap.m.FlexDirection.Row,
			 alignItems:sap.m.FlexAlignItems.Center,
			 backgroundDesign:sap.m.BackgroundDesign.Translucent,
			 items:[
				 new sap.m.Image({	
					 src:"{user_account1>/prospec/0/Value}",
					 alt:"{user_account1>/prospec/0/Name}",
						width:"200px",
					}).addStyleClass("sapUiLargeMargin"),
					new  sap.m.ListBase({
						items:[
							new sap.m.StandardListItem({
								title:"{user_account1>/prospec/1/Name}",
								info:"{user_account1>/prospec/1/Value}",
//								description:"{user_account1>/products/0/desc}"
							}),
							new sap.m.DisplayListItem({
								label:"Starting Bid",
								value:"₹ "+"{user_account1>/products/StartPrice}"
							}),
							new sap.m.DisplayListItem({
								label:"Last Bid By",
								value:"{user_account1>/lastBidData/AdharNo}",
							}),
							new sap.m.DisplayListItem({
								label:"Current Bid",
								value:"{user_account1>/lastBidData/BidPrice}",
							})
						]
					}),

					new sap.ui.comp.smartform.SmartForm("bidingframe",{
						groups:[
							new sap.ui.comp.smartform.Group({
								groupElements:[
									new  sap.ui.comp.smartform.GroupElement({
										elements:[
											new sap.m.Button({
												width:"80%",
												text:"RELOAD",
												press:[oController.reload,oController]
											}),
											new sap.m.Input({
												placeholder:"ENTER NEW BID",
//												type: "sap.ui.model.type.Integer",
												type: sap.m.InputType.Number,
												width:"80%",
												value:"{user_account1>/products/lastBid}"
											}),
											new sap.m.Button({
												width:"80%",
												text:"BID",
												type:sap.m.ButtonType.Reject,
												press:[oController.currentbid,oController]
											})
										]
									})
								]
							})
						]
					}).addStyleClass("sapUiSmallMargin"),
		]
		 }).addStyleClass("sapUiMediumMargin");
		oView2.bidHistoryBox=new sap.m.FlexBox({
			visible:true,
			width:"30%",
			direction:sap.m.FlexDirection.Column,
			alignItems:sap.m.FlexAlignItems.Center,
			displayInline:true,
			justifyContent:sap.m.FlexJustifyContent.Start,
			items:[
				new sap.m.Text({
					text:"BIDING HISTORY"
				}),
				new  sap.m.ScrollContainer({
					height:"160px",
					vertical:true,
					content:[
						
						new sap.m.List({
							items:{
								path:"user_account1>/BidHistory",
								factory:(sIdx,oContext)=>{
//									debugger
									return new sap.m.DisplayListItem({
										label:"{user_account1>AdharNo}",
										value:"{user_account1>BidPrice}",
									})
								}
							}
						})
					]
				}).addStyleClass("sapUiSmallMargin"),
		]
		});

 		return new sap.m.Page({
 			title: "DCB BANK AUCTIONS",
			width:"100%",
			content: [
				oView2.AccountDetails,
				new sap.m.MessageToast.show("login successful",{
					 duration: 9000,
					 animationDuration: 6000, 
					}),
					oView2.bidmainframe,
						
					oView2.bidHistoryBox,
					
					new sap.m.GenericTile({
						header:"COMMING SOON",
						headerImage:"sap-icon://paper-plane",
						subheader:"AUCTIONS",
						FrameType:sap.m.FrameType.TwoByOne,
						mode:sap.m.GenericTileMode.ContentMode,
						state:sap.m.LoadState.Loaded,
						sizeBehavior:sap.m.TileSizeBehavior.Small,
						tileContent:new sap.m.TileContent({
							content:[
								new sap.m.Button({
									text:"MORE"
								})
							]
						})
					}).addStyleClass("sapUiMediumMargin"),
					new sap.m.GenericTile({
						header:"COMPLETED",
						headerImage:"sap-icon://complete",
						subheader:"AUCTIONS",
						FrameType:sap.m.FrameType.TwoByOne,
						mode:sap.m.GenericTileMode.ContentMode,
						state:sap.m.LoadState.Loaded,
						sizeBehavior:sap.m.TileSizeBehavior.Small,
						tileContent:new sap.m.TileContent({
							content:[
								new sap.m.Button({
									text:"MORE"
								})
							]
						})
					}).addStyleClass("sapUiMediumMargin"),
					
						],
			headerContent:[
				
				oView2.menunew,
				oView2.qViewbtn
				
			],
			footer:new sap.m.Bar({ 
				contentLeft:[
					new sap.m.Button({
						text:"Contact US",
						//icon:"sap-icon://world"
					    icon:"sap-icon://customer-and-contacts"
					}),
					new sap.m.Button({
						text:"Mail",
						icon:"sap-icon://email"
					}),
					new sap.m.Button({
						text:"Call",
						icon:"sap-icon://call"
					})					
				     ],
			   contentRight:[
				   new sap.m.Text({
						text:"Copyright"
					}),
				   new sap.m.Button({
						text:" 2018",
						icon:"sap-icon://sap-ui5"
					}),
					new sap.m.Text({
						text:"All rights reserved."
					})
			   ]
			})
		
			
		});
	}

});